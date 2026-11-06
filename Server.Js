const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { PDFDocument } = require('pdf-lib');

const app = express();
const PORT = process.env.PORT || 10000;
const ROOT = __dirname;
const DATA = path.join(ROOT, 'data');
const UPLOADS = path.join(DATA, 'uploads');
const ORDERS = path.join(DATA, 'orders.json');
const SETTINGS = path.join(DATA, 'settings.json');
fs.mkdirSync(UPLOADS, { recursive: true });
if (!fs.existsSync(ORDERS)) fs.writeFileSync(ORDERS, '[]');
if (!fs.existsSync(SETTINGS)) fs.writeFileSync(SETTINGS, JSON.stringify({ rateBw: 2, rateColor: 8, tax: 1.5, discount: 2 }, null, 2));

app.use(express.json({ limit: '2mb' }));
app.use(express.static(ROOT, { index: 'index.html' }));
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 25 * 1024 * 1024 } });

function readJson(file, fallback) { try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return fallback; } }
function writeJson(file, value) { fs.writeFileSync(file, JSON.stringify(value, null, 2)); }
function id(prefix) { return `${prefix}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`; }

app.get('/api/health', (req, res) => res.json({ ok: true, service: 'scan-to-print', time: new Date().toISOString() }));
app.get('/api/settings', (req, res) => res.json(readJson(SETTINGS, { rateBw: 2, rateColor: 8, tax: 1.5, discount: 2 })));
app.get('/api/payment-config', (req, res) => res.json({ upiVpa: process.env.UPI_VPA || '', payeeName: process.env.UPI_PAYEE_NAME || 'Scan and Print' }));
app.put('/api/settings', (req, res) => {
  const current = readJson(SETTINGS, { rateBw: 2, rateColor: 8, tax: 1.5, discount: 2 });
  const next = { ...current, rateBw: Number(req.body.rateBw) || current.rateBw, rateColor: Number(req.body.rateColor) || current.rateColor };
  writeJson(SETTINGS, next); res.json(next);
});

app.post('/api/upload', upload.single('document'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No document uploaded' });
  let pages = 1;
  const ext = path.extname(req.file.originalname).toLowerCase();
  if (ext === '.pdf') {
    try { pages = (await PDFDocument.load(req.file.buffer, { ignoreEncryption: true })).getPageCount(); }
    catch { return res.status(400).json({ error: 'Invalid or unreadable PDF' }); }
  } else if (['.png', '.jpg', '.jpeg'].includes(ext)) pages = 1;
  else if (['.doc', '.docx'].includes(ext)) return res.status(415).json({ error: 'DOC/DOCX page counting requires conversion; please upload PDF for exact print pagination.' });

  const fileId = id('FILE');
  const stored = `${fileId}${ext}`;
  fs.writeFileSync(path.join(UPLOADS, stored), req.file.buffer);
  res.json({ fileId, filename: req.file.originalname, pages, size: req.file.size, url: `/api/files/${stored}` });
});
app.get('/api/files/:name', (req, res) => {
  const file = path.join(UPLOADS, path.basename(req.params.name));
  if (!fs.existsSync(file)) return res.status(404).end();
  res.sendFile(file);
});

app.post('/api/orders', (req, res) => {
  const settings = readJson(SETTINGS, { rateBw: 2, rateColor: 8, tax: 1.5, discount: 2 });
  const pages = Math.max(1, Number(req.body.pages) || 1);
  const copies = Math.max(1, Number(req.body.copies) || 1);
  const color = req.body.colorMode === 'color';
  const rate = color ? settings.rateColor : settings.rateBw;
  const subtotal = pages * rate * copies;
  const total = Math.max(0, subtotal + settings.tax - settings.discount);
  const order = {
    id: id('ORD'), createdAt: new Date().toISOString(), status: 'READY_FOR_PAYMENT',
    filename: req.body.filename || 'document', fileId: req.body.fileId || null,
    pages, copies, colorMode: color ? 'color' : 'bw', duplex: !!req.body.duplex,
    amount: Number(total.toFixed(2)), paymentMethod: req.body.paymentMethod || null
  };
  const orders = readJson(ORDERS, []); orders.unshift(order); writeJson(ORDERS, orders.slice(0, 200));
  res.status(201).json(order);
});
app.get('/api/orders', (req, res) => res.json(readJson(ORDERS, [])));
app.get('/api/orders/:id', (req, res) => {
  const order = readJson(ORDERS, []).find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});
app.post('/api/orders/:id/pay', (req, res) => {
  const orders = readJson(ORDERS, []); const order = orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  order.paymentMethod = req.body.method || order.paymentMethod || 'UPI';
  order.status = 'PAID'; order.paidAt = new Date().toISOString();
  writeJson(ORDERS, orders); res.json(order);
});
app.post('/api/orders/:id/print', (req, res) => {
  const orders = readJson(ORDERS, []); const order = orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  if (!order.fileId) return res.status(400).json({ error: 'No uploaded document attached to this order' });
  order.status = 'PRINTING'; order.printStartedAt = new Date().toISOString(); writeJson(ORDERS, orders);
  res.json({ ok: true, order, fileUrl: `/api/files/${order.fileId}` });
  setTimeout(() => {
    const fresh = readJson(ORDERS, []); const o = fresh.find(x => x.id === order.id);
    if (o) { o.status = 'COMPLETED'; o.completedAt = new Date().toISOString(); writeJson(ORDERS, fresh); }
  }, 4000);
});

app.listen(PORT, () => console.log(`Scan-to-Print listening on ${PORT}`));
