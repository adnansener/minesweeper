document.getElementById("play").onclick = function() 
{
    document.getElementById('title-text').innerHTML = "MINESWEEPER";
    document.getElementById('helper').style = 'visibility: visible';
    document.getElementById('inner-container').style = 'visibility: hidden';
};

document.addEventListener('contextmenu', event => event.preventDefault());

const bombs = [];
var game_start = false;
var hint_visible = false;
var first_hint = false;
var flags = [];
var map = [];
var flag_counter = 0;

start.onclick = function(e)
{
    firstTime();
}

function reset()
{
    location.reload();
}

function gameFinished(location)
{
    var counter = 0;

    for(var i = 0; i < (tableSize * tableSize); i++)
        if(map[i] == 10)
            counter++;

    if(counter == (tableSize - 1))
    {
        for(var i = 0; i < (tableSize * tableSize); i++)
            if(document.getElementById(i).innerHTML == "")
                document.getElementById(i).innerHTML = map[i];

        document.getElementById('title-text').innerHTML = 'YOU WIN';
        setTimeout(reset,3000);
    }
}

function placeMapHelperHelper(left, index, right)
{
    if(map[index] != 9)
        map[index]++;

    if((left == true) && (map[index - 1] != 9))
        map[index - 1]++;

    if((right == true) && (map[index + 1] != 9))
        map[index + 1]++;
}

function placeMapHelper(index) 
{
    var left = true;
    var right = true;
    var top = true;
    var bottom = true;

    row = parseInt((index / tableSize), 10);
    col = parseInt((index % tableSize), 10);

    if(col == 0)
        left = false;

    if(col == (tableSize - 1))
        right = false;

    if(row == 0)
        top = false;

    if(row == (tableSize - 1))
        bottom = false;

    placeMapHelperHelper(left, index, right);

    if(top == true)
        placeMapHelperHelper(left, (index - tableSize), right);

    if(bottom == true)
        placeMapHelperHelper(left, (index + tableSize), right);
}

function placeMap () 
{
    for(var i = 0; i < (tableSize * tableSize); i++)
    {
        map[i] = 0;

        for(var j = 0; j < (tableSize - 1); j++)
            if(i == bombs[j])
                map[i] = 9;
    }

    for(var i = 0; i < (tableSize * tableSize); i++)
        if(map[i] == 9)
            placeMapHelper(i);
}

function getRandomNumber(min, max, center)
{
    var left = true;
    var right = true;
    var top = true;
    var bottom = true;
    var number = 0;
    var confirm = true;

    row = parseInt((center / tableSize), 10);
    col = parseInt((center % tableSize), 10);

    if(col == 0)
        left = false;

    if(col == (tableSize - 1))
        right = false;

    if(row == 0)
        top = false;

    if(row == (tableSize - 1))
        bottom = false;

    var notThis = [];
    for(var i = 0; i < 9; i++)
        notThis[i] = -1;

    if(top == true)
    {
        if(left == true)
            notThis[0] = (center - tableSize) - 1;

        notThis[1] = center - tableSize;

        if(right == true)
            notThis[2] = (center - tableSize) + 1;
    }

    if(left == true)
        notThis[3] = center - 1;

    notThis[4] = center

    if(right == true)
        notThis[5] = parseInt(center, 10) + 1;

    if(bottom == true)
    {
        if(left == true)
            notThis[6] = (parseInt(center, 10) + tableSize) - 1;

        notThis[7] = parseInt(center, 10) + tableSize;

        if(right == true)
            notThis[8] = (parseInt(center, 10) + tableSize) + 1;
    }

    for(var i = 0; i < 9; i++)
        console.log(notThis[i]);

    do
    {
        confirm = true;

        number = Math.floor(Math.random() * (max - min + 1) + min);

        for(var i = 0; i < 9; i++)
            if(notThis[i] == number)
                confirm = false;

                
        for(var i = 0; i < (tableSize - 1); i++)
            if(bombs[i] == number)
                confirm = false;

    } while (confirm == false);

    return number;
}
function left_click_first(location)
{
    for(var i = 0; i < (tableSize * tableSize); i++)
        map[i] = 0;

    for(var i = 0; i < (tableSize - 1); i++)
        bombs[i] = getRandomNumber(0, (Math.pow(tableSize, 2) - 1), location);

    for(var i = 0; i < (tableSize * tableSize); i++)
        flags[i] = false;

    document.getElementById('hint').style = "visibility: visible";

    placeMap();
    anyTime();

    left_click(location);
}

function create_env(location)
{
    var left = true;
    var right = true;
    var top = true;
    var bottom = true;

    row = parseInt((location / tableSize), 10);
    col = parseInt((location % tableSize), 10);

    document.getElementById(location).innerHTML = "0";

    if(col == 0)
        left = false;

    if(col == (tableSize - 1))
        right = false;

    if(row == 0)
        top = false;

    if(row == (tableSize - 1))
        bottom = false;

    if(top == true)
    {
        if(left == true)
        {
            if(document.getElementById((location - tableSize) - 1).innerHTML == "")
                if(map[(location - tableSize) - 1] == 0)
                    create_env((location - tableSize) - 1);
                else
                    document.getElementById((location - tableSize) - 1).innerHTML = map[(location - tableSize) - 1];

        }

        if(document.getElementById(location - tableSize).innerHTML == "")
            if(map[location - tableSize] == 0)
                create_env(location - tableSize);
            else
                document.getElementById(location - tableSize).innerHTML = map[location - tableSize];

        if(right == true)
        {
            if(document.getElementById((location - tableSize) + 1).innerHTML == "")
                if(map[(location - tableSize) + 1] == 0)
                    create_env((location - tableSize) + 1);
                else
                    document.getElementById((location - tableSize) + 1).innerHTML = map[(location - tableSize) + 1];
        }
    }

    if(left == true)
    {
        if(document.getElementById(location - 1).innerHTML == "")
            if(map[location - 1] == 0)
                create_env(location - 1);
            else
                document.getElementById(location - 1).innerHTML = map[location - 1];
    }

    if(right == true)
    {
        if(document.getElementById(parseInt(location, 10) + 1).innerHTML == "")
            if(map[parseInt(location, 10) + 1] == 0)
                create_env(parseInt(location, 10) + 1);
            else
                document.getElementById(parseInt(location, 10) + 1).innerHTML = map[parseInt(location, 10) + 1];
    }

    if(bottom == true)
    {
        if(left == true)
        {
            if(document.getElementById((parseInt(location, 10) + tableSize) - 1).innerHTML == "")
                if(map[(parseInt(location, 10) + tableSize) - 1] == 0)
                    create_env((parseInt(location, 10) + tableSize) - 1);
                else
                    document.getElementById((parseInt(location, 10) + tableSize) - 1).innerHTML = map[(parseInt(location, 10) + tableSize) - 1];
        }
        
        if(document.getElementById(parseInt(location, 10) + tableSize).innerHTML == "")
            if(map[parseInt(location, 10) + tableSize] == 0)
                create_env(parseInt(location, 10) + tableSize);
            else
                document.getElementById(parseInt(location, 10) + tableSize).innerHTML = map[parseInt(location, 10) + tableSize];

        if(right == true)
        {
            if(document.getElementById((parseInt(location, 10) + tableSize) + 1).innerHTML == "")
                if(map[(parseInt(location, 10) + tableSize) + 1] == 0)
                    create_env((parseInt(location, 10) + tableSize) + 1);
                else
                    document.getElementById((parseInt(location, 10) + tableSize) + 1).innerHTML = map[(parseInt(location, 10) + tableSize) + 1];
        }
    }
}

function left_click(location)
{
    if(flags[location] == true)
        return;

    if(map[location] == 0)
    {
        create_env(location);
    }
    else if((map[location] == 9) || map[location] == 10)
    {
        for(var i = 0; i < (tableSize - 1); i++)
        {
            var property = document.getElementById(bombs[i]);
            property.style.backgroundImage = "url('images/bomb.png')"
        }

        document.getElementById('title-text').innerHTML = 'YOU LOSE';
        setTimeout(reset,3000);
    }
    else
    {
        document.getElementById(location).innerHTML = map[location];
    }
}

function right_click(location)
{
    if(document.getElementById(location).innerHTML != "")
        return;
    
    var property = document.getElementById(location);

    if((flags[location] == false) || (flags[location] == ""))
    {
        if(flag_counter == (tableSize - 1))
            return;

        property.style.backgroundImage = "url('images/flag.png')"
        flags[location] = true;
        flag_counter++;

        if(map[location] == 9)
            map[location] = 10;

        var temp = (tableSize -  flag_counter - 1);
        if(temp == 0)
            document.getElementById('flag-remaining').innerHTML = 'No Flags Remaining';
        else
            document.getElementById('flag-remaining').innerHTML = temp + ' Flags Remaining';

        gameFinished(location);
    }
    else
    {
        document.getElementById(location).style += 'background-color: black';
        flags[location] = false;
        flag_counter--;

        if(map[location] == 10)
            map[location] = 9;

        var temp = (tableSize -  flag_counter - 1);
        if(temp == 0)
            document.getElementById('flag-remaining').innerHTML = 'No Flags Remaining';
        else
            document.getElementById('flag-remaining').innerHTML = temp + ' Flags Remaining';
    }
}

function firstTime() 
{
    tableSize = document.querySelector('#size').selectedIndex + 3;
    flag_counter = 0;
                
    if(tableSize == 3)
        return;

    document.getElementById('middle-of-helper').style = 'visibility: hidden';
    document.getElementById('flag-remaining').style = 'visibility: visible';
    document.getElementById('flag-remaining').innerHTML = (tableSize -  flag_counter - 1) + ' Flags Remaining';

    document.getElementById('hint-list').style = 'visibility: hidden; float: right';

    game_start = true;
    first_hint = false;
    hint_visible = false;
    flag_counter = 0;

    var output = '<table>';
    for(var i = 0; i < tableSize; i++)
    {
        output = output + '<tr>';

        for(var j = 0; j < tableSize; j++)
            output = output + '<td><button onclick="left_click_first(this.id)" id = ' + (i * tableSize + j) + ' ></button></td>';

        output = output + '</tr>';
    }
                        
    output = output + '</table>';

    document.getElementById('container').innerHTML = output;
    document.getElementById('container').style = 'border: 10px solid black';
    document.getElementById('hint').style = "visibility: hidden";
}
function anyTime() 
{
    var output = '<table>';
    for(var i = 0; i < tableSize; i++)
    {
        output = output + '<tr>';

        for(var j = 0; j < tableSize; j++)
            output = output + '<td><button oncontextmenu="right_click(this.id)" onclick="left_click(this.id)" id = ' + (i * tableSize + j) + ' ></button></td>';

        output = output + '</tr>';
    }
                        
    output = output + '</table>';

    document.getElementById('container').innerHTML = output;
}

hint.onclick = function(e) 
{
    var row, col;
    if(game_start == true)
    {
        if(hint_visible == true) 
        {
            document.getElementById('hint-list').style = 'visibility: hidden; float: right';
            hint_visible = false;
        }
        else 
        {
            document.getElementById('hint-list').style = 'visibility: visible; float: right';
            hint_visible = true;
        }
                    
        if(first_hint == false) 
        {
            row = (bombs[0] / tableSize) + 1;
            col = (bombs[0] % tableSize) + 1;
            document.getElementById('hint-list').innerHTML = parseInt(row, 10) + ", " + parseInt(col, 10) + "<br>";

            for(var i = 1; i < (tableSize - 1); i++)
            {
                row = (bombs[i] / tableSize) + 1;
                col = (bombs[i] % tableSize) + 1;
                document.getElementById('hint-list').innerHTML += parseInt(row, 10) + ", " + parseInt(col, 10) + "<br>";
            }

            first_hint = true;
        }                    
    }
}