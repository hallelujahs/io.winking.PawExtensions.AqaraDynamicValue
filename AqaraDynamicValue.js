// Aqara Sign
// https://opendoc.aqara.com/en/docs/developmanual/apiIntroduction/signGenerationRules.html


function AqaraDynamicValue() {
    this.evaluate = function(context) {
        let request = context.getCurrentRequest();
        let headers = ['accesstoken', 'appid', 'keyid', 'nonce', 'time'];
        let message = '';
        for (let header_name of headers) {
            let header = request.getHeaderByName(header_name);
            if (!header) {
                return 'Error: Missing Header ' + header_name;
            }
            if (message != '') {
                message = message + '&';
            }
            message = message + header_name + '=' + header;
        }
        let appkey_header = request.getHeaderByName('appkey');
        if (!appkey_header) {
            return 'Error: Missing Header AppKey';
        }
        message = message + appkey_header;

        // crypto-js from https://www.cdnpkg.com/crypto-js/file/crypto-js.min.js/
        let CryptoJS = require('crypto-js.min.js');
        return CryptoJS.MD5(message.toLowerCase());
    };
    this.title = function(context) {
        return 'Aqara Sign';        
    };
    this.text = function(context) {
        return 'MD5(accesstoken=...&appid=...&keyid=...&nonce=...&time=...<AppKey>)';
    };
};


AqaraDynamicValue.identifier = 'io.winking.PawExtensions.AqaraDynamicValue';
AqaraDynamicValue.title = 'Aqara Sign';
AqaraDynamicValue.help = 'https://github.com/hallelujahs/io.winking.PawExtensions.AqaraDynamicValue';

registerDynamicValueClass(AqaraDynamicValue);