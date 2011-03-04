DrawDrive.Track = function()
{
    this.create = function(dots)
    {
        if (dots.length < 2)
        {
            return null;
        }

        var i, dot;
        var track = new THREE.Geometry();

        for (i = 0; i < dots.length; i++)
        {
            dot = dots[i];
            track.vertices.push(new THREE.Vertex(new THREE.Vector3(dot.x1, dot.z, dot.y1)));
            track.vertices.push(new THREE.Vertex(new THREE.Vector3(dot.x2, dot.z, dot.y2)));
        }

        
//        var track = new Cube(500, 20, 50, dots.length - 1, 1, 1);

        /*// one end
        var dot = dots[0];
        track.vertices[0].position.addSelf(new THREE.Vector3(0,10,0));
        track.vertices[1].position.addSelf(new THREE.Vector3(0,10,0));
        track.vertices[2].position.addSelf(new THREE.Vector3(0,10,0));
        track.vertices[3].position.addSelf(new THREE.Vector3(0,10,0));

        for (i = 8; i < 237; i++)
        {
            track.vertices[i].position.addSelf(new THREE.Vector3(0,10,0));
        }
console.log(track.vertices.length);
        // the other end
        dot = dots[dots.length-1];
        track.vertices[4].position.addSelf(new THREE.Vector3(0,10,0));
        track.vertices[5].position.addSelf(new THREE.Vector3(0,10,0));
        track.vertices[6].position.addSelf(new THREE.Vector3(0,10,0));
        track.vertices[7].position.addSelf(new THREE.Vector3(0,10,0));

        // middle
        var dl = 0;//dots.length - 2;
        for (i = 0; i < dl; i++)
        {
            dot = dots[1 + i];
            track.vertices[i + 8].position.addSelf(new THREE.Vector3(0,10,0));
            track.vertices[i + 8 + dl].position.addSelf(new THREE.Vector3(0,10,0));
            track.vertices[i + 8 + 2*dl].position.addSelf(new THREE.Vector3(0,10,0));
            track.vertices[i + 8 + 3*dl].position.addSelf(new THREE.Vector3(0,10,0));
        }
*/
        /*
        // one end
        var dot = dots[0];
        track.vertices[0].position.addSelf(new THREE.Vector3(dot.x1, dot.z, dot.y1));
        track.vertices[1].position.addSelf(new THREE.Vector3(dot.x2, dot.z, dot.y2));
        track.vertices[2].position.addSelf(new THREE.Vector3(dot.x1, dot.z, dot.y1));
        track.vertices[3].position.addSelf(new THREE.Vector3(dot.x2, dot.z, dot.y2));

        // the other end
        dot = dots[dots.length-1];
        track.vertices[4].position.addSelf(new THREE.Vector3(dot.x1, dot.z, dot.y1));
        track.vertices[5].position.addSelf(new THREE.Vector3(dot.x2, dot.z, dot.y2));
        track.vertices[6].position.addSelf(new THREE.Vector3(dot.x1, dot.z, dot.y1));
        track.vertices[7].position.addSelf(new THREE.Vector3(dot.x2, dot.z, dot.y2));

        // middle
        var dl = dots.length - 2;
        for (i = 0; i < dl; i++)
        {
            dot = dots[1 + i];
            track.vertices[i + 8].position.addSelf(new THREE.Vector3(dot.x1, dot.z, dot.y1));
            track.vertices[i + 8 + dl].position.addSelf(new THREE.Vector3(dot.x1, dot.z, dot.y1));
            track.vertices[i + 8 + 2*dl].position.addSelf(new THREE.Vector3(dot.x2, dot.z, dot.y2));
            track.vertices[i + 8 + 3*dl].position.addSelf(new THREE.Vector3(dot.x2, dot.z, dot.y2));
        }
        */

        return track;
    }
}