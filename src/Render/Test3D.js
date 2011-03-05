DrawDrive.Test3D = function(canvas, lines)
{
    var self = this;
    
    var renderer;
    var camera;
    var mesh;

    this.animate = function()
    {
        requestAnimationFrame(self.animate);

        mesh.rotation.z += .01;
        renderer.render(scene, camera);

        stats.update();
    }

    //        var geometry = new THREE.Geometry();
    //        geometry.push(new THREE.Vertex(new THREE.Vector3(0,0,0)));

    camera = new THREE.Camera(60, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.y = 500;
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

//    var hs = [];
//    for (var i = 0; i < lines.length; i++)
//    {
//        hs.push({x1:i*20, y1:y+25, x2:i*20, y2:y-25, z:Math.random()*30});
//    }
console.log(lines);
    var track = new DrawDrive.Track();
    mesh = new THREE.Mesh(track.create(lines), new THREE.MeshBasicMaterial({color: 0x804020}));

    mesh.rotation.x = -Math.PI/2;
    
    scene.addObject(mesh);

    this.animate();
}