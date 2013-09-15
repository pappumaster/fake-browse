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

page.settings.userAgent = browseObject.userAgent;

page.onConsoleMessage = function(msg) {
	console.log(msg);
};

page.onInitialized = function() {
    var returnVal = page.evaluate(function (browseObject) {
	(function () {
	    var plugins = navigator.plugins;
            
            navigator = {
                appCodeName: navigator.appCodeName,
                appName: navigator.appName,
                appVersion: navigator.appVersion,
                cookieEnabled: navigator.cookieEnabled,
                doNotTrack: navigator.doNotTrack,
                geolocation: navigator.geolocation,
                language: browseObject.language,
                mimeTypes: navigator.mimeTypes,
                onLine: navigator.onLine,
                platform: navigator.platform,
                plugins: navigator.plugins,
                product: navigator.product,
                productSub: navigator.productSub,
                userAgent: browseObject.userAgent,
                vendor: navigator.vendor,
                vendorSub: navigator.vendorSub,
                __proto__: navigator.__proto__
            };

            screen = {
            	width : browseObject.width,
            	availHeight : screen.availHeight,
            	height : browseObject.height,
            	availWidth : screen.availWidth,
            	availLeft : screen.availLeft,
            	colorDepth : browseObject.colorDepth,
            	pixelDepth : screen.pixelDepth
            };

            var pluginObj = {};
            pluginObj.length = Object.keys(browseObject.plugins).length;
            Object.keys(browseObject.plugins).forEach(function(key) {
            	pluginObj[key] = browseObject.plugins[key];
            });
            pluginObj.refresh = plugins.refresh;
            pluginObj.item = plugins.item;
            pluginObj.namedItem = plugins.namedItem;
            navigator.plugins = pluginObj;
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
