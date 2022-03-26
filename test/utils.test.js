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