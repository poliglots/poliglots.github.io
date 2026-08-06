import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { MarkGithubIcon } from '@primer/octicons-react';

const badges = ['Go Microservices', 'TypeScript', 'Data Pipelines', 'Cloud Native', 'Real-time Systems', 'Kubernetes'];

const stats = [
    { value: '14+', label: 'yrs exp' },
    { value: '12', label: 'eng teams' },
    { value: '50M+', label: 'events/day' },
    { value: '$320K', label: 'cloud saved' },
];

export default function Home({ theme }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const cleanup = initParticles(canvasRef.current, theme);
        return cleanup;
    }, [theme]);

    return (
        <div id="home">
            <canvas ref={canvasRef} id="homeCanvas" />
            <div className="home-content">
                <div className="home-hero">
                    <p className="home-eyebrow">Staff Software Engineer</p>
                    <h1 className="home-title">polyglot.dev</h1>
                    <p className="home-tagline">
                        Senior Engineer specializing in Go microservices, TypeScript frontends, and Python data pipelines.
                        Building scalable systems from real-time streams to interactive dashboards.
                    </p>
                    <div className="home-stats">
                        {stats.map((s, i) => (
                            <div className="home-stat" key={s.label}>
                                <span className="home-stat-value">{s.value}</span>
                                <span className="home-stat-label">{s.label}</span>
                            </div>
                        ))}
                    </div>
                    <div className="home-badges">
                        {badges.map(b => (
                            <span className="home-badge" key={b}>{b}</span>
                        ))}
                    </div>
                    <div className="home-building">
                        <span className="home-building-dot" />
                        <span className="home-building-text">
                            Building: High-performance Go microservices with gRPC and TypeScript dashboards
                        </span>
                    </div>
                    <div className="home-links">
                        <a
                            href="https://github.com/poliglots"
                            target="_blank"
                            rel="noreferrer"
                            className="home-cta home-cta-primary"
                        >
                            <MarkGithubIcon size={18} />
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

const particleColor = { dark: 0x7ec5a6, light: 0x0060df };

function initParticles(canvas, theme) {
    const w = window.innerWidth;
    const h = window.innerHeight * 0.95;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 2000);
    camera.position.z = 320;

    const count = 2500;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * 1200;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 1200;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 800;
        speeds[i] = 0.2 + Math.random() * 0.6;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
        color: particleColor[theme] ?? particleColor.dark,
        size: 1.8,
        transparent: true,
        opacity: theme === 'dark' ? 0.55 : 0.4,
        sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let animId;
    let frame = 0;
    function animate() {
        animId = requestAnimationFrame(animate);
        frame++;
        points.rotation.y += 0.0008;
        points.rotation.x += 0.0003;

        // gentle wave on Y positions
        const pos = geometry.attributes.position;
        for (let i = 0; i < count; i++) {
            pos.setY(i, positions[i * 3 + 1] + Math.sin(frame * 0.005 + speeds[i] * 10) * 0.3);
        }
        pos.needsUpdate = true;

        renderer.render(scene, camera);
    }
    animate();

    function handleResize() {
        const nw = window.innerWidth;
        const nh = window.innerHeight * 0.95;
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh);
    }
    window.addEventListener('resize', handleResize);

    return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('resize', handleResize);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
    };
}
