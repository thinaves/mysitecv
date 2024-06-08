/*document.getElementById('photo-upload').addEventListener('change', function () {
    const reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById('profile-photo').src = e.target.result;
    }
    reader.readAsDataURL(this.files[0]);
});*/

//Jogodavelha//

document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('[data-cell]');
    const board = document.getElementById('game-board');
    const restartButton = document.getElementById('restartButton');
    const playerXScore = document.getElementById('playerX');
    const playerOScore = document.getElementById('playerO');
    let currentPlayer = 'X';
    let xWins = 0;
    let oWins = 0;
    let isGameActive = true;
    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleClick(e) {
        const cell = e.target;
        if (cell.innerText !== '' || !isGameActive) return;
        cell.innerText = currentPlayer;
        if (checkWin(currentPlayer)) {
            isGameActive = false;
            if (currentPlayer === 'X') {
                xWins++;
                playerXScore.innerText = `Jogador X: ${xWins}`;
            } else {
                oWins++;
                playerOScore.innerText = `Jogador O: ${oWins}`;
            }
        } else if (isDraw()) {
            isGameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function checkWin(player) {
        return WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => {
                return cells[index].innerText === player;
            });
        });
    }

    function isDraw() {
        return [...cells].every(cell => {
            return cell.innerText === 'X' || cell.innerText === 'O';
        });
    }

    function restartGame() {
        currentPlayer = 'X';
        isGameActive = true;
        cells.forEach(cell => {
            cell.innerText = '';
        });
    }

    cells.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });

    restartButton.addEventListener('click', restartGame);
});

/*Contador

document.addEventListener('DOMContentLoaded', () => {
    const visitCountElement = document.getElementById('visitCount');
    const backButton = document.getElementById('backButton');

    // Contador de visitas
    let visitCount = localStorage.getItem('visitCount');
    if (!visitCount) {
        visitCount = 0;
    }
    visitCount++;
    localStorage.setItem('visitCount', visitCount);
    visitCountElement.innerText = visitCount;

    // Botão de voltar
    backButton.addEventListener('click', () => {
        alert('Até logo');
        window.location.href = 'portfolio.html';
    });
});*/