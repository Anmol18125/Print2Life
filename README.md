**Print2Life**
Bringing Print to Life with AR & Real-Time Analytics

📖 About the Project
Print2Life is a QR-powered AR marketing and analytics platform.
It lets you generate scannable QR codes for campaigns, deliver immersive 3D experiences, and track user engagement in real time.

Whether it’s a flyer, poster, or product package — scanning the QR launches an AR experience that’s more than just a webpage. While users interact, Print2Life records:

  How long they engaged
  
  Where they are
  
  What device they used

All this data updates instantly on a live dashboard, helping businesses make smarter, faster marketing decisions.

✨ Key Features
  🎯 QR Code Generation — Create unique, scannable links for campaigns.
  
  🌀 Interactive AR Demo — Show animated 3D content using Three.js.
  
  📊 Real-Time Analytics Dashboard — See total scans, unique visitors, average engagement time, and top locations.
  
  🌍 Location Insights — Track user locations via IP geolocation.
  
  ⚡ Instant Updates — Live data streaming via Socket.io.
  
  📦 MongoDB Storage — Keep historical data for analysis.

🛠 Tech Stack
Frontend

  React + Vite
  
  Tailwind CSS
  
  Three.js

QRCode.react

Backend

  Node.js + Express
  
  MongoDB + Mongoose
  
  Socket.io
  
  geoip-lite

🔄 How It Works
  Generate a QR — Campaign manager generates a QR code linking to /ar.
  
  User Scans QR — Opens the AR experience on mobile/desktop.
  
  AR Content Loads — Three.js displays an animated 3D object.
  
  Track Engagement — Session time, device info, and location are recorded.
  
  Live Dashboard — Metrics update instantly for campaign managers.

.

🚀 Getting Started
1️⃣ Clone the Repository
```
git clone https://github.com/yourusername/print2life.git
cd print2life
```

2️⃣ 📦 Server (Node + Express + MongoDB + Socket.io)
1️⃣ Go to the server folder:

```
cd server
```
2️⃣ Initialize package.json (if not already done):

```
npm init -y
```
3️⃣ Install dependencies:

```
npm install express mongoose cors helmet dotenv socket.io ua-parser-js geoip-lite dayjs
```

Why each package?

express → HTTP server

mongoose → MongoDB ODM (schema + queries)

cors → Allow client to talk to backend

helmet → Security headers

dotenv → Manage environment variables

socket.io → Real-time analytics updates

ua-parser-js → Detect device/browser from user-agent

geoip-lite → Get location from IP

dayjs → Date/time formatting

4️⃣ Install dev dependencies:

```
npm install --save-dev nodemon
```
nodemon → Auto-restart backend on code changes.

5️⃣ Start the backend in dev mode:

```
npm run dev
```
(assuming your package.json has "dev": "nodemon src/index.js")

3️⃣ Client (React + Vite + Tailwind + Three.js)
1️⃣ Go to the client folder:

```
cd client
```
2️⃣ Create Vite + React project:

```
npm create vite@latest .
```
Choose:

```
✔ Select a framework: » React
✔ Select a variant: » JavaScript
```
3️⃣ Install dependencies:

```
npm install axios socket.io-client qrcode.react three dayjs
```
Why each package?

axios → API calls

socket.io-client → Connect to backend WebSocket

qrcode.react → Generate QR codes

three → 3D AR placeholder

dayjs → Date/time formatting

4️⃣ Install Tailwind CSS (and PostCSS + autoprefixer):

```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
This creates tailwind.config.js and postcss.config.cjs

5️⃣ Configure tailwind.config.js:
```
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
};
```
6️⃣ Add Tailwind imports to index.css:

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Use ngrok:

```
npm install -g ngrok
npm run dev -- --host
ngrok http 5173
```
Copy the ```https://something.ngrok-free.app```
URL — that’s your new frontend URL.
8️⃣ Start the frontend:
```
npm run dev
```
🌐 Env Variables
In server/.env:

```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/arhorizon?retryWrites=true&w=majority
CLIENT_ORIGIN=http://localhost:5173
```
In client/.env:
```
VITE_SERVER_URL=http://localhost:5000
```
**🚀 Start the whole project
**Terminal 1:
```
cd cilent
npm run dev

```

Terminal 2:
```
cd server
npm run dev
```
📸 Screenshots
<img width="1919" height="861" alt="image" src="https://github.com/user-attachments/assets/4d771cbd-8425-4784-813d-ca18b74b33ab" />
Try Ar Demo page
<img width="1919" height="832" alt="image" src="https://github.com/user-attachments/assets/d522cd6d-ea12-49e4-938f-44838cdb215a" />
Analytics Page
<img width="1919" height="837" alt="image" src="https://github.com/user-attachments/assets/110554cf-2ef9-4ba1-bba5-713cd7fd9a58" />

Maintainer Anmol Ray 📧 anmol18125@gmail.com 🌐 GitHub: Anmol18125

