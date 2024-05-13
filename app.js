var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var grid = 16;
var random = getRand(6, 25);
var sream = true;
var count = 0;

var snake = {
    x: 160,
    y: 160, 
    dx: grid, 
    dy: 0,
    cells: [], 
    maxCells: 4
};

var apple = {
    x: 320, 
    y: 320
};

function getRand(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

function loop() {
    requestAnimationFrame(loop);
    if (++count < 4){return;}

    count = 0;

    context.clearRect(0, 0, canvas.width, canvas.height);

    snake.x += snake.dx;
    snake.y += snake.dy;

    if (snake.x < 0) {snake.x = canvas.width - grid;}
    else if (snake.x >= canvas.width){snake.x = 0;}

    if (snake.y < 0){snake.y = canvas.height - grid;}
    else if (snake.y >= canvas.height){snake.y = 0;}

    snake.cells.unshift({ x: snake.x, y: snake.y});

    window.score =  {
        score: '${count}'
    };

    if (snake.cells.length > snake.maxCells){snake.cells.pop();}

    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
    context.fillStyle = 'green';

    snake.cells.forEach(function(cell, index){
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells++;
            apple.x = getRandomInt(0, 25) * grid;
            apple.y = getRandomInt(0, 25) * grid;
        }

        for(var i = index + 1; i < snake.cells.length; i++){
            if(cell.x === snake.cells[i].x && cell.y === snake.cells[i].y){
                snake.x = 160;
                snake.y = 160;
                snake.cells = [];
                snake.maxCells = 4;
                snake.dx = grid;
                snake.dy = 0;

                apple.x = getRand(0, 25) * grid;
                apple.y = getRand(0, 25) * grid;


            }
        }
        
    });

    document.addEventListener('keydown', function (e){
        if (e.which === 37 && snake.dx === 0) {
            snake.dx = -grid;
            snake.dy = 0;
          }
          else if (e.which === 38 && snake.dy === 0) {
            snake.dy = -grid;
            snake.dx = 0;
          }
          else if (e.which === 39 && snake.dx === 0) {
            snake.dx = grid;
            snake.dy = 0;
          }
          else if (e.which === 40 && snake.dy === 0) {
            snake.dy = grid;
            snake.dx = 0;
          }
    })

    document.getElementById('score').innerHTML ="Score: " + (snake.cells.length*10 - 40);
    


    
   if (sream == true){
    if(snake.cells.length > random){
        document.getElementById('vid2').classList.remove('vid2');
        document.getElementById('vid2').classList.add('vid3');
        document.getElementById('vid2').play();

        function back(){
            document.getElementById('vid2').classList.remove('vid3');
            document.getElementById('vid2').classList.add('vid2');    
        }

        setTimeout(back, 800);

        sream = false;
    }
   }
    
}

requestAnimationFrame(loop);


