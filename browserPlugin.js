/*
 *  Detects plugins of a browser by randomly adopting a different browser profile
 *  everytime.
 *  Argument: Name of plugin to check for
 *  e.g: phantomjs browserPlugin.js shockwave
 */

var page = require('webpage').create(),
    fs = require('fs'),
    browseArray, browseObject,
    url = 'testpage.html',
    system = require('system');

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
if (system.args.length === 1) {
    console.log('Extra parameter needed: plugin to check for.');
    phantom.exit();
}
var pluginToCheck = system.args[1];
page.open(url, function(status) {
    if (status !== 'success') {
        console.log('Can\'t access network!');
    } else {
        page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function () {
            var el = page.evaluate(function(pluginToCheck) {
                var script = document.getElementsByTagName('script');
                eval(script[script.length-1].text);
                
                var pluginObj = PluginDetect.Plugins[pluginToCheck];
                if (!pluginObj) {
                    console.log('PluginDetect hates you and doesn\'t check for that plugin');
                    return null;
                }
                console.log('This is what Plugin Detect got for ' + pluginToCheck + '\n');
                indentSerialize(0, pluginObj);
                function indentSerialize(tab, obj) {
                    Object.keys(obj).forEach(function(key) {
                        console.log(key + ': ' + obj[key]);
                    });
                };
                return PluginDetect.Plugins;
            }, pluginToCheck);
            if (!el) {
                phantom.exit();
            }
            console.log('\nThese are the plugins PluginDetect checks for: ');
            Object.keys(el).forEach(function(key) {
                console.log(key);
            });
            phantom.exit();
        });
    }
});
