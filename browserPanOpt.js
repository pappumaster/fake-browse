/*
 *  Fingerprints a browser by randomly adopting a different browser profile 
 *  everytime
 */

var page = require('webpage').create(),
    fs = require('fs'),
    browseArray, browseObject,
    url = 'https://panopticlick.eff.org/index.php?action=log&js=yes';

try {
    browseArray = JSON.parse(fs.open('.browserProfiles.json', 'r').read());
} catch (e) {
    console.log(e);
    phantom.exit();
}
browseObject = browseArray[Math.floor(Math.random()*browseArray.length)];

page.settings.userAgent = browseObject.navigator.userAgent;
page.onConsoleMessage = function(msg) {
	console.log(msg);
};

page.onInitialized = function() {
    var returnVal = page.evaluate(function (browseObject) {
	(function () {
            var plugins = navigator.plugins;
	    var mimeTypes = navigator.mimeTypes;
            var geolocation = navigator.geolocation;
            var webkitPersistentStorage = navigator.webkitPersistentStorage;
	    var webkitTemporaryStorage = navigator.webkitTemporaryStorage; 
            var __proto__ = navigator.__proto__;
            navigator = browseObject.navigator;
	    navigator.geolocation = geolocation;
	    navigator.webkitPersistentStorage = webkitPersistentStorage;
	    navigator.webkitTemporaryStorage = webkitTemporaryStorage;
            navigator.plugins.refresh = plugins.refresh;
            navigator.plugins.item = plugins.item;
            navigator.plugins.namedItem = plugins.namedItem;
	    navigator.mimeTypes.item = mimeTypes.item;
	    navigator.mimeTypes.namedItem = mimeTypes.namedItem;
	    screen = browseObject.screen;
	})();
    }, browseObject);
};

page.open(url, function(status) {
    if (status !== 'success') {
        console.log('Can\'t access network!');
    } else {
        window.setTimeout(function() {
            page.render('screenshots/expPan.png');
            console.log('Fingerprint rendered in \'expPan.png\'');
            phantom.exit();
        }, 10500);
    }
});
