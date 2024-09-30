const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {
    it('should set the address', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await expect($(page.fromField)).toHaveValue('East 2nd Street, 601');
        await expect($(page.toField)).toHaveValue('1300 1st St');
    }),

    it('should select supportive plan', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const planSelector = await $('img[alt="Supportive"]');
        await expect(planSelector).toBeExisting();
        const planImage = await $('img[alt="Supportive"]');
        await expect(await planImage.getAttribute('alt')).toBe('Supportive');
        await planImage.waitForExist({timeout: 5000});
        await expect(planImage).toBeExisting();
    }),

    it('should fill the phone number', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await $(`div=${phoneNumber}`)).toBeExisting();
    }),
    
    it('should add a credit card', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.paymentMethod();
        await page.addCreditCard('1234 0000 4321', '12');
        const addCardButton = await $('//*[@id="root"]/div/div[2]/div[2]/div[1]/div[2]/div[3]/div[3]');
        await addCardButton.waitForDisplayed({timeout: 20000});
        await expect(addCardButton).toBeExisting();
    }),

    it('should write a message for the driver', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const supportivePlanButton = await $(page.supportivePlanButton);
        await supportivePlanButton.waitForDisplayed();
        await supportivePlanButton.click();
        const messageField = await $(page.messageField);
        await messageField.waitForDisplayed();
        await messageField.setValue('please hurry');
        const messageValue = await messageField.getValue();
        await expect(messageValue).toBe('please hurry');
    }),

    it('should order a blanket and handkerchiefs', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd street, 601', '1300 1st St');
        const supportivePlanButton = await $(page.supportivePlanButton);
        await supportivePlanButton.waitForDisplayed();
        await supportivePlanButton.click();
        await page.toggleBlanketAndHandkerchief();
        const activeBlanketCheckbox = await $('.switch-input');
        await expect(activeBlanketCheckbox).toBeChecked();    
    }),
        

    it('should order 2 ice creams', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd street, 601', '1300 1st St');
        const supportivePlanButton = await $(page.supportivePlanButton);
        await supportivePlanButton.waitForDisplayed();
        await supportivePlanButton.click();
        await page.orderIcecream();
        const itemCount = await $('.counter-value');
        await itemCount.waitForDisplayed({timeout: 10000});
        await browser.pause(500)
        await expect(itemCount).toHaveText('2');
    }),

    it('should display car search modals', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd street, 601', '1300 1st St');
        const orderButton = await $('.smart-button');
        await orderButton.waitForDisplayed();
        await orderButton.click();
        const carSearchModal = await $('.order.shown');
        await carSearchModal.waitForDisplayed({timeout: 30000});
        await expect(carSearchModal).toBeExisting();
    });    
});
