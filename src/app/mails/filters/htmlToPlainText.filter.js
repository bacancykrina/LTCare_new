angular.module('htmlToPlain', [])
    .filter('htmlToPlaintext', function () {
        return function (text) {
            return String(text).replace(/<[^>]+>/gm, '');
        };
    }
);