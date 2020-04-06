  const holes = document.querySelectorAll('.hole');
  const scoreBoard = document.querySelector('.score');
  const moles = document.querySelectorAll('.mole');
  let lastHole;
  let timeUp = false;
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
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);

    const timeTwo = randomTime(200, 1000);
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
    // const audio = document.querySelector('audio[data-key="bg"]');
    // audio.currentTime = 0;
    // audio.play();

    score = 0;
    scoreBoard.textContent = 0;

    timer(30);
    timeUp = false;

    peep();

    setTimeout(function(){
      timeUp = true;
      audio.pause();
      audio.currentTime = 0;
    } , 30000)

  }

  function bonk(e) {
    if(!e.isTrusted) return; //stop cheat
    score++
    const audio = document.querySelector('audio[data-key="71"]');
    audio.currentTime = 0;
    audio.play();
    this.classList.remove('up');
    scoreBoard.textContent = score;
  }


  moles.forEach(mole => mole.addEventListener('click', bonk));


  window.addEventListener("scroll", (e)=>e.preventDefault());
  window.addEventListener("touchmove", (e)=>e.preventDefault());