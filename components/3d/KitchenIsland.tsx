"use client";

import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, MeshReflectorMaterial, SoftShadows } from '@react-three/drei';

type MarbleType = 'Blanco' | 'Negro' | 'Café' | 'Gris' | 'Verde Emperador';

const MARBLE_COLORS: Record<MarbleType, string> = {
    'Blanco': '#fcfcfc',
    'Negro': '#111111',
    'Café': '#3e2723',
    'Gris': '#757575',
    'Verde Emperador': '#1b3320',
};

function KitchenEnvironment() {
    return (
        <group>
            {/* Suelo con reflejos ultrarrealistas */}
            <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[50, 50]} />
                <MeshReflectorMaterial
                    blur={[400, 100]}
                    resolution={1024}
                    mixBlur={1}
                    mixStrength={50}
                    roughness={0.15}
                    depthScale={1.2}
                    minDepthThreshold={0.4}
                    maxDepthThreshold={1.4}
                    color="#333333"
                    metalness={0.5}
                    mirror={1}
                />
            </mesh>

            {/* Pared de fondo */}
            <mesh position={[0, 2.5, -5]} receiveShadow>
                <boxGeometry args={[30, 10, 0.2]} />
                <meshStandardMaterial color="#f8f9fa" roughness={0.9} />
            </mesh>

            {/* Pared lateral izquierda (para dar sensación de esquina) */}
            <mesh position={[-6, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
                <boxGeometry args={[30, 10, 0.2]} />
                <meshStandardMaterial color="#f1f3f5" roughness={0.9} />
            </mesh>
        </group>
    );
}

function IslandModel({ marbleColor }: { marbleColor: string }) {
    return (
        <group position={[0, 0, 0]}>
            {/* Zócalo / Base Metálica Inferior */}
            <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
                <boxGeometry args={[2.8, 0.1, 1.0]} />
                <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Gabinetes / Cuerpo de la Isla */}
            <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
                <boxGeometry args={[3, 0.9, 1.2]} />
                {/* Color de madera oscura o panel de lujo */}
                <meshStandardMaterial color="#2d3748" roughness={0.8} />
            </mesh>

            {/* Detalles: Ranuras o separaciones de los cajones */}
            <mesh position={[-0.75, 0.45, 0.61]} castShadow>
                <boxGeometry args={[0.02, 0.8, 0.02]} />
                <meshStandardMaterial color="#1a202c" />
            </mesh>
            <mesh position={[0.75, 0.45, 0.61]} castShadow>
                <boxGeometry args={[0.02, 0.8, 0.02]} />
                <meshStandardMaterial color="#1a202c" />
            </mesh>
            <mesh position={[0, 0.45, 0.61]} castShadow>
                <boxGeometry args={[0.02, 0.8, 0.02]} />
                <meshStandardMaterial color="#1a202c" />
            </mesh>

            {/* Encimera de Mármol con Voladizo para taburetes */}
            <mesh position={[0, 0.95, 0.2]} castShadow receiveShadow>
                {/* Más ancha y desplazada en Z para el "overhang" */}
                <boxGeometry args={[3.2, 0.08, 1.6]} />
                <meshStandardMaterial
                    color={marbleColor}
                    roughness={0.05} // Muy pulido
                    metalness={0.1}
                    envMapIntensity={1.5}
                />
            </mesh>

            {/* Decoración: Frutero o Bol Mínimalista */}
            <mesh position={[-0.8, 1.02, 0]} castShadow>
                <cylinderGeometry args={[0.2, 0.1, 0.08, 32]} />
                <meshStandardMaterial color="#e2e8f0" roughness={0.3} metalness={0.2} />
            </mesh>
            <mesh position={[-0.8, 1.05, 0]} castShadow>
                <sphereGeometry args={[0.15, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#fb923c" roughness={0.5} />
            </mesh>

            {/* Decoración: Tablas de picar de madera */}
            <group position={[0.8, 1.00, -0.1]} rotation={[0, Math.PI / 6, 0]}>
                <mesh castShadow receiveShadow>
                    <boxGeometry args={[0.4, 0.02, 0.6]} />
                    <meshStandardMaterial color="#b48460" roughness={0.8} />
                </mesh>
                <mesh position={[0.1, 0.02, -0.05]} castShadow receiveShadow rotation={[0, -0.1, 0]}>
                    <boxGeometry args={[0.3, 0.02, 0.5]} />
                    <meshStandardMaterial color="#966a4a" roughness={0.8} />
                </mesh>
            </group>
        </group>
    );
}

export default function KitchenIslandViewer() {
    const [marble, setMarble] = useState<MarbleType>('Blanco');

    return (
        <div className="flex flex-col gap-6 p-6 w-full max-w-[1400px] mx-auto">
            <div className="flex flex-col gap-3 text-center sm:text-left items-center sm:items-start">
                <h2 className="text-3xl font-bold tracking-tight">Diseño de Interiores Interactivo</h2>
                <p className="text-muted-foreground max-w-2xl">
                    Visualiza combinaciones de piedra natural en un entorno realista. Navega en el espacio 3D para apreciar reflejos y texturas.
                </p>

                <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-6">
                    {(Object.keys(MARBLE_COLORS) as MarbleType[]).map((type) => (
                        <button
                            key={type}
                            onClick={() => setMarble(type)}
                            className={`px-6 py-3 rounded-full font-medium transition-all shadow-sm flex items-center gap-2 ${marble === type
                                    ? 'bg-orange-900 text-white scale-105 shadow-lg ring-2 ring-orange-900/40 ring-offset-2'
                                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                                }`}
                        >
                            <span
                                className="w-4 h-4 rounded-full border border-gray-300 shadow-inner"
                                style={{ backgroundColor: MARBLE_COLORS[type] }}
                            />
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            <div className="w-full h-[75vh] min-h-[500px] border border-gray-200 rounded-3xl overflow-hidden bg-slate-50 relative shadow-2xl ring-1 ring-black/5 mt-4">
                <Canvas shadows camera={{ position: [4, 3, 6], fov: 45 }}>
                    <color attach="background" args={['#e5e7eb']} />

                    {/* El preset 'apartment' de Environment descarga y aplica un HDRI (imagen realista) para iluminación y reflejos */}
                    <Environment preset="apartment" background blur={0.8} />

                    <SoftShadows size={15} samples={16} focus={0.5} />
                    <ambientLight intensity={0.4} />
                    <directionalLight
                        castShadow
                        position={[8, 10, 5]}
                        intensity={1.5}
                        shadow-mapSize={[2048, 2048]}
                        shadow-camera-near={1}
                        shadow-camera-far={30}
                        shadow-camera-top={10}
                        shadow-camera-right={10}
                        shadow-camera-bottom={-10}
                        shadow-camera-left={-10}
                        shadow-bias={-0.0001}
                    />

                    <Suspense fallback={null}>
                        <KitchenEnvironment />
                        <IslandModel marbleColor={MARBLE_COLORS[marble]} />
                    </Suspense>

                    <OrbitControls
                        makeDefault
                        minPolarAngle={0}
                        maxPolarAngle={Math.PI / 2 - 0.05} // Impide ver debajo del suelo
                        minDistance={3}
                        maxDistance={12}
                        target={[0, 0.8, 0]}
                    />
                </Canvas>

                {/* Etiqueta de Vista 3D */}
                <div className="absolute top-6 right-6 bg-white/90 px-4 py-2 rounded-full text-xs font-semibold shadow-lg backdrop-blur-md border border-white/50 text-slate-700 flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
                    </span>
                    Render Realista
                </div>

                {/* Instrucciones */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/70 text-white px-6 py-3 rounded-full text-sm font-medium shadow-2xl backdrop-blur-md pointer-events-none border border-white/10 hidden sm:block">
                    👆 Haz clic y arrastra para explorar • 🖱️ Scroll para zoom
                </div>
            </div>
        </div>
    );
}
