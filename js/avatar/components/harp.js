import { GLTFLoader} from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js';
import { LoadingManager } from 'https://cdn.skypack.dev/three@0.132.2';
import { setupModel } from './setupModel.js';


async function loadHarp() {
  const loader = new GLTFLoader();

  const harpData = await loader.loadAsync('../assets/models/harp.glb');

  console.log('a heavenly glissando!', harpData);

  

  const harp = setupModel(harpData);

  harp.position.set (0, -0.5, 0);
  harp.rotation.x = -0.1;
  

  harp.tick = (delta ) => {
    // increase the powerup's rotation each frame
    // harp.rotation.z += 0.3 * delta;
    // harp.rotation.x += 0.2 * delta;
    harp.rotation.y -= 0.3 * delta;

  };

  return { harp };
}

export { loadHarp };