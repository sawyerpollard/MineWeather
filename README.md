# Minecraft Weather New Tab

This Chrome Extension dynamically adjusts the New Tab page based on the current weather!

[![Available in the Chrome Web Store](https://user-images.githubusercontent.com/19192015/132961666-64cf372a-ad35-47ad-b378-4de4b4a07d6d.png)](https://chrome.google.com/webstore/detail/minecraft-weather-new-tab/hginofjkoglolmiajalmgomicjcpecbl)

**Displays a scene from the video game Minecraft depending on local weather conditions.**  
**Provides temperature and other weather information with an emphasis on aesthetics.**

![Example of new tab page](https://user-images.githubusercontent.com/19192015/132961674-ee25a836-16df-4190-a855-0110451fc43d.png)

## Features:
- Unique images for 8 different weather conditions
- Dynamic resizing ensures images always fill the screen
- Network requests never block the rendering of new tabs
- Infrequent background updates keep weather current without battery drain
- Simple switching between Celsius and Fahrenheit
- Completely local and private — no data collection

## Technologies:
- Tailwind CSS
- Custom CSS w/ Flexbox
- Async/Await & Promise Wrapping
- ES6 Modules
- OpenWeather API
- Caching Strategies w/ Storage API
- Geolocation API

## Building:
If you are installing from the source code instead of through the Chrome Web Store, you will need to add a file at src/apiKey.js with the following syntax:

```
var apiKey = "################################";
export default apiKey;
```
You can get your API key by creating an account at https://openweathermap.org/api and verifying your email.

### Extension popup designed with Tailwind:
![Extension popup](https://user-images.githubusercontent.com/19192015/132961679-eeb3ad7c-adc8-44f0-97f4-6c2bafcd5f8f.png)

*Included images are screenshots of Minecraft. Attributions are located under the Minecraft.js file.*
