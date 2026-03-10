"use client";

import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';

type MarbleType = 'Blanco' | 'Negro' | 'Café' | 'Gris' | 'Verde Emperador';

const MARBLE_COLORS: Record<MarbleType, string> = {
    'Blanco': '#f5f5f5',
    'Negro': '#1a1a1a',
    'Café': '#4a3b32',
    'Gris': '#8c8c8c',
    'Verde Emperador': '#2E4C38',
};

function IslandModel({ marbleColor }: { marbleColor: string }) {
    return (
        <group>
            {/* Base de la Isla */}
            <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
                <boxGeometry args={[3, 1, 1.5]} />
                <meshStandardMaterial color="#f0f0f0" roughness={0.9} />
            </mesh>

            {/* Encimera de Mármol */}
            <mesh position={[0, 1.05, 0]} castShadow receiveShadow>
                <boxGeometry args={[3.2, 0.1, 1.7]} />
                <meshStandardMaterial color={marbleColor} roughness={0.1} metalness={0.2} />
            </mesh>
        </group>
    );
}

export default function KitchenIslandViewer() {
    const [marble, setMarble] = useState<MarbleType>('Blanco');

    return (
        <div className="flex flex-col gap-6 p-6 w-full max-w-5xl mx-auto">
            <div className="flex flex-col gap-3">
                <h2 className="text-3xl font-bold">Personalizador de Isla de Cocina</h2>
                <p className="text-gray-500">Selecciona el tipo de mármol para la encimera y previsualízalo en 3D.</p>

                <div className="flex flex-wrap gap-3 mt-4">
                    {(Object.keys(MARBLE_COLORS) as MarbleType[]).map((type) => (
                        <button
                            key={type}
                            onClick={() => setMarble(type)}
                            className={`px-5 py-2.5 rounded-full font-medium transition-all shadow-sm ${marble === type
                                    ? 'bg-black text-white scale-105'
                                    : 'bg-white text-gray-700 border hover:bg-gray-50'
                                }`}
                        >
                            Mármol {type}
                        </button>
                    ))}
                </div>
            </div>

            <div className="w-full h-[600px] border rounded-2xl overflow-hidden bg-slate-100 relative shadow-inner">
                <Canvas shadows camera={{ position: [4, 3, 5], fov: 45 }}>
                    {/* Entorno de luces para mejor realismo en el material metálico/mármol */}
                    <Environment preset="city" />
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[10, 10, 5]} castShadow intensity={1} shadow-mapSize={1024} />

                    {/* Sombras simuladas en el suelo */}
                    <ContactShadows resolution={512} position={[0, 0, 0]} opacity={0.6} scale={10} blur={2} far={4} />

                    <OrbitControls
                        minPolarAngle={0}
                        maxPolarAngle={Math.PI / 2 + 0.1}
                        minDistance={3}
                        maxDistance={10}
                        enablePan={false}
                    />

                    <IslandModel marbleColor={MARBLE_COLORS[marble]} />
                </Canvas>
                <div className="absolute bottom-4 right-4 bg-white/80 px-3 py-1.5 rounded-md text-sm font-medium shadow backdrop-blur-sm">
                    Arrastra para rotar • Scroll para zoom
                </div>
            </div>
        </div>
    );
}
