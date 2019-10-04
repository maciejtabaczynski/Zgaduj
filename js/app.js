//Wartości zmieniające się
let min = 1;
let max = 10;
let winNum = getRandomNum(min, max);
let guessLeft = 3;

// Wyszukiwanie i przypisywanie elementów
const minNum = document.querySelector(".min");
const maxNum = document.querySelector(".max");
const guessButton = document.querySelector("#button");
const guessInput = document.querySelector("#input");
const message = document.querySelector("#message");
const game = document.querySelector(".game");

// Przypisanie min i max
minNum.textContent = min;
maxNum.textContent = max;

// Zagraj jeszcze raz, przeładowanie
game.addEventListener("mousedown", function(e){
  if(e.target.className === "playAgain"){
    window.location.reload();
  }
});
      
// Nasłuchiwanie klika
guessButton.addEventListener("click", function(){
  let guess = parseInt(input.value);
  
  // Sprawdzanie warunku
  if(isNaN(guess)||guess < min || guess > max){
    showMessage(`Wpisz liczbę z przedziału ${min} - ${max}`, "#9a2700");
  }

  // Jeśli wygrana
  if(guess === winNum){
    // Koniec gry, wygrana
    gameOver(true, `Gratulacje! ${winNum} jest poprawną odpowiedzią, brawo!`);

  } else {
    // Podanie złej liczby
    guessLeft = guessLeft - 1;

    if(guessLeft === 0){
      // Koniec gry, przegrana
      gameOver(false, `Koniec gry. Niestety nie udało ci się tym razem. Poprawną odpowiedzią było ${winNum}.`);
    } else {
      // Zła odp, gra dalej
      // Zmiana koloru bordera
      guessInput.style.borderColor = '#9a2700';

      // Czyszczenie zawartości inputa
      guessInput.value = '';

      // Wyświetlenie że zła odp
      showMessage(`${guess} to zła odpowiedź, pozostała ilość prób to: ${guessLeft}.`, "#9a2700");
    }
  }
});

// Koniec gry
function gameOver(won, msg){
  let color;
  won === true ? color = '#4d009a' : color = '#9a2700';

  // Zablokowanie wpisywania
  guessInput.disabled = true;
  // Zmiana koloru bordera
  guessInput.style.borderColor = color;
  // Zmiana koloru
  message.style.color = color;
  // Pokazanie wiadomości
  showMessage(msg);

  // Zagrasz jeszcze raz?
  guessButton.value = "Zagraj ponownie";
  guessButton.className = guessButton.classList + "playAgain";
}

// Losowanie liczby
function getRandomNum(min, max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

// Ustawienie wiadomości i koloru
function showMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
  message.style.fontSize = "20px"
}