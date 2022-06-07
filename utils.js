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
    },
    /**
     * Determines if the content type of attachment is that of an image
     * @param attachment An attachment
     * @returns {boolean} Whether the attachment is an image
     */
    isImageAttachment: function (attachment) {
        return attachment['contentType'].split('/')[0] === 'image';
    }
};