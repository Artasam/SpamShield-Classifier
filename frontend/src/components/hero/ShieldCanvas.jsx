import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import './ShieldCanvas.css';

/**
 * Three.js 3D animated shield — raw Three.js (no R3F dependency needed).
 */
export default function ShieldCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth;
    const H = mount.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
    camera.position.set(0, 0, 4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Shield shape
    const shieldShape = new THREE.Shape();
    shieldShape.moveTo(0, 2.2);
    shieldShape.bezierCurveTo(-1.8, 2.2, -2.2, 1.2, -2.2, 0.4);
    shieldShape.bezierCurveTo(-2.2, -0.8, -1.4, -1.8, 0, -2.8);
    shieldShape.bezierCurveTo(1.4, -1.8, 2.2, -0.8, 2.2, 0.4);
    shieldShape.bezierCurveTo(2.2, 1.2, 1.8, 2.2, 0, 2.2);

    const extrudeSettings = { depth: 0.3, bevelEnabled: true, bevelSegments: 4, bevelSize: 0.08, bevelThickness: 0.08 };
    const shieldGeo = new THREE.ExtrudeGeometry(shieldShape, extrudeSettings);
    shieldGeo.center();

    // Gradient material with emissive glow
    const shieldMat = new THREE.MeshPhongMaterial({
      color: new THREE.Color('#00d4ff'),
      emissive: new THREE.Color('#0033aa'),
      emissiveIntensity: 0.4,
      shininess: 120,
      transparent: true,
      opacity: 0.92,
    });

    const shield = new THREE.Mesh(shieldGeo, shieldMat);
    scene.add(shield);

    // Inner wireframe overlay
    const wireGeo = new THREE.ExtrudeGeometry(shieldShape, { ...extrudeSettings, depth: 0.05 });
    wireGeo.center();
    const wireMat = new THREE.MeshBasicMaterial({ color: '#7b2ff7', wireframe: true, transparent: true, opacity: 0.2 });
    const wireShield = new THREE.Mesh(wireGeo, wireMat);
    wireShield.position.z = 0.16;
    scene.add(wireShield);

    // Checkmark
    const checkShape = new THREE.Shape();
    checkShape.moveTo(-0.7, 0);
    checkShape.lineTo(-0.2, -0.6);
    checkShape.lineTo(0.8, 0.7);
    checkShape.lineTo(0.7, 0.9);
    checkShape.lineTo(-0.1, 0.1);
    checkShape.lineTo(-0.6, 0.2);
    checkShape.closePath();
    const checkGeo = new THREE.ShapeGeometry(checkShape);
    const checkMat = new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.95 });
    const check = new THREE.Mesh(checkGeo, checkMat);
    check.position.z = 0.22;
    scene.add(check);

    // Floating particles
    const particles = [];
    const particleGeo = new THREE.SphereGeometry(0.04, 8, 8);
    const particleMat = new THREE.MeshBasicMaterial({ color: '#00d4ff', transparent: true, opacity: 0.7 });
    for (let i = 0; i < 20; i++) {
      const p = new THREE.Mesh(particleGeo, particleMat.clone());
      const angle = (i / 20) * Math.PI * 2;
      const radius = 2.5 + Math.random() * 1.2;
      p.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, (Math.random() - 0.5) * 2);
      p.userData = { angle, radius, speed: 0.003 + Math.random() * 0.005, yOffset: Math.random() * Math.PI * 2 };
      scene.add(p);
      particles.push(p);
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight1 = new THREE.PointLight(0x00d4ff, 2, 10);
    pointLight1.position.set(3, 3, 3);
    scene.add(pointLight1);
    const pointLight2 = new THREE.PointLight(0x7b2ff7, 1.5, 10);
    pointLight2.position.set(-3, -2, 2);
    scene.add(pointLight2);

    // Mouse interaction
    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e) => {
      const rect = mount.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / W - 0.5) * 2;
      mouseY = -((e.clientY - rect.top) / H - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Animation
    let animId;
    let t = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      t += 0.01;

      // Shield rotation — subtle idle + mouse influence
      shield.rotation.y = Math.sin(t * 0.4) * 0.3 + mouseX * 0.2;
      shield.rotation.x = Math.sin(t * 0.3) * 0.1 + mouseY * 0.1;
      wireShield.rotation.y = shield.rotation.y;
      wireShield.rotation.x = shield.rotation.x;
      check.rotation.y = shield.rotation.y;
      check.rotation.x = shield.rotation.x;

      // Floating bob
      shield.position.y = Math.sin(t * 0.6) * 0.1;
      wireShield.position.y = shield.position.y;
      check.position.y = shield.position.y;

      // Color pulse
      const pulse = (Math.sin(t * 1.2) + 1) * 0.5;
      shieldMat.emissiveIntensity = 0.3 + pulse * 0.3;
      pointLight1.intensity = 1.5 + pulse * 1.0;

      // Particle orbit
      particles.forEach((p) => {
        const d = p.userData;
        d.angle += d.speed;
        p.position.x = Math.cos(d.angle) * d.radius;
        p.position.y = Math.sin(d.angle) * d.radius * 0.5 + Math.sin(t + d.yOffset) * 0.3;
        p.material.opacity = 0.3 + (Math.sin(t * 2 + d.yOffset) + 1) * 0.3;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const onResize = () => {
      const nW = mount.clientWidth;
      const nH = mount.clientHeight;
      camera.aspect = nW / nH;
      camera.updateProjectionMatrix();
      renderer.setSize(nW, nH);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="shield-canvas" />;
}
