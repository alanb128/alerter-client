# alerter-client
A push button control panel for the [LED Alerter](https://github.com/balenalabs-incubator/LED-Alerter).

![](https://raw.githubusercontent.com/alanb128/alerter-client/master/images/exterior.png)

The [LED Alerter](https://github.com/balenalabs-incubator/LED-Alerter) is a separate project that allows you to control three LEDs using a custom web page. This project provides hardware control of the alerter's LEDs using dedicated pushbuttons. The alerter-client recieves feedback from the alerter and syncs to show the current LED color by illuminating the appropriate pushbutton. (It will sync even if the alerter is changed via its web page.) A toggle switch controls whether to activate the buzzer on the alerter. This device also includes a red power LED and a green LED that lights when a connection to the alerter has been established.

## Building the project

### Hardware
Here is the parts list:
- one [16mm Illuminated Pushbutton - Red Momentary](https://www.adafruit.com/product/1439)
- one [16mm Illuminated Pushbutton - Yellow Momentary](https://www.adafruit.com/product/1441)
- one [16mm Illuminated Pushbutton - Green Momentary](https://www.adafruit.com/product/1440)
- one [Mini Panel Mount SPDT Toggle Switch](https://www.adafruit.com/product/3221)
- one [Raspberry Pi Zero W](https://www.raspberrypi.com/products/raspberry-pi-zero-w/) or WH (with headers - easier)
- one 6" x 3" x 2" project enclosure like [this](https://www.radioshack.com/products/radioshack-project-enclosure-6x3x2?variant=20332261445) or [this](https://www.amazon.com/dp/B07TS6RY85/)
- two [3mm LED holders](https://www.adafruit.com/product/2179)
- one 3mm red LED
- one 3mm green LED
- one [angled micro USB panel mount cable](https://www.amazon.com/gp/product/B08RRZBRC8/)
- one 150 ohm resistor
- four 220 ohm resistors
- one small breadboard PCB such as [this](https://www.adafruit.com/product/1214)
- some female - female jumpers and headers
- a micro SD card (at least 16GB) and a micro USB power supply

Here is the schematic for connecting everything together:

![](https://raw.githubusercontent.com/alanb128/alerter-client/master/images/schematic.png)

There are many options for wiring the project together. I used a small breadboard PCB to mount the resistors:

![](https://raw.githubusercontent.com/alanb128/alerter-client/master/images/interior.png)

### Software
This project uses the [balena IOT platform](https://www.balena.io/) - you can sign up for a free account (up to 10 devices) [here](https://dashboard.balena-cloud.com/login). 

Create a new fleet in the balenaCloud dashboard, then download an image for the Pi Zero, making sure to enter your WiFi information. [Burn](https://www.balena.io/etcher/) the downloaded image to a microSD card and insert into the Pi Zero W. You now have a full OS that will connect to the internet and pull down this application once it is available.

Use the [balena CLI](https://www.balena.io/docs/reference/balena-cli/) to push this application from your local machine to balenaCloud using the fleet name you created earlier. Your device will now download and run the application.

### Settings
You'll need to adjust a few settings before the alerter-client will work. First, in the "device configuration" in balenaCloud, change the "Define DT parameters" to `"i2c_arm=on","audio=on"` - basically eliminating the `spi-on` setting and turning off SPI. We do this because SPI will interfere with our use of GPIO 8.

In the "Device Variables" section of the balenaCloud dashboard, we'll need to add two variables:

- Set `LED_DEVICE_UUID` to the full UUID of your LED Alerter. You can find this value on the dashboard for the alerter device
- Set `LED_DEVICE_ADDRESS` to the local IP address of the LED alerter. The alerter will need to be on the same network as the alerter-client.

## How it works
We use Node.js in this project. The [onoff](https://www.npmjs.com/package/onoff) package to read the GPIOs, detect button presses, and create interrupts to act on the button presses. [Socket.io Client](https://www.npmjs.com/package/socket.io-client) is used to establish a websocket with the alerter and read/write data with the alerter.

Note that you can use different GPIO pins if you'd like, but you'll need to change the values in the `buttonled.js` code. Look out for other services that may be using a GPIO pin such as one-wire and SPI. If there is a conflict, you'll likely see an error such as ` Error: EBUSY: resource busy or locked, write`. In addition, be aware that we can only detect button presses with GPIO pins that are held high by default, since our buttons connect the pins to ground by default. The defaults can be seen in Table 6-31 on pages 102 and 103 of the [BCM2835 ARM Peripherals documentation](http://www.farnell.com/datasheets/1521578.pdf).
