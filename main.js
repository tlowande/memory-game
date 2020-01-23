var cardsArray = [
  { 'name': 'CSS', 'img': 'https://github.com/robgmerrill/img/blob/master/css3-logo.png?raw=true', },
  { 'name': 'HTML', 'img': 'https://github.com/robgmerrill/img/blob/master/html5-logo.png?raw=true', },
  { 'name': 'jQuery', 'img': 'https://github.com/robgmerrill/img/blob/master/jquery-logo.png?raw=true', },
  { 'name': 'JS', 'img': 'https://github.com/robgmerrill/img/blob/master/js-logo.png?raw=true', },
  { 'name': 'Node', 'img': 'https://github.com/robgmerrill/img/blob/master/nodejs-logo.png?raw=true', },
  { 'name': 'Photo Shop', 'img': 'https://github.com/robgmerrill/img/blob/master/photoshop-logo.png?raw=true', },
  { 'name': 'PHP', 'img': 'https://github.com/robgmerrill/img/blob/master/php-logo_1.png?raw=true', },
  { 'name': 'Python', 'img': 'https://github.com/robgmerrill/img/blob/master/python-logo.png?raw=true', },
  { 'name': 'Ruby', 'img': 'https://github.com/robgmerrill/img/blob/master/rails-logo.png?raw=true', },
  { 'name': 'Sass', 'img': 'https://github.com/robgmerrill/img/blob/master/sass-logo.png?raw=true', },
  { 'name': 'Sublime', 'img': 'https://github.com/robgmerrill/img/blob/master/sublime-logo.png?raw=true', },
  { 'name': 'Wordpress', 'img': 'https://github.com/robgmerrill/img/blob/master/wordpress-logo.png?raw=true', },
];

//______________________

// duplicates an array and sort them differently when loading the page
const gameGrid = cardsArray.concat(cardsArray)
gameGrid.sort(() => {
  return 0.5 - Math.random()
})

//selects HTML div and appends a section that will contain the cards
const winner = document.getElementById('winner');
const game = document.getElementById('game-board');
const grid = document.createElement('section')
grid.setAttribute('class', 'grid')
game.appendChild(grid)

//loops over the array of images to create each card and append it  to the section
for (let [index, pic] of gameGrid.entries()) {
  let card = document.createElement('div')
  card.classList.add('card')
  card.dataset.name = pic.name;
  // card.dataset.name = cardsArray[index].name;

  //cards are not faced up anymore, but covered
  let front = document.createElement('div')
  front.classList.add('front')

  let back = document.createElement('div')
  back.classList.add('back')
  back.style.backgroundImage = `url(${pic.img})`

  grid.appendChild(card)
  card.appendChild(front)
  card.appendChild(back)

  //cards were always faced up
  // card.style.backgroundImage = `url(${pic.img})`
  // card.style.backgroundImage = `url(${cardsArray[index].img})`
  // grid.appendChild(card)
}

// variables to store info on the game
let firstGuess = ''
let secondGuess = ''
let count = 0
let previousTarget = null
let moves = 0

//function that adds classes to the selected cards
let match = () => {
  //makes an array with all the elements that have the class described on the parentesis
  let selected = document.querySelectorAll('.selected')

  //loops over this array of two elements and adds the class match so they are not available anymore
  for (let element of selected) {
    element.classList.add('match')
  }

  if (document.querySelectorAll('.match').length === 24) {
    game.style.display = 'none'
    winner.style.display = 'block'
    document.querySelector('h4').innerHTML = `It took you ${moves} moves`

  }
}

// funtion that resets the variables after 2 cards are selected
const resetGuesses = () => {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;
  moves++
  let selected = document.querySelectorAll('.selected')

  for (let card of selected) {
    card.classList.remove('selected');
  }
}

// event listener to set it all up when up to 2 cards are selected
grid.addEventListener('click', (event) => {

  let clicked = event.target;

  //if clicked on the container <section> or elements previously selected or matched, nothing should happen
  if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('match') || clicked.parentNode.classList.contains('selected')) {
    return
  }

  //limits the clicks up to 2x
  if (count < 2) {
    clicked.parentNode.classList.add('selected');
    count++
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name
      // clicked.classList.add('selected')
    } else {
      secondGuess = clicked.parentNode.dataset.name
      // clicked.classList.add('selected')
    }

    if (firstGuess !== "" && secondGuess !== "") {
      if (firstGuess === secondGuess) {
        setTimeout(match, 800)
      }
      setTimeout(resetGuesses, 800)
      // setTimeout(() => {
      //   resetGuesses()
      // }, 500)

    }
    previousTarget = clicked
  }

})


