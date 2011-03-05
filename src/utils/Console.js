var Console =
{
    log: function(arg)
    {
        document.getElementById('console').innerHTML += arg +"<br />";
    },
    button: function(no, label, func)
    {
        var buttonId = document.getElementById('button'+ no);
        buttonId.innerHTML = label;
        buttonId.onclick = func;
    }
};