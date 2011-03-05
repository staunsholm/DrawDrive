var DrawDrive = function()
{
    var canvas = document.getElementById('canvas');
    var painter = new DrawDrive.Painter(canvas);
    var test3d;

    Console.button(1, "3D", function()
    {
        test3d = new DrawDrive.Test3D(canvas, painter.lines);
    });
    Console.button(2, "Follow", function()
    {
        if (test3d)
        {
            test3d.flyThroughTrack();
        }
    });
};
