# 🚀 ScanPrint — Production Deployment & Project Architecture Guide (Render + GitHub)

Ek complete **Scan to Print** web application (Customer Web App + Kiosk Hardware Agent + Store Owner Portal) ko GitHub aur **Render** par deploy karne ke liye full project structure, backend configuration aur deployment steps niche diye gaye hain.

---

## 📁 1. Recommended Repository Structure (GitHub)

Yeh repository structure monolithic / decoupled architecture support karta hai jisse aap Render par Web Service ya Static Site ke roop me deploy kar sakte hain:

```text
scan-to-print/
├── client/                     # Frontend (React / Vite ya Next.js / Static HTML)
│   ├── public/
│   ├── src/
│   │   ├── components/         # QR Scanner, Print Customizer, UPI Modal
│   │   ├── pages/
│   │   │   ├── CustomerPrint.jsx     # QR Scan, Upload, Print Setup (SCREEN_8)
│   │   │   ├── CheckoutStatus.jsx    # Live Dispense & PIN (SCREEN_6)
│   │   │   ├── OwnerDashboard.jsx    # Pulse Metrics & Toner Status (SCREEN_4)
│   │   │   └── HardwarePricing.jsx   # Diagnostics & Rate Card (SCREEN_2)
│   │   └── styles/
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Backend API (Node.js Express / Python FastAPI)
│   ├── controllers/
│   │   ├── orderController.js  # UPI intent generation, webhook handling
│   │   ├── printController.js  # CUPS / IPP printer spooler integration
│   │   └── kioskController.js  # Telemetry, paper sensors, rate card sync
│   ├── models/
│   ├── routes/
│   ├── utils/
│   │   └── printerProtocol.js  # IPP (Internet Printing Protocol) driver
│   ├── package.json
│   └── server.js               # Entry point (port 5000 / process.env.PORT)
│
├── render.yaml                 # ⚡ Render Blueprint (Auto Infrastructure)
├── Dockerfile                  # (Optional) Docker container with CUPS drivers
├── .gitignore
└── README.md
```

---

## ⚡ 2. `render.yaml` (Render Infrastructure as Code)

Apne GitHub repo ke root folder me `render.yaml` file banayein. Render is file ko detect karke automatic web service aur database setup kar deta hai:

```yaml
services:
  # 1. Full-Stack / Node.js Web API Service
  - type: web
    name: scan-print-api
    runtime: node
    region: singapore # India ke nearest low-latency region
    plan: free # Ya starter
    buildCommand: npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
      - key: UPI_MERCHANT_VPA
        sync: false
      - key: RAZORPAY_OR_CASHFREE_KEY
        sync: false
      - key: MONGODB_URI
        sync: false

  # 2. Static Frontend (Customer & Owner Web App)
  - type: web
    name: scan-print-frontend
    runtime: static
    buildCommand: npm --prefix client install && npm --prefix client run build
    staticPublishPath: ./client/dist
    envVars:
      - key: VITE_API_URL
        value: https://scan-print-api.onrender.com
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
```

---

## ⚙️ 3. Backend Entry Point (`server/server.js`) Example

Render ke environment variables aur production port mapping ke sath:

```javascript
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// API Routes
app.post('/api/kiosk/connect', (req, res) => {
  const { kioskId } = req.body;
  res.json({ status: 'connected', kioskId: kioskId || 'KP-4821', duplex: true, speed: '42ppm' });
});

app.post('/api/order/create-upi', (req, res) => {
  const { pages, colorMode, duplex, copies } = req.body;
  // Calculate price based on dynamic rate card
  const ratePerPage = colorMode === 'color' ? 8.00 : 2.00;
  const total = pages * ratePerPage * copies;
  res.json({
    orderId: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
    amount: total,
    currency: 'INR',
    releasePin: Math.floor(1000 + Math.random() * 9000)
  });
});

// Production Static Serving (Agar single service deploy karni ho)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Scan to Print server active on port ${PORT}`);
});
```

---

## 🚀 4. GitHub se Render Deploy Karne ke Steps (Step-by-Step)

### Step 1: Code GitHub par Push karein
```bash
git init
git add .
git commit -m "Initial commit: Scan to Print App & Owner Portal"
git branch -M main
git remote add origin https://github.com/aapka-username/scan-to-print.git
git push -u origin main
```

### Step 2: Render.com par Connect karein
1. [dashboard.render.com](https://dashboard.render.com) par login karein.
2. **"New +"** button dabayein aur **"Web Service"** (ya "Blueprint") select karein.
3. Apna GitHub repository (`scan-to-print`) select karein aur access authorize karein.

### Step 3: Build & Start Settings bharein:
- **Name:** `scan-to-print-app`
- **Region:** `Singapore` (Fastest for India / Asia users)
- **Branch:** `main`
- **Root Directory:** `.` (ya `server` agar alag backend ho)
- **Runtime:** `Node` (ya Python/Docker)
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`

### Step 4: Environment Variables Add karein:
- `PORT`: `10000`
- `NODE_ENV`: `production`
- `UPI_MERCHANT_ID`: Apna merchant UPI ID
- `PAYMENT_GATEWAY_SECRET`: Payment gateway API key

### Step 5: Click "Create Web Service"
Render automatic GitHub se pull karega, build run karega aur aapko **live URL** (jaise `https://scan-to-print.onrender.com`) provide kar dega. Har baar jab aap `main` branch me push karenge, Render auto-deploy kar dega!
