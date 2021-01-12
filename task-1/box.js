function main(){
    var color = 0xFFFFFF;
    var canvas = document.querySelector('#c');
    var renderer = new THREE.WebGLRenderer({canvas});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var camera = new THREE.PerspectiveCamera(
        65,
        window.innerWidth / window.innerHeight,
        0.01,
        1000
    );
    camera.position.z = 6;
    
    var scene = new THREE.Scene();

    //bufferGeom

    var vertices = [
        //front
        { pos: [-1, -1,  1], norm: [ 0,  0,  1], uv: [0, 0], }, // 0
        { pos: [ 1, -1,  1], norm: [ 0,  0,  1], uv: [1, 0], }, // 1
        { pos: [-1,  1,  1], norm: [ 0,  0,  1], uv: [0, 1], }, // 2
        { pos: [ 1,  1,  1], norm: [ 0,  0,  1], uv: [1, 1], }, // 3
        // right
        { pos: [ 1, -1,  1], norm: [ 1,  0,  0], uv: [0, 0], }, // 4
        { pos: [ 1, -1, -1], norm: [ 1,  0,  0], uv: [1, 0], }, // 5
        { pos: [ 1,  1,  1], norm: [ 1,  0,  0], uv: [0, 1], }, // 6
        { pos: [ 1,  1, -1], norm: [ 1,  0,  0], uv: [1, 1], }, // 7
        // back
        { pos: [ 1, -1, -1], norm: [ 0,  0, -1], uv: [0, 0], }, // 8
        { pos: [-1, -1, -1], norm: [ 0,  0, -1], uv: [1, 0], }, // 9
        { pos: [ 1,  1, -1], norm: [ 0,  0, -1], uv: [0, 1], }, // 10
        { pos: [-1,  1, -1], norm: [ 0,  0, -1], uv: [1, 1], }, // 11
        // left
        { pos: [-1, -1, -1], norm: [-1,  0,  0], uv: [0, 0], }, // 12
        { pos: [-1, -1,  1], norm: [-1,  0,  0], uv: [1, 0], }, // 13
        { pos: [-1,  1, -1], norm: [-1,  0,  0], uv: [0, 1], }, // 14
        { pos: [-1,  1,  1], norm: [-1,  0,  0], uv: [1, 1], }, // 15
        // top
        { pos: [ 1,  1, -1], norm: [ 0,  1,  0], uv: [0, 0], }, // 16
        { pos: [-1,  1, -1], norm: [ 0,  1,  0], uv: [1, 0], }, // 17
        { pos: [ 1,  1,  1], norm: [ 0,  1,  0], uv: [0, 1], }, // 18
        { pos: [-1,  1,  1], norm: [ 0,  1,  0], uv: [1, 1], }, // 19
        // bottom
        { pos: [ 1, -1,  1], norm: [ 0, -1,  0], uv: [0, 0], }, // 20
        { pos: [-1, -1,  1], norm: [ 0, -1,  0], uv: [1, 0], }, // 21
        { pos: [ 1, -1, -1], norm: [ 0, -1,  0], uv: [0, 1], }, // 22
        { pos: [-1, -1, -1], norm: [ 0, -1,  0], uv: [1, 1], }, // 23
    ];
    const numVertices = vertices.length;
    const positionNumComponents = 3;
    const normalNumComponents = 3;
    const uvNumComponents = 2;
    const positions = new Float32Array(numVertices * positionNumComponents)
    const normals = new Float32Array(numVertices * normalNumComponents);
    const uvs = new Float32Array(numVertices * uvNumComponents);
    let uvsNdx = 0;
    let posNdx = 0;
    let nrmNdx = 0;
    for (const vertex of vertices){
        positions.set(vertex.pos, posNdx);
        normals.set(vertex.norm, nrmNdx);
        uvs. set(vertex.uv, uvsNdx);
        posNdx += positionNumComponents;
        nrmNdx += normalNumComponents;
        uvsNdx += uvNumComponents;
    };

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, positionNumComponents)
    );
    geometry.setAttribute(
        'normal',
        new THREE.BufferAttribute(normals, normalNumComponents)
    );
    geometry.setAttribute(
        'uv',
        new THREE.BufferAttribute(uvs, uvNumComponents)
    );

    geometry.setIndex([
        0,  1,  2,   2,  1,  3,  // front
        4,  5,  6,   6,  5,  7,  // right
        8,  9, 10,  10,  9, 11,  // back
        12, 13, 14,  14, 13, 15,  // left
        16, 17, 18,  18, 17, 19,  // top
        20, 21, 22,  22, 21, 23,  // bottom
    ]);
    //end of bufferGeom

    var texture = new THREE.TextureLoader().load( 'textures/box.gif' );
    
    function makeInstance(geometry, x){
        const material = new THREE.MeshPhongMaterial({ map: texture });

        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        cube.position.x = x;
        return cube;
    }

    const cubes = [
        makeInstance(geometry, -4),
        makeInstance(geometry, 0),
        makeInstance(geometry, 4)
    ]

    // BOXGEOM

    //var geometry = new THREE.BoxGeometry(1, 1, 1);
    // var texture = new THREE.TextureLoader().load( 'textures/box.gif' );
    // var material = new THREE.MeshPhongMaterial( {map: texture} );
    //var cube = new THREE.Mesh(geometry, material);
    //scene.add( cube );
    //END of BOXGEOM

    var lightColor = 0xFFFFFF;
    var intensity = 1;
    var light = new THREE.DirectionalLight(lightColor, intensity);
    light.position.set(5, 3, 6);
    scene.add( light );


  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    cubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * .1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
