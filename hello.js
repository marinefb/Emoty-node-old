console.log("Hello, World!");

var loopInterval = setInterval(loop, 1000); //run the blinkLED function every 250ms

function loop() { //function to start blinking
    console.log("Ca va ?");
}

function endLoop() { //function to stop blinking
  clearInterval(loopInterval); // Stop blink intervals
}

//setTimeout(endLoop, 5000); //stop blinking after 5 seconds 