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
- one [Raspberry Pi Zero WH]
- one 6" x 3" x 2" project enclosure like [this](https://www.radioshack.com/products/radioshack-project-enclosure-6x3x2?variant=20332261445) or [this](https://www.amazon.com/dp/B07TS6RY85/)
- two [3mm LED holders](https://www.adafruit.com/product/2179)
- one 3mm red LED
- one 3mm green LED
- one [angled micro USB panel mount cable](https://www.amazon.com/gp/product/B08RRZBRC8/)
- one 150 ohm resistor
- four 220 ohm resistors
- one small breadboard PCB such as [this](https://www.adafruit.com/product/1214)
- some female - female jumpers and headers

Here is the schematic for connecting everything together:

![](https://raw.githubusercontent.com/alanb128/alerter-client/master/images/schematic.png)

There are many options for wiring the project together. I used a small breadboard PCB to mount the resistors:

![](https://raw.githubusercontent.com/alanb128/alerter-client/master/images/interior.png)

### Software
This project uses the [balena IOT platform](https://www.balena.io/) - you can sign up for a free account (up to 10 devices) [here](https://dashboard.balena-cloud.com/login). 
