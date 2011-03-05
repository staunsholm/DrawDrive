DrawDrive.Painter = function(canvas)
{
    var self = this;

    canvas.width = 960;
    canvas.height = 540;
    
    var context = canvas.getContext('2d');
    var startPoint = {};
    var isDrawing = false;
    var linesDrawn = 0;
    var prevX, prevY, prevX1, prevY1, prevX2, prevY2;

    self.lines = [];

    var gridSize = 25;

    // Attach the mousedown, mousemove and mouseup event listeners.
    canvas.addEventListener('mousedown', mouseEvent, false);
    canvas.addEventListener('mousemove', mouseEvent, false);
    canvas.addEventListener('mouseup', mouseEvent, false);

    function mouseEvent(event)
    {
        event._x = event.layerX;
        event._y = event.layerY;

        // Call the event handler of the tool.
        switch(event.type)
        {
            case "mousedown":
                startPoint.x = gridIt(event._x);
                startPoint.y = gridIt(event._y);
                    
                prevX = startPoint.x;
                prevY = startPoint.y;
                prevX1 = startPoint.x - 5;
                prevY1 = startPoint.y;
                prevX2 = startPoint.x + 5;
                prevY2 = startPoint.y;

                isDrawing = true;
                break;
            case "mousemove":
                if (isDrawing) 
                {
                    drawTo(event._x, event._y);
                }
                break;
            case "mouseup":
                if (isDrawing)
                {
                    drawTo(gridIt(event._x), gridIt(event._y), true);
                    isDrawing = false;
                }
                break;
        }
    }

    function gridIt(c)
    {
        return Math.round(c / gridSize)*gridSize;
    }

    function drawTo(x, y, force)
    {
        var dx = startPoint.x - x;
        var dy = startPoint.y - y;
        if (force || dx*dx+dy*dy > gridSize*gridSize)
        {
            startPoint.x = x;
            startPoint.y = y;
            
            var z = findZ(x, y);

            if (!prevX) prevX = x;
            if (!prevY) prevY = y;

            var v = new THREE.Vector2(prevX-x, prevY-y);
            v.unit();

            // rotate 90¡
            v.set(v.y, -v.x);
            v.multiplyScalar(10);

            var x1 = prevX1;
            var y1 = prevY1;
            var x2 = prevX2;
            var y2 = prevY2;

            var x3 = x + v.x | 1;
            var y3 = y + v.y | 1;
            var x4 = x - v.x | 1;
            var y4 = y - v.y | 1;

            if (!x1) x1 = x3;
            if (!y1) y1 = y3;
            if (!x2) x2 = x4;
            if (!y2) y2 = y4;

            var color = "rgb("+ Math.round(z*10) +","+ Math.round(z*10) +","+ Math.round(z*10) +")";

            context.beginPath();
            context.fillStyle = color;
            context.moveTo(x1, y1);
            context.lineTo(x3, y3);
            context.lineTo(x4, y4);
            context.lineTo(x2, y2);
            context.fill();

            prevX = x;
            prevY = y;
            prevX1 = x3;
            prevY1 = y3;
            prevX2 = x4;
            prevY2 = y4;

            self.lines.push({x: x, y: y, x1:x1, y1:y1, x2:x2, y2:y2, z: z});

            linesDrawn++;
        }
    }

    function findZ(x, y)
    {
        var line, linePrev, lineNext;
        var ztmp;
        var z = 1;
        var r;

        for (var i = 1; i < linesDrawn-1; i++)
        {
            line = self.lines[i];
            linePrev = self.lines[i-1];
            lineNext = self.lines[i+1];
            //r = (line.x-x)*(line.x-x) + (line.y-y)*(line.y-y);
            r = Math.linePointDist(new THREE.Vector2(line.x, line.y), new THREE.Vector2(linePrev.x-line.x, linePrev.y-line.y), new THREE.Vector2(x,y));
            if (r < 50)
            {
                console.log(r);

                ztmp = line.z;
                if (linePrev.z >= ztmp) ztmp = linePrev.z;
                if (lineNext.z >= ztmp) ztmp = lineNext.z;
                ztmp += Math.round(50-r);
                
                if (ztmp > z) z = ztmp;
            }
        }

        z = z/5 + 15;

        return z;
    }
};
