DrawDrive.Test3D = function(canvas, lines)
{
    var self = this;
    
    var renderer;
    var camera;
    var mesh;
    var update;

    var linesLength = lines.length;

    var animate = function()
    {
        requestAnimationFrame(animate);

        if (update) update();
        
        renderer.render(scene, camera);

        stats.update();
    };

    this.flyThroughTrack = function()
    {
        var currentLineIndex = 0;
        var currentLine = lines[0];
        var nextLine = lines[1];
        var nextNextLine = lines[2];
        
        var pct = 0;
        var pos = new THREE.Vector3();
        var lookAt = new THREE.Vector3();

        update = function()
        {
            pos.x = currentLine.x + (nextLine.x - currentLine.x)*pct;
            pos.y = currentLine.y + (nextLine.y - currentLine.y)*pct;
            pos.z = currentLine.z + (nextLine.z - currentLine.z)*pct + 5;
            camera.position.set(pos.x, pos.y, pos.z);

            lookAt.x = nextLine.x + (nextNextLine.x - nextLine.x)*pct;
            lookAt.y = nextLine.y + (nextNextLine.y - nextLine.y)*pct;
            lookAt.z = nextLine.z + (nextNextLine.z - nextLine.z)*pct + 5;
            camera.target.position.set(lookAt.x, lookAt.y, lookAt.z);

            camera.up.set(0,0,1);

            pct += 0.05;
            if (pct > 1)
            {
                pct -= 1;

                currentLineIndex++;
                if (currentLineIndex >= linesLength) currentLineIndex = 0;
                
                currentLine = lines[currentLineIndex];
                nextLine = lines[currentLineIndex+1];
                nextNextLine = lines[currentLineIndex+2];
            }
        };
    };

    // setup 3D
    camera = new THREE.Camera(60, window.innerWidth / window.innerHeight, 1, 10000);
    var line = lines[10];
    camera.position.x = line.x;
    camera.position.y = line.z + 50;
    camera.position.z = line.y;

    line = lines[11];
    camera.target.position.x = camera.position.x;
    camera.target.position.y = camera.position.y;
    camera.target.position.z = camera.position.z-50;

    camera.up = new THREE.Vector3(0,1,0);

    var scene = new THREE.Scene();

    //renderer = new THREE.CanvasRenderer();
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(canvas.width, canvas.height);

    var container = document.getElementById('container');
    container.innerHTML = "";

    var stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    container.appendChild(stats.domElement);

    container.appendChild(renderer.domElement);

    // mesh
    var track = new DrawDrive.Track();
    var materials = [
        { material: new THREE.MeshBasicMaterial( { color: 0x00ffff, wireframe: true } ), overdraw: false, doubleSided: true },
        { material: new THREE.MeshBasicMaterial( { color: 0xff0000, blending: THREE.AdditiveBlending } ), overdraw: false, doubleSided: true },
        { material: new THREE.MeshLambertMaterial( { color: 0xffffff, shading: THREE.FlatShading } ), overdraw: true, doubleSided: false },
        { material: new THREE.MeshLambertMaterial( { color: 0xffffff, shading: THREE.SmoothShading } ), overdraw: true, doubleSided: false },
        { material: new THREE.MeshDepthMaterial(), overdraw: true, doubleSided: false },
        { material: new THREE.MeshNormalMaterial(), overdraw: true, doubleSided: false },
        { material: new THREE.MeshBasicMaterial( { map: ImageUtils.loadTexture( 'three.js/examples/textures/metal.jpg' ) } ), overdraw: false, doubleSided: true },
        { material: new THREE.MeshLambertMaterial( { map: ImageUtils.loadTexture( 'three.js/examples/textures/land_ocean_ice_cloud_2048.jpg' ) } ), overdraw: false, doubleSided: false },
        { material: new THREE.MeshBasicMaterial( { envMap: ImageUtils.loadTexture( 'three.js/examples/textures/envmap.png', new THREE.SphericalReflectionMapping() ) } ), overdraw: false, doubleSided: false }
    ];
    var brownTexture = new THREE.MeshBasicMaterial({color: 0x804020});
    var material = materials[6];
    mesh = new THREE.Mesh(track.create(lines), material.material);

    mesh.doubleSided = material.doubleSided;
    mesh.overdraw = material.overdraw;

    scene.addObject(mesh);

    // Lights

    scene.addLight( new THREE.AmbientLight( Math.random() * 0x202020 ) );

    var directionalLight = new THREE.DirectionalLight( Math.random() * 0xffffff );
    directionalLight.position.x = Math.random() - 0.5;
    directionalLight.position.y = Math.random() - 0.5;
    directionalLight.position.z = Math.random() - 0.5;
    directionalLight.position.normalize();
    scene.addLight( directionalLight );

    pointLight = new THREE.PointLight( 0xffffff, 1 );
    scene.addLight( pointLight );

    // make lines array easily loopable
    lines.push(lines[0]);
    lines.push(lines[1]);
    lines.push(lines[2]);

    // start rendering
    update = function()
    {
        //mesh.rotation.z += .005;
    }
    animate();
}