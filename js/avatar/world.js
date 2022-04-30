import { createCamera } from './components/camera.js';
import { createCube } from './components/cube.js';
import { loadHarp } from './components/harp.js';
import { loadColumn } from './components/column.js';
import { loadCemAngel } from './components/cemetery-angel.js';
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

      // const cube = createCube();
      // scene.add(cube);
      // cube.position.set(3, 2, -2);
      // loop.updatables.push(cube);

      const light = createLights();
      light.position.set(10, 10, 1);
      light.intensity = 50;
      scene.add(light);

      const light2 = createLights();
      light2.position.set(0, 10, 1);
      light2.color = {r: 0.2, b: 1, g: 0.4}
      light2.intensity = 20;
      // scene.add(light2);


      // torus = createTorus();
      // scene.add(torus);
      // torus.position.set(-1, -1, 5);
      // torus.scale.set(0.5,0.5,0.5);
      // loop.updatables.push(torus);

      const resizer = new Resizer(container, camera, renderer);
      // resizer.onResize = () => {
      //   this.render();
      // };

    }

    async init() {
      // asynchronous setup here

      const {harp} = await loadHarp();

      harp.rotation.set(0, -2, 0);


      scene.add(harp);
      loop.updatables.push(harp);

      const {column} = await loadColumn();

      column.position.set(-5, -3, -8);
      scene.add(column);
      loop.updatables.push(column);

      const {cemAngel} = await loadCemAngel();
      cemAngel.scale.set(2,2,2);
      cemAngel.position.set(5, -3, -8);
      scene.add(cemAngel);
      loop.updatables.push(cemAngel);
      
      
      
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