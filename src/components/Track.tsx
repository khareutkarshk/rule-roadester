"use client"
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Plane, OrbitControls } from '@react-three/drei';
import { BackSide, Group, Vector3 } from 'three';
import { TextureLoader } from 'three';

// Extend Three.js to include CylinderBufferGeometry and ConeBufferGeometry
import '../extendThree';

const Road: React.FC = () => (
    <Plane args={[10, 100]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -50]}>
        <meshStandardMaterial color="gray" />
    </Plane>
);

interface TreeProps {
    position: Vector3 | [number, number, number];
}

const Tree: React.FC<TreeProps> = ({ position }) => (
    <group position={position}>
        {/* Tree Trunk */}
        <mesh position={[0, 1, 0]}>
            <cylinderBufferGeometry args={[0.2, 0.2, 2]} />
            <meshStandardMaterial color="brown" />
        </mesh>
        {/* Tree Foliage */}
        <mesh position={[0, 2.5, 0]}>
            <coneBufferGeometry args={[1, 2, 8]} />
            <meshStandardMaterial color="green" />
        </mesh>
        <mesh position={[0, 4, 0]}>
            <coneBufferGeometry args={[0.8, 1.5, 8]} />
            <meshStandardMaterial color="green" />
        </mesh>

        {/* Light */}
        <pointLight position={[0, 5, 0]} intensity={1} distance={5} />
    </group>
);

const Track = () => {
    const trackRef = useRef<any>();

    useFrame(() => {
        if (trackRef.current) {
            trackRef.current.position.z += 0.1;
            if (trackRef.current.position.z > 50) {
                trackRef.current.position.z = 0;
            }
        }
    });

    return (
        <group ref={trackRef}>
            <Road />
            {/* Add sky above the road and grass */}
            <Plane args={[0.2, 100]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -50]}>
                <meshStandardMaterial color="white" />
            </Plane>
            {/* Add grass on the sides of the road */}
            <Plane args={[20, 100]} rotation={[-Math.PI / 2, 0, 0]} position={[-15, 0, -50]}>
                <meshStandardMaterial color="lightgreen" />
            </Plane>
            <Plane args={[20, 100]} rotation={[-Math.PI / 2, 0, 0]} position={[15, 0, -50]}>
                <meshStandardMaterial color="lightgreen" />
            </Plane>
            
            {[...Array(20)].map((_, i) => (
                // Place trees to the right of the road
                <Tree key={i} position={[5, 0, -10 * i]} />
            ))}
            {[...Array(20)].map((_, i) => (
                // Place trees to the left of the road
                <Tree key={i} position={[-5, 0, -10 * i]} />
            ))}
        </group>
    );
};

const Scene: React.FC = () => (
    <Canvas className="h-full w-full">
        <ambientLight intensity={0.5} />
        <pointLight position={[20, 20, 20]} />
        <Track />
        <OrbitControls />
    </Canvas>
);

export default Scene;