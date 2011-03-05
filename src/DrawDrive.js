var DrawDrive = function()
{
    var canvas = document.getElementById('canvas');
    var painter = new DrawDrive.Painter(canvas);

    Console.button1("3D", function()
    {
        var test3d = new DrawDrive.Test3D(canvas, painter.lines);
    });
};
