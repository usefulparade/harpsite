import { BoxBufferGeometry, Mesh, MeshBasicMaterial, MeshStandardMaterial } from 'https://cdn.skypack.dev/three@0.132.2';

function createCube() {
  // create a geometry
  const geometry = new BoxBufferGeometry(2, 2, 2);

  // create a default (white) Basic material
  const material = new MeshStandardMaterial();

  // create a Mesh containing the geometry and material
  const cube = new Mesh(geometry, material);

  cube.rotation.set(-0.5, -0.1, 0.8);

  cube.tick = (delta ) => {
    // increase the powerup's rotation each frame
    cube.rotation.z += 0.3 * delta;
    cube.rotation.x += 0.2 * delta;
    cube.rotation.y -= 0.02 * delta;

  };

  return cube;
}

export { createCube };