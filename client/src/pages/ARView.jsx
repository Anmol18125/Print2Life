import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { recordScan } from '../api/api';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

export default function ARView() {
  const mountRef = useRef(null);
  const [startedAt, setStartedAt] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Basic Three.js rotating cube as AR placeholder
    const mount = mountRef.current;
    const width = mount.clientWidth;
    const height = 400;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1.4, 1.4, 1.4);
    const material = new THREE.MeshStandardMaterial({ color: 0x1f7fff });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    const ambient = new THREE.AmbientLight(0x555555);
    scene.add(ambient);

    let frameId;
    function animate() {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.015;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    }
    animate();

    // mark start time
    setStartedAt(Date.now());

    // cleanup
    return () => {
      cancelAnimationFrame(frameId);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
      // compute duration and post scan
      const durationSec = Math.round((Date.now() - (startedAt || Date.now())) / 1000);
      try {
        recordScan({ campaignId: 'default-campaign', sessionId: String(Date.now()), duration: durationSec });
      } catch (e) { /* ignore */ }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBuyNow = async () => {
    // record scan with some duration
    const duration = Math.round((Date.now() - (startedAt || Date.now())) / 1000);
    await recordScan({ campaignId: 'default-campaign', sessionId: String(Date.now()), duration });
    // navigate to shop (placeholder)
    window.open('https://example.com', '_blank');
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold">AR Simulation</h2>
        <p className="text-sm text-gray-500">Simulated WebGL AR content placed on the marker (placeholder).</p>

        <div className="mt-4" ref={mountRef} style={{ width: '100%', height: 400 }} />

        <div className="mt-4 flex gap-3">
          <button onClick={handleBuyNow} className="bg-indigo-600 text-white px-4 py-2 rounded">Buy Now</button>
          <button onClick={() => navigate('/')} className="bg-gray-100 px-4 py-2 rounded">Back</button>
        </div>
      </div>
      <div className="text-xs text-gray-400">Visited: {dayjs().format('YYYY-MM-DD HH:mm:ss')}</div>
    </div>
  );
}
