import * as React from 'react';

// ── CSS module imports ──────────────────────────────────────────────────────
declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.module.css' {
  const content: Record<string, string>;
  export default content;
}

// ── Three.js / R3F JSX elements ─────────────────────────────────────────────
declare global {
  namespace JSX {
    interface IntrinsicElements {
      // r3f helpers
      primitive: any;
      ambientLight: any;
      directionalLight: any;
      pointLight: any;
      spotLight: any;
      hemisphereLight: any;
      // geometry / mesh
      mesh: any;
      group: any;
      points: any;
      line: any;
      lineSegments: any;
      // geometries
      sphereGeometry: any;
      boxGeometry: any;
      planeGeometry: any;
      cylinderGeometry: any;
      torusGeometry: any;
      bufferGeometry: any;
      // materials
      meshStandardMaterial: any;
      meshBasicMaterial: any;
      meshPhysicalMaterial: any;
      meshNormalMaterial: any;
      meshLambertMaterial: any;
      shaderMaterial: any;
      rawShaderMaterial: any;
      // cameras
      perspectiveCamera: any;
      orthographicCamera: any;
    }
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      primitive: any;
      ambientLight: any;
      directionalLight: any;
      pointLight: any;
      spotLight: any;
      hemisphereLight: any;
      mesh: any;
      group: any;
      points: any;
      line: any;
      lineSegments: any;
      sphereGeometry: any;
      boxGeometry: any;
      planeGeometry: any;
      cylinderGeometry: any;
      torusGeometry: any;
      bufferGeometry: any;
      meshStandardMaterial: any;
      meshBasicMaterial: any;
      meshPhysicalMaterial: any;
      meshNormalMaterial: any;
      meshLambertMaterial: any;
      shaderMaterial: any;
      rawShaderMaterial: any;
      perspectiveCamera: any;
      orthographicCamera: any;
    }
  }
}
