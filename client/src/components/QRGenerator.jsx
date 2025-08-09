import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

export default function QRGenerator({ url }) {
  const [size, setSize] = useState(220);

  const downloadQR = () => {
    const canvas = document.getElementById('qr-canvas');
    if (!canvas) return;
    const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    const a = document.createElement('a');
    a.href = pngUrl;
    a.download = 'arhorizon-qrcode.png';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">QR Code</h3>
      <div className="flex items-center gap-4">
<QRCodeCanvas id="qr-canvas" value={url} size={size} includeMargin={true} />
        <div>
          <div className="mb-2">Size: {size}px</div>
          <input type="range" min="150" max="400" value={size} onChange={(e)=>setSize(Number(e.target.value))} />
          <div className="mt-3">
            <button onClick={downloadQR} className="bg-indigo-600 text-white px-3 py-1 rounded">Download QR</button>
          </div>
        </div>
      </div>
    </div>
  );
}
