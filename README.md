SPRINT 8
(URBAN ROUTES AUTOMATION TESTS)

PROJECT OVERVIEW
This project focuses on testing the Urban Routes application using end-to-end testing. It automates user interactions with the app by identifying and manipulating selectors and elements to ensure the application functions as expected under various scenarios.

INSTALLATION
    Prerequities
        -node.js
        -npm
        -chrome and firefox(up to date)

    Steps
        -Clone to the repository => https://github.com/username/repository-name.git
        -Navigate to the project directory => cd hm08-qa-us
        -In terminal run the command => npm install

    Install webdriverIO, mocha and webdriver services for chrome and firefox
        -npm install @wdio/cli @wdio/local-runner @wdio/mocha-framework @wdio/spec-reporter @wdio/sync webdriverio chromedriver geckodriver

    Initialize wedriverIO config
        -npx wdio config => Select Mocha as the test framework.
                         => Choose Chrome and Firefox as browsers.
                         => Choose the necessary reporters (e.g., spec reporter).
                         => Enable services for Chrome and Firefox drivers.

    Running the tests
        -Run this command in terminal => npm run wdio or npx wdio wdio.conf.js
        -To run specific test => add .only e.g (it.only(should add credit card))

    Project Structure
    src/
        -page.js => Contains selectors and reusable functions for page elements
    test/
        -createAnOrder.e2e.js => End-to-end test script for creating an order
    wdio.conf.s
        -webriver configuration file
    package.json
        -Project configurations and dependencies        


    


