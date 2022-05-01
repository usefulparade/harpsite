import { GLTFLoader} from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js';

import { setupModel } from './setupModel.js';


async function loadAngelbby() {
  const loader = new GLTFLoader();

  const angelbbyData = await loader.loadAsync('./assets/models/avatar-test-merged.glb');

  console.log('angelbby has arrived!', angelbbyData);

  const angelbby = setupModel(angelbbyData);

//   column.scale.set(0.02, 0.02, 0.02);
//   column.position.set(5, -3, -4);

//   column.position.set (0, -0.5, 0);
//   column.rotation.x = -0.1;
  

  angelbby.tick = (delta ) => {
    // increase the powerup's rotation each frame
    // column.rotation.z += 0.3 * delta;
    // column.rotation.x += 0.2 * delta;
    angelbby.rotation.y += 0.4 * delta;

  };

  return { angelbby };
}

export { loadAngelbby };