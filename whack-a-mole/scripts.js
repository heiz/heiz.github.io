  const holes = document.querySelectorAll('.hole');
  const scoreBoard = document.querySelector('.score');
  const moles = document.querySelectorAll('.mole');
  const startButton = document.querySelector('#startButton');
  let lastHole;
  let timeUp = false;
  let isTouch = false;
  let score = 0;

  function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  function randomHole(holes){
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
      console.log('same holes again')
      return randomHole(holes);
    }

    lastHole = hole;
    return hole;
  }

  function peep() {
    const time = randomTime(200, 600);
    const hole = randomHole(holes);

    const timeTwo = randomTime(600, 1000);
    const holeTwo = randomHole(holes);
    
    hole.classList.add('up');
    holeTwo.classList.add('up');

    setTimeout(()=> {
      hole.classList.remove('up');
      holeTwo.classList.remove('up');
      if(!timeUp) peep();
    }, time)

    
  }

    //timer
  let countdown;
  const timerDisplay = document.querySelector('.timer');

  function timer(seconds){
    //clear any existing timers
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;

    displayTimeLeft(seconds);
    
    countdown = setInterval(() =>{
      const secondsLeft = Math.round((then - Date.now()) / 1000);

      //stop countdown when seconds left is 0 or negative
      if (secondsLeft < 0) {
        startButton.style.display = "block";
        clearInterval(countdown);
        return;
      }
      
      //display time left
      displayTimeLeft(secondsLeft)
    },1000);

  }

  function displayTimeLeft(seconds){ 
    const remainderSeconds = seconds % 60;
    const display = `${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    timerDisplay.textContent = display;
    document.title = `Whack A Mole! ${display}s`;
  }  

  //start game
  function startGame() {
    // bg music
    // const bgmuisc = document.querySelector('audio[data-key="bg"]');
    // bgmuisc.currentTime = 0;
    // bgmuisc.play();
    startButton.style.display = "none";

    score = 0;
    scoreBoard.textContent = 0;

    timer(30);
    timeUp = false;

    peep();

    setTimeout(function(){
      timeUp = true;
      // audio.pause();
      // audio.currentTime = 0;
    } , 30000)

  }

  function bonk(e) {
    console.log(e)

    if(!e.isTrusted) return; //stop cheat
    playSound();
    score++
    this.classList.remove('up');
    scoreBoard.textContent = score;

    if(e.type === 'touchstart') { //stop double fire
      e.stopPropagation();
      e.preventDefault();
    } 
  }


  moles.forEach(mole => mole.addEventListener('click', bonk));
  moles.forEach(mole => mole.addEventListener('touchstart', bonk));


  window.addEventListener("scroll", (e)=>e.preventDefault());
  window.addEventListener("touchmove", function(e){
    e.stopPropagation();
    e.preventDefault();
  })