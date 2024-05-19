import * as THREE from 'three';
import { extend } from '@react-three/fiber';

extend({ 
    BufferGeometry: THREE.BufferGeometry,
    CylinderBufferGeometry: THREE.CylinderGeometry, 
    ConeBufferGeometry: THREE.ConeGeometry,
    PlaneBufferGeometry: THREE.PlaneGeometry,
    BoxBufferGeometry: THREE.BoxGeometry  // Add this line

});