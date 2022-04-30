import { GLTFLoader} from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js';

import { setupModel } from './setupModel.js';


async function loadColumn() {
  const loader = new GLTFLoader();

  const columnData = await loader.loadAsync('/assets/models/greek_column/scene.gltf');

  console.log('a column appears!', columnData);

  const column = setupModel(columnData);

  column.scale.set(0.02, 0.02, 0.02);
//   column.position.set(5, -3, -4);

//   column.position.set (0, -0.5, 0);
//   column.rotation.x = -0.1;
  

  column.tick = (delta ) => {
    // increase the powerup's rotation each frame
    // column.rotation.z += 0.3 * delta;
    // column.rotation.x += 0.2 * delta;
    column.rotation.z += 0.04 * delta;

  };

  return { column };
}

export { loadColumn };