DrawDrive.Test3D = function(canvas)
{
    var self = this;
    
    //Console.button1("3D", doTest);

    var renderer;
    var camera;
    var mesh;

    this.animate = function()
    {
        requestAnimationFrame(self.animate);

        mesh.rotation.y += .01;
        renderer.render(scene, camera);

        stats.update();
    }

    //        var geometry = new THREE.Geometry();
    //        geometry.push(new THREE.Vertex(new THREE.Vector3(0,0,0)));

    camera = new THREE.Camera(60, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.y = 100;
    camera.position.x = -500;

    var scene = new THREE.Scene();

    renderer = new THREE.CanvasRenderer();
    renderer.setSize(canvas.width, canvas.height);

    var container = document.getElementById('container');
    container.innerHTML = "";

    var stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    container.appendChild(stats.domElement);

    container.appendChild(renderer.domElement);

    var hs = [];
    for (var i = 0; i < 10; i++)
    {
        hs.push({x1:10, y1:i*20, x2:-10, y2:i*20, z:Math.random()*30});
    }
    var track = new DrawDrive.Track();

    mesh = new THREE.Mesh(track.create(hs), new THREE.MeshBasicMaterial({color: 0x804020}));
    scene.addObject(mesh);

    this.animate();
}