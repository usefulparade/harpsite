// function threeInit(){
            

//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

//     const renderer = new THREE.WebGLRenderer();
//     renderer.setSize( window.innerWidth, window.innerHeight );

//     renderer.outputEncoding = THREE.sRGBEncoding;
//     document.body.appendChild( renderer.domElement );


//     const geometry = new THREE.TorusGeometry(30, 5, 16, 100);
//     const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
//     const torus = new THREE.Mesh( geometry, material );
//     scene.add( torus );

//     const light = new THREE.AmbientLight( 0x404040, 10 ); // soft white light
//     scene.add( light );

//     camera.position.z = 50;

    

//     function animate() {
//         requestAnimationFrame( animate );

//         torus.rotation.x += 0.001;
//         torus.rotation.y += 0.005;

//         renderer.render( scene, camera );
//     };

//     animate();
// }

var sketch = function(bb){
    bb.cyberAngel;
    p5.disableFriendlyErrors = true; // disables FES

    bb.preload = function(){
        bb.cyberAngel = loadModel("./assets/models/cyber-angel/cyber-angel.obj", true);
    }

    bb.setup = function(){
        bb.createCanvas(windowWidth, windowHeight, WEBGL);
        // bb.perspective(PI / 3.0, width / height, 0.1, 5000);
    }

    bb.draw = function(){
        bb.background(255);
        bb.directionalLight(150,0,150,-1,0,0);
        bb.directionalLight(255,150,150,0,-1,0);
        bb.directionalLight(50,100,255,1,0,0);
        bb.ambientLight(50,50,50);
        bb.pointLight(0,0,150, bb.mouseX - bb.width/2, bb.mouseY - bb.height/2, 100);
        bb.push();
            bb.scale(3);
            bb.rotateX(PI);
            bb.rotateY(PI + bb.frameCount*0.01);
            // bb.normalMaterial();
            bb.specularMaterial(255,255,255);
            // bb.fill(255);
            // bb.stroke(1);
            bb.noStroke();
            bb.model(bb.cyberAngel);
        bb.pop();

        // bb.push();
        //     bb.scale(10);
        //     bb.ambientMaterial(255);
        //     bb.sphere(300, 3, 4);
        // bb.pop();

        bb.push();
            bb.scale(1);
            bb.ambientMaterial(255);
            bb.translate(0, 300);
            bb.rotateX(PI/2);
            bb.plane(5000,1000)
        bb.pop();



    }
}

var avatar = new p5(sketch);