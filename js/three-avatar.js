

import { World } from './avatar/world.js';

// create the main function
async function main() {
  // Get a reference to the container element
  const container = document.querySelector('#scene-container');

  // 1. Create an instance of the World app
  const world = new World(container);

  await world.init();

  // 2. Render the scene
  world.start();
}

// call main to start the app
main().catch((err) => {
  console.error(err);
});



// OLD TUTORIAL STUFF:


// // import \* as THREE from '../js/three/build/three.module.js';
// import {
//     Camera,
//     Material,
//     Texture,
//     Scene,
//     PerspectiveCamera,
//     WebGLRenderer,
//     Mesh,
//     BoxBufferGeometry,
//     MeshBasicMaterial,
//     Color,
//   } from "https://cdn.skypack.dev/three@0.132.2";

// import { OrbitControls } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js";
// import { GLTFLoader } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js";

// const container = document.querySelector('#scene-container');
// const scene = new Scene();

// const fov = 35; // AKA Field of View
// const aspect = container.clientWidth / container.clientHeight;
// const near = 0.1; // the near clipping plane
// const far = 100; // the far clipping plane
// const camera = new PerspectiveCamera(fov, aspect, near, far);
// camera.position.set(0, 0, 10);



// const geometry = new BoxBufferGeometry(2,2,2);
// const basicMaterial = new MeshBasicMaterial();

// const cube = new Mesh(geometry, basicMaterial);

// scene.add(cube);

// const renderer = new WebGLRenderer( { alpha: true } );
// renderer.setSize(container.clientWidth, container.clientHeight);
// renderer.setPixelRatio(window.devicePixelRatio);

// // add the automatically created <canvas> element to the page
// container.append(renderer.domElement);

// // render, or 'create a still image', of the scene
// renderer.render(scene, camera);