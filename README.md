# WAR CARD GAME

The [War Card Game](https://pevansik.github.io/WAR/) is a 2 player card game. Each player draws a card until they both draw the same card and a war is started.

**Live Demo**: https://pevansik.github.io/WAR/

![first-img](https://user-images.githubusercontent.com/13303617/205654932-6a833075-0645-46fe-9022-1507b0a161d6.PNG)


## How it works.

Written in Vanilla JS, the game consumes the API from [DeckofCards](https://deckofcardsapi.com/) each player draws a card at Random and winner is chosen on the weigth of the last card drawn. If both players Tie, WAR is declared at  which point the a fresh set of draws are made until one players draws a higher weighted card than the other and then a winner is chosen.


## How its made.
**Tech used**: HTML, CSS, JavaScript

 I used the Fetch web API to GET data from DeckofCards and manipulated the DOM to place Cards appropriately and declare winners. Having built a template for the players using HTML and CSS. 
 
 
 ## Optimizations.
I observed there was a delay in display the cards irrespective of which players turn it was to draw cards so I attempted calling the API Asynchronously(using Async await functions)  since I used used promise all receive the data before used the short coming of this was that both cards were displayed simultaneously and the players may miss out on whose turn it was to play.
I intend to have my code refactored such that returning players can resume from where the game had stopped previously irrespective of whether there was a winner or not.


 ## Lessons Learned.
Irrespective of skill level I learnt I had to make decisions based on certain factors surrounding my project and in the case of the card game, the trade of between speed and user experience as described in my optimization section above was one major decision I had to make.
 
