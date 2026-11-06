# Scan & Print — Render deployment

This package keeps the supplied UI/design and adds the missing server-side workflow:
- exact PDF page counting with `pdf-lib`
- document upload/storage
- order creation and pricing
- server-side rate storage
- order/print status API
- local browser print dialog for the uploaded PDF
- optional UPI intent using environment variables

## Render
Create a **Web Service** from this GitHub repository (not Static Site).

- Runtime: Node
- Build Command: `npm install`
- Start Command: `npm start`
- Health Check Path: `/api/health`

## Optional UPI
Add these Render environment variables if you have a merchant UPI VPA:
- `UPI_VPA` = your merchant VPA
- `UPI_PAYEE_NAME` = your business name

The UPI intent opens the installed UPI app. Payment verification is not claimed as complete without a real payment gateway/webhook.

## Printer note
A normal Render server cannot directly control a printer connected to a customer's phone/PC. The implemented print flow opens the uploaded PDF in the browser and invokes the local browser print dialog, which is the part that can reach a printer installed on that device.

For unattended remote kiosk printing, add a small local kiosk/print-agent on the kiosk machine later; the existing API is ready to be used for that integration.
