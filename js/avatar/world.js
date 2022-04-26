import { createCamera } from './components/camera.js';
import { createCube } from './components/cube.js';
import { createTorus } from './components/torus.js';
import { createScene } from './components/scene.js';
import { createLights } from './components/lights.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';

let camera;
let renderer;
let scene;
let torus;
let loop;

class World {
    // 1. Create an instance of the World app
    constructor(container) {
      camera = createCamera();
      scene = createScene();
      renderer = createRenderer();

      loop = new Loop(camera, scene, renderer);

      container.append(renderer.domElement);

      const cube = createCube();
      scene.add(cube);
      cube.position.set(3, 2, -2);
      loop.updatables.push(cube);

      const light = createLights();
      scene.add(light);


      torus = createTorus();
      scene.add(torus);
      torus.position.set(-1, -1, 5);
      torus.scale.set(0.5,0.5,0.5);

      loop.updatables.push(torus);

      const resizer = new Resizer(container, camera, renderer);
      // resizer.onResize = () => {
      //   this.render();
      // };

    }
  
    // 2. Render the scene
    render() {

      renderer.render(scene, camera);

    }

    start() {
      loop.start();
    }
    
    stop() {
      loop.stop();
    }
  }
  
  export { World };