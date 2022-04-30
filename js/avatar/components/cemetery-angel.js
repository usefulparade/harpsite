import { GLTFLoader} from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js';

import { setupModel } from './setupModel.js';


async function loadCemAngel() {
  const loader = new GLTFLoader();

  const cemAngelData = await loader.loadAsync('./assets/models/cemetery_angel/scene.gltf');

  console.log('a cemAngel appears!', cemAngelData);

  const cemAngel = setupModel(cemAngelData);

//   cemAngel.scale.set(0.02, 0.02, 0.02);
//   cemAngel.position.set(5, -3, -4);

//   cemAngel.position.set (0, -0.5, 0);
//   cemAngel.rotation.x = -0.1;
  

  cemAngel.tick = (delta ) => {
    // increase the powerup's rotation each frame
    // cemAngel.rotation.z += 0.3 * delta;
    // cemAngel.rotation.x += 0.2 * delta;
    cemAngel.rotation.z -= 0.04 * delta;

  };

  return { cemAngel };
}

export { loadCemAngel };