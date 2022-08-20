let state = { board: [], currentGame: [], savedGames: [] };

let start = () => {
  createBoard();
  newGame();
  // console.log(state.board);
};

//funcao para montar o html
//a lista dos números
let createBoard = () => {
  state.board = [];
  for (let i = 1; i <= 60; i++) {
    state.board.push(i);
  }
};

//funcao para criar novo jogo
let newGame = () => {
  resetGame();
  render();

  console.log(state.currentGame);
};

//funcao para alimentar a lista
//com os numeros que podem ser selecionados
let render = () => {
  renderBoard();
  renderButtons();
  renderSavedGames();
};

//criando de forma dinamico
//interface com os numeros
//colocando no html
let renderBoard = () => {
  let divBoard = document.querySelector("#megasena-board");
  divBoard.innerHTML = "";

  let ulNumbers = document.createElement("ul");
  ulNumbers.classList.add("numbers");
  for (let i = 0; i < state.board.length; i++) {
    let currentNumber = state.board[i];
    let liNumber = document.createElement("li");
    liNumber.classList.add("number");
    liNumber.textContent = currentNumber;

    liNumber.addEventListener("click", handleNumberClick);

    if (isNumberInGame(currentNumber)) {
      liNumber.classList.add("selected-number");
    }

    ulNumbers.appendChild(liNumber);
  }

  divBoard.appendChild(ulNumbers);
};

//funcao para pegar o click
//numero selecionado
let handleNumberClick = (event) => {
  let value = event.currentTarget.textContent;

  if (isNumberInGame(value)) {
    removeNumberFromGames(value);
  } else {
    addNumberToGame(Number(value));
  }
  render();
  console.log(state.currentGame);
};

//funcao para criar os buttons
//novoJogo_limparJogo_salvarJogo
let renderButtons = () => {
  let divButtons = document.querySelector("#megasena-buttons");
  divButtons.innerHTML = "";
  let buttonNewGame = createNewGameButton();
  let buttonRandomGame = createRandomGameButton();
  let buttonSaveGame = createSaveGameButton();

  divButtons.appendChild(buttonNewGame);
  divButtons.appendChild(buttonRandomGame);
  divButtons.appendChild(buttonSaveGame);
};

//funcao para criar o button de
//Novo Jogo
let createNewGameButton = () => {
  let button = document.createElement("button");
  button.textContent = "Novo Jogo";

  button.addEventListener("click", newGame);
  return button;
};

//funcao para criar o button de
//Jogos Aleatoriso
let createRandomGameButton = () => {
  let button = document.createElement("button");
  button.textContent = "Jogo Aleatório";

  button.addEventListener("click", randomGame);
  return button;
};

//funcao para criar o button de
//Salvar Jogos
let createSaveGameButton = () => {
  let button = document.createElement("button");
  button.textContent = "Salvar Jogo";
  button.disabled = !isGameComplete();

  button.addEventListener("click", saveGame);
  return button;
};
//
let renderSavedGames = () => {
  let divSavedGames = document.querySelector("#megasena-saved-games");
  divSavedGames.innerHTML = "";

  if (state.savedGames.length === 0) {
    divSavedGames.innerHTML = "<p>Nenhum Jogo Salvo</p>";
  } else {
    let ulSavedGames = document.createElement("ul");
    for (let i = 0; i < state.savedGames.length; i++) {
      let currentGame = state.savedGames[i];

      let liGame = document.createElement("li");
      liGame.textContent = currentGame;

      ulSavedGames.appendChild(liGame);
    }

    divSavedGames.appendChild(ulSavedGames);
  }
};

//funcao para adicionar números
//na lista de jogo atual
//validando o total permitido
//por tipo de jogo
let addNumberToGame = (numberToAdd) => {
  if (numberToAdd < 1 || numberToAdd > 60) {
    console.error("Número Inválido");
    return;
  }

  if (state.currentGame.length >= 6) {
    console.error("O jogo está completo");
    return;
  }

  if (isNumberInGame(numberToAdd)) {
    console.error("Este número já está no jogo");
    return;
  }

  state.currentGame.push(numberToAdd);
};

//funcao para remover o número escolhido
let removeNumberFromGames = (numberToRemove) => {
  let newGame = [];

  if (numberToRemove < 1 || numberToRemove > 60) {
    console.error("Número Inválido");
    return;
  }

  for (let i = 0; i < state.currentGame.length; i++) {
    let currentNumber = state.currentGame[i];
    if (currentNumber === numberToRemove) {
      continue;
    }
    newGame.push(currentNumber);
  }
  state.currentGame = newGame;
};

//funcao para verificar
//se o número é repetido
let isNumberInGame = (numberToCheck) => {
  return state.currentGame.includes(numberToCheck);
};

//funcao para salvar o jogo
let saveGame = () => {
  if (!isGameComplete) {
    console.error("O jogo não esta completo");
    return;
  }

  state.savedGames.push(state.currentGame);
  newGame();
  console.log(state.savedGames);
};

//funcao para verificar se
//o jogo está completo
let isGameComplete = () => {
  return state.currentGame.length === 6;
};

//funcao para
//zerar o jogo
let resetGame = () => {
  state.currentGame = [];
};

//funcao para criar
//jogo aleatorio
let randomGame = () => {
  resetGame();
  while (!isGameComplete()) {
    let randomNumber = Math.ceil(Math.random() * 60);
    addNumberToGame(randomNumber);
  }

  render();
  console.log(state.currentGame);
};

//chamando a funcao start
start();
