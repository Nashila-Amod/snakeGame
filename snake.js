let world = [];
var ROWS = 40, COLS = 80;
var EMPTY = "EMPTY", SNAKE = "SNAKE", FRUIT = "FRUIT";

let snake = [];
const LEFT = 0, UP = 1, RIGHT = 2, DOWN = 3, NONE = -1;
let direction = NONE;

var canvas,	canvas_context;

/* CREATION OF THE WORLD */

function createWorld(rowCount, columnCount)
{
    for(var x = 0; x < rowCount ; x++)
    {
        var row = [];

        for(var y = 0; y < columnCount ; y++)
        {
            row.push(EMPTY);
        }

        world.push(row); // Add new row to the world
    }
}

function setCellWorld(value, row, column)
{
    world[row][column] = value;
}

function getCellWorld(row, column)
{
    return world[row][column];
}

/* Render the world grid to the canvas */
function draw()
{
    var widthCell = canvas.width/COLS;
    var heightCell = canvas.height/ROWS;
    var head = true;
    
    // Iterate through the world grid and draw all cells
    for(var x = 0; x < ROWS ; x++)
    {
        for(var y = 0 ; y < COLS ; y++)
        {
            // sets the fillstyle depending on the content of the cell
            switch (getCellWorld(x,y)) {
                
				case EMPTY:
					canvas_context.fillStyle = "#0ff";
                    break;
                    
				case SNAKE:

                    if(head)
                    {
                        canvas_context.fillStyle = "#ff0000";
                        head = false;
                    }
                    else
                    {
                        canvas_context.fillStyle = "#fff";
                    }

					break;
			}

            canvas_context.fillRect(y*widthCell, x*heightCell, widthCell, heightCell);
        }
    }
}


/* CREATION OF THE SNAKE */


function createSnake(x_row,y_col, snakeLength)
{
    insertHead(x_row, y_col);

    for(var x = 1; x < snakeLength ; x++)
    {
        x_row++;
        grow(x_row, y_col);
    }
}

function insertHead(x_row, y_col)
{
    setCellWorld(SNAKE, x_row, y_col);
    snake.push([x_row, y_col]); // Add the new position of the head at the end of the snake array
}

function grow(x_row, y_col)
{
    setCellWorld(SNAKE, x_row, y_col);
    return snake.unshift(x_row, y_col);
}

function removeTail(x_row,y_col)
{
    setCellWorld(EMPTY, x_row, y_col);
    return snake.shift();
}



/* FUNCTION MAIN : STARTS THE GAME */

function main()
{
    // Create and initiate the canvas element
    canvas = document.createElement("canvas");
    canvas.width = COLS*16; // Multiply by 20 to display the canvas bigger
    canvas.height = ROWS*16;
    canvas_context = canvas.getContext("2d");

    // Add the canvas element to the body of the document
    document.body.appendChild(canvas);

    // Initiate the game
    createWorld(ROWS, COLS);

    var snakeX = Math.floor(ROWS/2);
    var snakeY = Math.floor(COLS/ 2);
    createSnake(snakeX - 1, snakeY - 1, 1);
    draw();
}

function changing_direction()
{
    const keyPressed = event.keyCode;

    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    if (keyPressed === LEFT_KEY && direction !== RIGHT) {
        
        direction = LEFT;
    }

    if (keyPressed === UP_KEY && direction !== DOWN) {
        
        direction = UP;
    }

    if (keyPressed === RIGHT_KEY && direction !== LEFT) {
        
        direction = RIGHT;
    }

    if (keyPressed === DOWN_KEY && direction !== UP) {
       
        direction = DOWN;   
    }
}

function step()
{
    move_snake();
    draw();
}

function move_snake()
{
    // Get the position of the head :
    var head = snake[snake.length - 1]
    var headX = head[0];
    var headY = head[1];

    switch (direction) {

        case LEFT:
            headY--; //decrease column
            break;

        case UP:
            headX--; //decrease row
            break;

        case RIGHT:
           headY++;
            break;

        case DOWN:
            headX++;
            break;
    }

    // Get the position of the tail
    var tail = snake[0];
    var tailX = tail[0];
    var tailY = tail[1];

    // Remove the last position of the tail
    removeTail(tailX, tailY);
    
    // Add new head 
    insertHead(headX, headY);
}

main();
document.addEventListener("keydown", changing_direction);
var myVar = setInterval(step, 50);