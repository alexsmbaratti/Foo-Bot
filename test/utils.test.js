const utils = require('../utils');

test('Default parameter is not valid configuration', () => {
    expect(utils.validateConfigurationSchema()).toBeFalsy();
});

test('Empty configuration is not valid configuration', () => {
    expect(utils.validateConfigurationSchema({})).toBeFalsy();
});

test('Example configuration file is valid configuration', () => {
    expect(utils.validateConfigurationSchema(require('../example-config.json'))).toBeTruthy();
});

test('PNG attachments are recognized as images', () => {
    let pngAttachment = {
        name: 'Foo_Bot.png',
        contentType: 'image/png'
    };

    expect(utils.isImageAttachment(pngAttachment)).toBeTruthy();
});