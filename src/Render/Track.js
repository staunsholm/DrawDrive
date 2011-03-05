DrawDrive.Track = function()
{
    this.create = function(dots)
    {
        if (dots.length < 2)
        {
            return null;
        }

        var i, l, dot;
       
        var track = new Plane(500, 50, dots.length-1, 1);

        var vertices = track.vertices;
        var verticesHalf = vertices.length >> 1;

        for (i = 0; i < verticesHalf; i++)
        {
//            console.log(vertices[i].position, vertices[i+verticesHalf].position);
        }

        for (i = 0, l = dots.length; i < l; i++)
        {
            dot = dots[i];
            vertices[i+verticesHalf].position.set(dot.x2, dot.y2, dot.z*10);
            vertices[i].position.set(dot.x1, dot.y1, dot.z*10);
        }

        track.computeCentroids();
        track.computeFaceNormals();

        return track;
    }
}