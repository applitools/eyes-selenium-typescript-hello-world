import 'chromedriver';
import {Builder, Capabilities, By, ThenableWebDriver} from 'selenium-webdriver';
import {Eyes, ConsoleLogHandler} from 'eyes.selenium';

(async () => {
    // Open a Chrome browser.
    const driver : ThenableWebDriver = new Builder()
        .withCapabilities(Capabilities.chrome())
        .build();

    // Initialize the eyes SDK and set your private API key.
    const eyes : Eyes = new Eyes();

    eyes.setLogHandler(new ConsoleLogHandler(false));

    // Use env variable APPLITOOLS_API_KEY to send the api key or call next method
    // eyes.setApiKey('XXXX')

    // Set the server url in case is needed
    // eyes.setServerUrl('https://eshopworldeyes....')

    try {
        // Start the test and set the browser's viewport size to 800x600.
        await eyes.open(driver, 'Hello World!', 'My first Javascript test!', {width: 800, height: 600});

        // Navigate the browser to the "hello world!" web-site.
        await driver.get('https://applitools.com/helloworld');

        // Visual checkpoint #1.
        await eyes.checkWindow('Main Page', -1);

        // Click the "Click me!" button.
        await driver.findElement(By.css('button')).click();

        // Visual checkpoint #2.
        await eyes.checkWindow('Click!', -1);

        // End the test.
        await eyes.close();
    } finally {
        // Close the browser.
        await driver.quit();

        // If the test was aborted before eyes.close was called ends the test as aborted.
        await eyes.abortIfNotClosed();
    }
})();
