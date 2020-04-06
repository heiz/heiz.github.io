let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds){
	//clear any existing timers
	clearInterval(countdown);

	const now = Date.now();
	const then = now + seconds * 1000;

	displayTimeLeft(seconds);
	displayEndTime(then);
	
	countdown = setInterval(() =>{
		const secondsLeft = Math.round((then - Date.now()) / 1000);

		//stop countdown when seconds left is 0 or negative
		if (secondsLeft <= 0) {
			clearInterval(countdown);
			var audio = new Audio('analog-watch-alarm_daniel-simion.mp3');
			audio.play();
			return;
		}
		
		//display time left
		displayTimeLeft(secondsLeft)
	},1000);

	console.log({now, then});
}

function displayTimeLeft(seconds){
	const minutes = Math.floor(seconds / 60);
	const remainderSeconds = seconds % 60;
	const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
	timerDisplay.textContent = display;
	document.title = display;
	console.log ({minutes , remainderSeconds})
}


function displayEndTime(timestamp) {

	//create a date object to properly get date details
	const end = new Date(timestamp);
	const hour = end.getHours();
	const minutes = end.getMinutes();

	endTime.textContent = `Be Back At ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
	console.log(this.dataset.time);
	const seconds = parseInt(this.dataset.time);
	timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e){
	e.preventDefault();
	const mins = this.minutes.value;
	timer(mins * 60);
	this.reset();

});




