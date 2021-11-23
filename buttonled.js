console.log('Running...');
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var isConnectionActive = false; //Connection status
const {env} = require('process');

var server = env.LED_DEVICE_ADDRESS;
if (!server) {
  console.log('No address set for LED Alerter, set LED_DEVICE_ADDRESS')
}
var socket = require('socket.io-client')('http:\/\/' + server);

// set LEDs as outputs
// GPIO numbers, not pin numbers below
var LED_red = new Gpio(24, 'out'); //use GPIO 24 as output
var LED_yellow = new Gpio(16, 'out');
var LED_green = new Gpio(21, 'out');
var LED_link = new Gpio(23, 'out');

// set buttons as GPIO inputs
var BTN_red = new Gpio(2, 'in', 'rising', {debounceTimeout: 10}); //use GPIO 2 as input
var BTN_yellow = new Gpio(3, 'in', 'rising', {debounceTimeout: 10}); 
var BTN_green = new Gpio(8, 'in', 'rising', {debounceTimeout: 10});
var BTN_buzz = new Gpio(4, 'in', 'rising', {debounceTimeout: 10});

BTN_red.watch(function (err, value) { //Watch for hardware interrupts on BTN_red GPIO, specify callback function
  console.log("red press");
  if (err) { //if an error
    console.error('There was an error on BTN_red.watch', err); //output error message to console
  return;
  }
  console.log('Pushed red buton')
  socket.emit( 'led-toggle', {
    c: 'r',
    b: Number(!BTN_buzz.readSync())
  } );
});

BTN_yellow.watch(function (err, value) { //Watch for hardware interrupts on BTN_yellow GPIO, specify callback function
  if (err) { //if an error
    console.error('There was an error on BTN_yellow.watch', err); //output error message to console
  return;
  }
  console.log('Pushed yellow button')
  socket.emit( 'led-toggle', {
    c: 'y',
    b: Number(!BTN_buzz.readSync())
  } );

});

BTN_green.watch(function (err, value) { //Watch for hardware interrupts on BTN_green GPIO, specify callback function
  console.log("green press");
  if (err) { //if an error
    console.error('There was an error on BTN_green.watch', err); //output error message to console
  return;
  }
  console.log('Pushed green button')
  socket.emit( 'led-toggle', {
    c: 'g',
    b: Number(!BTN_buzz.readSync())
  } );

});

socket.on('disconnect', function() {
      //socket.emit('disconnect')
      console.log('disconnected from device')
      isConnectionActive = false;
      LED_link.writeSync(0);
  });

socket.on('connect', () => {
      console.log('connected to device, socket ID: ', socket.id)
      isConnectionActive = true;
      LED_link.writeSync(1);
  })

socket.on('led-status', (data) => {
      LED_red.writeSync(0);
      LED_yellow.writeSync(0);
      LED_green.writeSync(0);
      if (data.r == true) { LED_red.writeSync(1) };
      if (data.y == true) { LED_yellow.writeSync(1) };
      if (data.g == true) { LED_green.writeSync(1) };
  })
