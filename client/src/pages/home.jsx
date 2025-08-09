import React from 'react';
import QRGenerator from '../components/QRGenerator';
import { Link } from 'react-router-dom';

export default function Home() {
const demoURL = `http://192.168.1.100:5173/ar?sessionId=${Date.now()}`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <section>
        <div className="bg-white p-6 rounded shadow">
          <h1 className="text-3xl font-bold">Experience Print Come to Life</h1>
          <p className="mt-3 text-gray-600">Where paper meets magic — scan & see the future.</p>

          <div className="mt-6 flex gap-3">
            <Link to="/ar" className="bg-indigo-600 text-white px-4 py-2 rounded">Try the AR demo</Link>
            <a href="/analytics" className="bg-gray-100 px-4 py-2 rounded">View analytics</a>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold">How it works</h3>
            <ol className="list-decimal list-inside mt-2 text-gray-600">
              <li>Generate or download the QR</li>
              <li>Click or scan to open the AR demo</li>
              <li>Backend records scan events and shows analytics</li>
            </ol>
          </div>
        </div>
      </section>

      <aside>
        <QRGenerator url={demoURL} />
        <div className="mt-4 text-sm text-gray-500">
          <strong>Tip:</strong> Click the QR or open <a className="text-indigo-600" href={demoURL}>{demoURL}</a> to simulate scan.
        </div>
      </aside>
    </div>
  );
}
