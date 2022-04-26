import { Clock } from 'https://cdn.skypack.dev/three@0.132.2';

const clock = new Clock();

class Loop {
  constructor(camera, scene, renderer) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatables = [];
  }

  start() {
    this.renderer.setAnimationLoop(() => {  
        // tell every animated object to tick forward one frame
        this.tick();

        // render a frame
        this.renderer.render(this.scene, this.camera);
      });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  tick() {
    const delta = clock.getDelta();

    // Code to update animations will go here
    for (const object of this.updatables) {
        object.tick(delta);
      }
  }
}

export { Loop }