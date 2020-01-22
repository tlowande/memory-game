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
const gameGrid = cardsArray.concat(cardsArray)
gameGrid.sort(() => {
  return 0.5 - Math.random()
})


const game = document.getElementById('game-board');
const grid = document.createElement('section')
grid.setAttribute('class', 'grid')
game.appendChild(grid)

for (let [index, pic] of gameGrid.entries()) {
  let card = document.createElement('div')
  card.classList.add('card')
  card.dataset.name = pic.name;
  // card.dataset.name = cardsArray[index].name;
  card.style.backgroundImage = `url(${pic.img})`
  // card.style.backgroundImage = `url(${cardsArray[index].img})`
  grid.appendChild(card)
}

let firstGuess = ''
let secondGuess = ''

let count = 0
let previousTarget = null

let match = () => {
  //makes an array with all the elements that have the class described on the parentesis
  let selected = document.querySelectorAll('.selected')

  //loops over this array of two elements and adds the class match so they are not available anymore
  for (let element of selected) {
    element.classList.add('match')
  }
}

const resetGuesses = () => {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  let selected = document.querySelectorAll('.selected')

  for (let card of selected) {
    card.classList.remove('selected');
  }
}


grid.addEventListener('click', (event) => {
  let clicked = event.target;
  if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('match') || clicked.parentNode.classList.contains('selected')) {
    return
  }
  if (count < 2) {
    // clicked.classList.add('selected'); 
    count++
    if (count === 1) {
      firstGuess = clicked.dataset.name
      clicked.classList.add('selected')
    } else {
      secondGuess = clicked.dataset.name
      clicked.classList.add('selected')
    }

    if (firstGuess !== "" && secondGuess !== "") {
      if (firstGuess === secondGuess) {
        match()
      }
      resetGuesses()

    }

    previousTarget = clicked
  }
})