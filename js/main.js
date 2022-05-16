//build a card game called war
//you and the oponent draws cards 
//the person with the higher card wins and takes both cards after each draw
//
//same card we declare war and we put up 3 cards and "flip a fourth one"
//the person with the fourth win takes all cards
//the winner takes all the cards.

let play1 = document.querySelector('.play1');
let play2 = document.querySelector('.play2');
let player1Suite = document.querySelector('.player1suite');
let player2Suite = document.querySelector('.player2suite')
let player1Value = document.querySelector('.value1')
let player2Value = document.querySelector('.value2')
let playButton = document.querySelector('button');



let deckId = '';

fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
  .then(res => res.json())
  .then(data => {
    console.log(data)
    deckId = data.deck_id
  })
  .catch(err => console.log(`error ${err}`))


  playButton.addEventListener('click', playCard)


function playCard() {
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json())
    .then(data => {
      console.log(data)

      play1.src = data.cards[0].image
      play2.src = data.cards[1].image

      let player1 = convertToNum(data.cards[0].value);
      let player2 = convertToNum(data.cards[1].value);

      if(data.remaining >= 2) {

        if(player1 > player2) {
          document.querySelector('.result').innerText = `Player 1 wins`
        }
        else if (player1 < player2) {
          document.querySelector('.result').innerText = `Player 2 wins`
        }
        else if (player1 === player2) {
          document.querySelector('.result').innerText = `WAR`
          fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`)
            .then(res => res.json())
            .then(data => {
              console.log(data)
              play1.src = data.cards[0].image
              play2.src = data.cards[1].image


              document.querySelector('.result').innerText = `Player with highest bid wins`
  
            })
            //play the 4th card from this pull the highest is the final winner
            //(be weary of something about the number of cards remaining)
            //disable play button
            //store winner in local storage
            //display another button that allows us to restart game
            //and clear the local storage when it is pressed and it also disappears
            //when it is clicked to brink back the play button
            //hide deal 2 button and display deal 4 button
            //if the cards finish on the round without war, restarts 2shuffles
  
            .catch(err => console.log(err))
        }
  
        player1Suite.textContent = data.cards[0].suit
        player1Value.textContent = player1
        player2Suite.textContent = data.cards[1].suit
        player2Value.textContent = player2
      }
      else if (data.remaining < 2) {
        playButton.style.display = 'none'
      }



    })

    .catch(err => console.log(`error is ${err}`))
}


//create a function to convert ACE, KING and QUEEN to numbers
function convertToNum(val) {
  if (val === 'JACK') {
    return 11
  }else if(val === 'QUEEN') {
    return 12
  }else if(val === 'KING') {
    return 13
  }else if(val === 'ACE') {
    return 14
  }else {return +val}
}