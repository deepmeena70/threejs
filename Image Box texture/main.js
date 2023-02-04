import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import WebGL from 'capabilities';

(() => {
  console.log('javascript is running...');
  const scene = new THREE.Scene();

  scene.background = new THREE.Color('#1E1E24');

  const camera = new THREE.PerspectiveCamera(
    100,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
  );

  const texture = new THREE.TextureLoader().load('textures/space.jpg');

  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 1);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  camera.position.set(1000, 1000, 1000);

  const geometry = new THREE.SphereGeometry(1000, 1000, 1000);
  const material = new THREE.MeshBasicMaterial({
    color: 'white',
    map: texture,
  });

  const mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);

  controls.update();

  const animate = () => {
    requestAnimationFrame(animate);

    mesh.rotation.x -= 0.002;
    mesh.rotation.y -= 0.005;
    mesh.rotation.z -= 0.003;

    controls.update();

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

  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  addEventListener('resize', onWindowResize);
})();
