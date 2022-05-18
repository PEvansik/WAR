//build a card game called war
//you and the oponent draws cards 
//the person with the higher card wins and takes both cards after each draw
//same card we declare war and we put up 3 cards and "flip a fourth one"
//the person with the fourth win takes all cards
//the winner takes all the cards.



//preWar rendering DOM API
let play1 = document.querySelector('.play1');
let play2 = document.querySelector('.play2');

let player1Suite = document.querySelector('.player1suite');
let player2Suite = document.querySelector('.player2suite')
let player1Value = document.querySelector('.value1')
let player2Value = document.querySelector('.value2')

//War rendering DOM API
let play1War = document.querySelector('.final1');
let play2War = document.querySelector('.final2');

let player1WarSuite = document.querySelector('.player1warsuite')
let player2WarSuite = document.querySelector('.player2warsuite')
let player1WarValue = document.querySelector('.value1war')
let player2WarValue = document.querySelector('.value2war')

let warTime1 = document.querySelector('.wartime1')
let warTime2 = document.querySelector('.wartime2')

//Buttons
let playButton = document.querySelector('.play');
let restartButton = document.querySelector('.restart')
//outcome
let gameOutcome = document.querySelector('.result')


restartButton.addEventListener('click', () => {
  playButton.style.display = 'inline-block'
})

//shuffle cards to start the game
fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
  .then(res => res.json())
  .then(data => {
    console.log(data)
    deckId = data.deck_id
    console.log(deckId)
  })
  .catch(err => console.log(`error ${err}`))


//when the play button is clicked, call playCard function
playButton.addEventListener('click', playCard)

//restartButton.addEventListener('click', () => {
//  playButton.style.display = 'inline-block'
//})



function playCard() {
  //draw 2 cards
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      //players 1 & 2 images      
      play1.src = data.cards[0].image
      play2.src = data.cards[1].image

      //players 1 and 2 values used for evaluating the winner having converted to number
      let player1 = convertToNum(data.cards[0].value);
      let player2 = convertToNum(data.cards[1].value);
      //war

      player1Value.textContent = data.cards[0].value
      player2Value.textContent = data.cards[1].value

      player1Suite.textContent = data.cards[0].suit
      player2Suite.textContent = data.cards[1].suit


      //check how many cards are remaining in the deck
      if(data.remaining >= 2) {

        if(player1 > player2) {
          gameOutcome.innerText = `Player 1 wins`
        }
        else if (player1 < player2) {
          gameOutcome.innerText = `Player 2 wins`
        }
//WAR is reached===**********
        else if (player1 === player2) {
          document.querySelector('.result').innerText = `WAR`

          //if cards left is greater than equal to 4 continue with deck and draw 4
          if(data.remaining >= 4) {

            fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`)
              .then(res => res.json())
              .then(data => {
                console.log(data)
                play1.src = data.cards[0].image
                play2.src = data.cards[1].image
                play1War.src = data.cards[2].image
                play2War.src = data.cards[3].image

                //war
                let player3 = convertToNum(data.cards[2].value);
                let player4 = convertToNum(data.cards[3].value);

                player1Suite.textContent = data.cards[0].suit
                player2Suite.textContent = data.cards[1].suit
                player1WarSuite.textContent = data.cards[2].suit
                player2WarSuite.textContent = data.cards[3].suit

                player1Value.textContent = data.cards[0].value
                player2Value.textContent = data.cards[1].value
                player1WarValue.textContent = data.cards[2].value
                player2WarValue.textContent = data.cards[3].value
                
                warTime1.style.display = 'block'
                warTime2.style.display = 'block'

                if(player3 > player4) {
                  gameOutcome.innerText = `Player 1 wins`
                }
                else if (player3 < player4) {
                  gameOutcome.innerText = `Player 2 wins`
                }
              })
              .catch(err => console.log(err))
              playButton.style.display = 'none'
          }

          //if cards left is less than 4 reshuffle deck and draw 4
          else {
            //we ahve to reshuffle an not throw away the existing deck
            fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/?remaining=true`)
              .then(res => res.json())
              .then(data => {
                console.log(data)
                //draw 4 cards from the chain
                return fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`)

              })
              .then(response => response.json())
              .then(data => {

                play1.src = data.cards[0].image
                play2.src = data.cards[1].image
                play1War.src = data.cards[2].image
                play2War.src = data.cards[3].image

                //war
                let player3 = convertToNum(data.cards[2].value);
                let player4 = convertToNum(data.cards[3].value);

                player1Suite.innerText = data.cards[0].suit
                player2Suite.innerText = data.cards[1].suit
                player1WarSuite.innerText = data.cards[2].suit
                player2WarSuite.innerText = data.cards[3].suit

                player1Value.textContent = data.cards[0].value
                player2Value.textContent = data.cards[1].value
                player1Warvalue.textContent = data.cards[2].value
                player2Warvalue.textContent = data.cards[3].value

                warTime1.style.display = 'block'
                warTime2.style.display = 'block'
  
                if(player3 > player4) {
                  gameOutcome.innerText = `Player 1 wins`
                }
                else if (player3 < player4) {
                  gameOutcome.innerText = `Player 2 wins`
                }
              })
              .catch(err => console.log(err))
              playButton.style.display = 'none'
          }
          //disable play button to enable player restart game
          playButton.style.display = 'none'
        }

      }
      //if the deck is exhausted before war
      else if (data.remaining < 2) {
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          //draw 2 cards from the chain
          return fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        })
        .then(response => response.json())
        .then(data => {

          play1.src = data.cards[0].image
          play2.src = data.cards[1].image

          player1Suite.innerText = data.cards[0].suit
          player2Suite.innerText = data.cards[1].suit

          player1Value.textContent = data.cards[0].value
          player2Value.textContent = data.cards[1].value

          if(player1 > player2) {
            gameOutcome.innerText = `Player 1 wins`
          }
          else if (player1 < player2) {
            gameOutcome.innerText = `Player 2 wins`
          }

//WAR
          else if (player1 == player2) {
            document.querySelector('.result').innerText = `WAR`

            //if cards left is greater than equal to 4 continue with deck and draw 4
            if(data.remaining >= 4) {
  
              fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`)
                .then(res => res.json())
                .then(data => {
                  console.log(data)
                  play1.src = data.cards[0].image
                  play2.src = data.cards[1].image
                  play1War.src = data.cards[2].image
                  play2War.src = data.cards[3].image
  
                  //war
                  let player3 = convertToNum(data.cards[2].value);
                  let player4 = convertToNum(data.cards[3].value);
  
                  player1Suite.textContent = data.cards[0].suit
                  player2Suite.textContent = data.cards[1].suit
                  player1WarSuite.textContent = data.cards[2].suit
                  player2WarSuite.textContent = data.cards[3].suit
  
                  player1Value.textContent = data.cards[0].value
                  player2Value.textContent = data.cards[1].value
                  player1WarValue.textContent = data.cards[2].value
                  player2WarValue.textContent = data.cards[3].value
                  
                  warTime1.style.display = 'block'
                  warTime2.style.display = 'block'
  
                  if(player3 > player4) {
                    gameOutcome.innerText = `Player 1 wins`
                  }
                  else if (player3 < player4) {
                    gameOutcome.innerText = `Player 2 wins`
                  }
                })
                .catch(err => console.log(err))
                playButton.style.display = 'none'
            }
  
            //if cards left is less than 4 reshuffle deck and draw 4
            else if(data.remaining < 4) {
              //we ahve to reshuffle an not throw away the existing deck
              fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/?remaining=true`)
                .then(res => res.json())
                .then(data => {
                  console.log(data)
                  //draw 4 cards from the chain
                  return fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`)
  
                })
                .then(response => response.json())
                .then(data => {
  
                  play1.src = data.cards[0].image
                  play2.src = data.cards[1].image
                  play1War.src = data.cards[2].image
                  play2War.src = data.cards[3].image
  
                  //war
                  let player3 = convertToNum(data.cards[2].value);
                  let player4 = convertToNum(data.cards[3].value);
  
                  player1Suite.innerText = data.cards[0].suit
                  player2Suite.innerText = data.cards[1].suit
                  player1WarSuite.innerText = data.cards[2].suit
                  player2WarSuite.innerText = data.cards[3].suit
  
                  player1Value.textContent = data.cards[0].value
                  player2Value.textContent = data.cards[1].value
                  player1Warvalue.textContent = data.cards[2].value
                  player2Warvalue.textContent = data.cards[3].value
  
                  warTime1.style.display = 'block'
                  warTime2.style.display = 'block'
    
                  if(player3 > player4) {
                    gameOutcome.innerText = `Player 1 wins`
                  }
                  else if (player3 < player4) {
                    gameOutcome.innerText = `Player 2 wins`
                  }
                })
                .catch(err => console.log(err))
                playButton.style.display = 'none'
            }
            playButton.style.display = 'none'
          }
        })
        .catch(err => console.log(err))
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













          //if the number of cards left is greater than 4 remaing parameter should be true
          //else the remaining parameter should be false

          //play the 4th card and from this pull the highest is the final winner
          //(be weary of something about the number of cards remaining)
          //disable play button
          //store winner in local storage
          //display another button that allows us to restart game
          //and clear the local storage when it is pressed and it also disappears
          //when it is clicked to brink back the play button
          //hide deal 2 button and display deal 4 button
          //if the cards finish on the round without war, restarts 2shuffles
  
          //player1Suite.textContent = data.cards[0].suit
          //player1Value.textContent = player1
          //player2Suite.textContent = data.cards[1].suit
          //player2Value.textContent = player2
          //War
          //play1WarSuite.textContent = data.cards[3].suit
          //player1WarValue.textContent = player3
          //play2WarSuite.textContent = data.cards[4].suit
          //player2WarValue.textContent = player4




          //let card = {
//  image1 : play1.src,
//  image2 : play2.src,
//  suite1 : player1Suite.textContent,
//  suite2 : player2Suite.textContent,
//  value1 : player1Value.textContent,
//  value2 : player2Value.textContent
//}
//localStorage.setItem('card', JSON.stringify(card))



//get values on pageLoad
//if (play1 || play2 || player1Suite || player2Suite || player1Value || player2Value) {
//  card = JSON.parse(localStorage.getItem('card'))
//  play1 = card.image1;
//  play2 = card.image2;
//  player1Suite = card.suite1;
//  player2Suite = card.suite2; 
//  player1Value = card.value1;
//  player2Value = card.value2;
//}