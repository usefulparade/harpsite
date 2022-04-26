import { TorusGeometry, Mesh, MeshBasicMaterial, MeshStandardMaterial, MeshNormalMaterial } from 'https://cdn.skypack.dev/three@0.132.2';

function createTorus() {
  // create a geometry
  const geometry = new TorusGeometry(1, 0.5, 3, 7);

  const specs = {
    color: 'purple',
    emissive: 'lightblue',
    emissiveIntensity: 1
  }


  // create a default (white) Basic material
  const material = new MeshStandardMaterial(specs);

//   material.wireframe = true;

  // create a Mesh containing the geometry and material
  const torus = new Mesh(geometry, material);

  // this method will be called once per frame
  torus.tick = (delta) => {
    // increase the powerup's rotation each frame
    torus.rotation.z += 0.05 * delta;
    torus.rotation.x += 0.2 * delta;
    torus.rotation.y += 0.002 * delta;

  };

  return torus;
}

export { createTorus };