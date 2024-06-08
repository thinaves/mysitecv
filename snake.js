document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const backButton = document.getElementById('backButton');

    const gridSize = 20;
    const canvasSize = 400;
    let snake = [{ x: gridSize * 5, y: gridSize * 5 }];
    let direction = { x: 0, y: 0 };
    let food = { x: gridSize * 10, y: gridSize * 10 };
    let score = 0;

    function gameLoop() {
        update();
        draw();
    }

    function update() {
        const head = { x: snake[0].x + direction.x * gridSize, y: snake[0].y + direction.y * gridSize };

        if (head.x === food.x && head.y === food.y) {
            snake.push({});
            score++;
            placeFood();
        }

        snake.unshift(head);
        snake.pop();

        if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize || checkCollision(head)) {
            resetGame();
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvasSize, canvasSize);

        ctx.fillStyle = 'red';
        ctx.fillRect(food.x, food.y, gridSize, gridSize);

        ctx.fillStyle = 'green';
        snake.forEach(segment => ctx.fillRect(segment.x, segment.y, gridSize, gridSize));

        ctx.fillStyle = 'black';
        ctx.fillText(`Score: ${score}`, 10, 390);
    }

    function placeFood() {
        food.x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
        food.y = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    }

    function checkCollision(head) {
        return snake.some(segment => segment.x === head.x && segment.y === head.y);
    }

    function resetGame() {
        snake = [{ x: gridSize * 5, y: gridSize * 5 }];
        direction = { x: 0, y: 0 };
        score = 0;
        placeFood();
    }

    document.addEventListener('keydown', event => {
        const key = event.key;
        if (key === 'ArrowUp' && direction.y === 0) {
            direction = { x: 0, y: -1 };
        } else if (key === 'ArrowDown' && direction.y === 0) {
            direction = { x: 0, y: 1 };
        } else if (key === 'ArrowLeft' && direction.x === 0) {
            direction = { x: -1, y: 0 };
        } else if (key === 'ArrowRight' && direction.x === 0) {
            direction = { x: 1, y: 0 };
        }
    });

    backButton.addEventListener('click', () => {
        alert('Até logo');
        window.location.href = 'portfolio.html';
    });

    setInterval(gameLoop, 100);
    placeFood();
});
