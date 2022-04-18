function threeInit(){
            

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    renderer.outputEncoding = THREE.sRGBEncoding;
    document.body.appendChild( renderer.domElement );


    const geometry = new THREE.TorusGeometry(30, 5, 16, 100);
    const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    const torus = new THREE.Mesh( geometry, material );
    scene.add( torus );

    const light = new THREE.AmbientLight( 0x404040, 10 ); // soft white light
    scene.add( light );

    camera.position.z = 50;

    

    function animate() {
        requestAnimationFrame( animate );

        torus.rotation.x += 0.001;
        torus.rotation.y += 0.005;

        renderer.render( scene, camera );
    };

    animate();
}