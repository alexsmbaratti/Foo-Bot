const fs = require('fs');
const https = require('https');

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
    },
    saveImage: function (attachment) {
        return new Promise(function (resolve, reject) {
            let filePath = 'temp/' + attachment['name'];
            let file = fs.createWriteStream(filePath);
            https.get(attachment.proxyURL, response => {
                let stream = response.pipe(file);

                stream.on('finish', function () {
                    resolve(filePath);
                });

                stream.on('error', function () {
                    reject();
                });
            });
        });
    },
    deleteFile: function (filePath) {
        return new Promise(function (resolve, reject) {
            try {
                fs.unlinkSync(filePath);
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    },
    generatePhotographyEmbed: function (title, thumbnailURL, camera, width, height) {
        return {
            embeds: [
                {
                    thumbnail: {
                        url: thumbnailURL
                    },
                    title: title,
                    fields: [
                        {
                            name: 'Camera',
                            value: camera,
                            inline: true
                        },
                        {
                            name: 'Dimensions',
                            value: width + 'x' + height,
                            inline: true
                        }
                    ]
                }
            ]
        };
    }
};