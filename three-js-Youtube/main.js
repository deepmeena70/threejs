import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {
  CSS3DRenderer,
  CSS3DObject,
} from 'three/addons/renderers/CSS3DRenderer.js';

(() => {
  console.log('javascript is running...');

  let camera, scene, renderer;
  let controls;

  // this 👇🏻 function works as a constructor and return a object
  function Element(id, x, y, z, ry) {
    const div = document.createElement('div');
    div.style.width = '480px';
    div.style.height = '360px';
    div.style.backgroundColor = '#000';

    const iframe = document.createElement('iframe');
    iframe.style.width = '480px';
    iframe.style.height = '360px';
    iframe.style.border = '0px';
    iframe.src = ['https://www.youtube.com/embed/', id, '?rel=0'].join('');
    div.appendChild(iframe);

    const object = new CSS3DObject(div);
    object.position.set(x, y, z);
    object.rotation.y = ry;

    return object;
  };

  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  const init = () => {
    const container = document.getElementById('container');

    camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      5000
    );
    camera.position.set(500, 350, 750);

    scene = new THREE.Scene();

    renderer = new CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    group.add(new Element('kMfi7TjA8p0', 0, 0, 240, 0)); //0 deg as (0 * Math.PI / 180)
    group.add(new Element('4gzRW1yQC2A', 240, 0, 0, Math.PI / 2)); //90 deg
    group.add(new Element('Femlk4BJ4xE', 0, 0, -240, Math.PI)); //180 deg
    group.add(new Element('EIGGPL39_RM', -240, 0, 0, -Math.PI / 2)); //360 deg
    scene.add(group);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.rotateSpeed = 2;

    window.addEventListener('resize', onResize);

    // Block iframe events when dragging camera

    const blocker = document.getElementById('blocker');
    blocker.style.display = 'none';

    controls.addEventListener('start', function () {
      blocker.style.display = '';
    });
    controls.addEventListener('end', function () {
      blocker.style.display = 'none';
    });
  };

  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };

  init();
  animate();

  window.addEventListener('resize', onResize);
})();
