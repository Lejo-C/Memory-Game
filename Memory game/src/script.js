document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("game-board");
    const restartBtn = document.getElementById("restart-btn");
  
    const cards = [
      "🐶", "🐶", "🐱", "🐱", "🐭", "🐭", "🦊", "🦊",
      "🐼", "🐼", "🐸", "🐸", "🐵", "🐵", "🐻", "🐻"
    ];
  
    let flippedCards = [];
    let matchedCards = [];
  
    function shuffle(array) {
      return array.sort(() => 0.5 - Math.random());
    }
  
    function createCards() {
      gameBoard.innerHTML = "";
      const shuffledCards = shuffle(cards);
  
      shuffledCards.forEach((emoji) => {
        const card = document.createElement("div");
        card.className =
          "card bg-blue-500 text-white h-16 flex items-center justify-center rounded-lg cursor-pointer";
        card.dataset.emoji = emoji;
        card.innerHTML = "<span class='hidden'>" + emoji + "</span>";
        gameBoard.appendChild(card);
  
        card.addEventListener("click", () => flipCard(card));
      });
    }
  
    function flipCard(card) {
      if (flippedCards.length < 2 && !card.classList.contains("matched")) {
        card.querySelector("span").classList.remove("hidden");
        card.classList.add("bg-white", "text-blue-500");
        flippedCards.push(card);
  
        if (flippedCards.length === 2) {
          checkMatch();
        }
      }
    }
  
    function checkMatch() {
      const [card1, card2] = flippedCards;
  
      if (card1.dataset.emoji === card2.dataset.emoji) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedCards.push(card1, card2);
        flippedCards = [];
        if (matchedCards.length === cards.length) {
          alert("You win!");
        }
      } else {
        setTimeout(() => {
          card1.classList.remove("bg-white", "text-blue-500");
          card2.classList.remove("bg-white", "text-blue-500");
          card1.querySelector("span").classList.add("hidden");
          card2.querySelector("span").classList.add("hidden");
          flippedCards = [];
        }, 1000);
      }
    }
  
    restartBtn.addEventListener("click", createCards);
  
    createCards();
  });