module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    cardNumber: '#number',
    cvvField: '.card-second-row #code',
    messageField: '#comment',
    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    supportivePlanButton: 'img[alt="Supportive"]',
    addCardButton: 'div=Add card',
    paymentMethodButton: '.pp-button', 
    linkButton: 'button=Link',

    // clickable
    overlay: '.payment-picker,open',
    // Modals
    phoneNumberModal: '.modal',
    paymentMethodModal: '.payment-picker,open',
    //Blanket and Handkerchief Selectors
    blanketCheckbox: '.switch',
    orderButton: '.smart-button',
    activeBlanketCheckbox: '.switch-input',
    //Additional Item Selector
    icecreamPlusButton: '.counter-plus',
    itemCount: '.counter-value',
    //Message for Driver Selector
    messagefield: '#messagefield',
    //Modal for Car Search and Driver Info
    carSearchModal: 'div.order.shown',
   //Driver Elements
    driverName: 'div.order-btn-group div:nth-child(2)',
    driverRating: 'div.order-btn-rating',


    // Functions 
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },

    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code);
        await $(this.confirmButton).click();
    },
    selectSupportiveplan: async function() {
        const supportivePlan = await $(this.supportivePlan);
        await supportivePlan.click();
    },

    paymentMethod: async function() {
        const paymentMethodButton = await $(this.paymentMethodButton);
        await paymentMethodButton.waitForDisplayed();
        await paymentMethodButton.click();
        const addCardButton = await $(this.addCardButton);
        await addCardButton.waitForDisplayed();
        await addCardButton.click();
    },
                                                                                                                                                
    addCreditCard: async function(number, code) {
        const cardNumber = await $('#number');
        await cardNumber.waitForDisplayed({timeout: 10000});
        await cardNumber.click();
        await cardNumber.setValue(number);
        const cvvField = await $(this.cvvField);
        await cvvField.waitForDisplayed({timeout: 10000});
        await cvvField.click();
        await cvvField.setValue(code);
        const overlay = await $('.payment-picker,open');
        await overlay.click();
        const linkButton = await $(this.linkButton);
        await linkButton.waitForClickable();
        await linkButton.click();
    },
    
    writeMessageForDriver: async function(comment) {
        const messageField = await $(this.messageField);
        await messageField.waitForDisplayed();
        await messageField.setValue(comment);
    },

    isBlanketCheckboxChecked: async function() {
        const activeBlanketCheckbox = await $('.switch-input');
        await expect(activeBlanketCheckbox).toBeChecked();
    },
    
    toggleBlanketAndHandkerchief: async function () {
        const blanketCheckbox = await $('.switch');
        await blanketCheckbox.waitForDisplayed();
        await blanketCheckbox.waitForClickable();
        await blanketCheckbox.click();
        await browser.pause(500);
    },
 
    orderIcecream: async function() {
        const icecreamPlusButton = await $('.counter-plus');
        await icecreamPlusButton.waitForClickable();
        await icecreamPlusButton.click();
        await icecreamPlusButton.click();
        const orderButton = await $('button.smart-button');
        await expect(orderButton).toBeDisplayed();
        await orderButton.click();
    },
};