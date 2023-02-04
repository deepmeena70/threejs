import * as THREE from 'three';
import WebGL from 'capabilities';

(() => {
  console.log('javascript is running...');
  const scene = new THREE.Scene();

  scene.background = new THREE.Color('#1E1E24');

  const camera = new THREE.PerspectiveCamera(
    5,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry(1,1,1);
  const material = new THREE.MeshNormalMaterial();

  const mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);

  camera.position.z = 45;

  const animate = () => {
    requestAnimationFrame(animate);

    mesh.rotation.x -= 0.005;
    mesh.rotation.y -= 0.005;
    mesh.rotation.z -= 0.005;

    renderer.render(scene, camera);
  };

  //   check WebGL support by browsers
  if (WebGL.isWebGLAvailable()) {
    // Initiate function or other initializations here
    animate();
  } else {
    const warning = WebGL.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
  }
})();
