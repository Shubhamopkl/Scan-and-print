# Scan-and-Print — Render Web Service

## Deploy
1. Put these files at the repository root:
   - `index.html`
   - `server.js`
   - `package.json`
   - `render.yaml`
   - `assets/upi-qr.png`
2. Render → New → Web Service.
3. Runtime: Node.
4. Branch: `main`.
5. Root Directory: blank.
6. Build Command: `npm install`.
7. Start Command: `npm start`.
8. Plan: Free.

## Important
Open the URL of this Render **Web Service**. The frontend calls `/api/*` on the same origin.

Printer integration is intentionally not included yet.
