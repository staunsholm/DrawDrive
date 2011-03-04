var Console =
{
    log: function(arg)
    {
        document.getElementById('console').innerHTML += arg +"<br />";
    },
    button1: function(label, func)
    {
        var button1 = document.getElementById('button1');
        button1.value = label;
        button1.onclick = func;
    }
};