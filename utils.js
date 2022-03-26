module.exports = {
    /**
     * Determines if the given object conforms to the minimum valid schema required to start the bot.
     * @param configuration A configuration object
     */
    validateConfigurationSchema: function (configuration = {}) {
        /**
         * TODO: Validate that roles is an array
         */
        return configuration['bot'] && configuration['bot']['token'] && configuration['guild'];
    }
};