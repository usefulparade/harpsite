import { DirectionalLight } from 'https://cdn.skypack.dev/three@0.132.2';

function createLights() {
    const light = new DirectionalLight('pink', 18);
    
    // light.color = {r: 1, g: 1, b: 1};
    console.log(light);

     // move the light right, up, and towards us
    // light.position.set(10, 10, 1);
  
    return light;
  }
  
  export { createLights };