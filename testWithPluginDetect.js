/*
    Initialize the plugins with certain Chrome plugins
    Opens testpage.html in the browser which runs PluginDetect
    on this browser instance.

    Argument to it is the plugin to check for. Exits on no argument.
*/

var page = require('webpage').create(),
    url = 'testpage.html',
    system = require('system');
    //_ = require('underscore');

page.onConsoleMessage = function(msg) {
    console.log(msg);
};

page.onInitialized = function() {

    page.evaluate(function() {
        (function () {

            var plugins = navigator.plugins;

            navigator = {
                appCodeName: navigator.appCodeName,
                appName: navigator.appName,
                appVersion: navigator.appVersion,
                cookieEnabled: navigator.cookieEnabled,
                doNotTrack: navigator.doNotTrack,
                geolocation: navigator.geolocation,
                language: navigator.language,
                mimeTypes: navigator.mimeTypes,
                onLine: navigator.onLine,
                platform: navigator.platform,
                plugins: navigator.plugins,
                product: navigator.product,
                productSub: navigator.productSub,
                userAgent: navigator.userAgent,
                vendor: navigator.vendor,
                vendorSub: navigator.vendorSub,
                __proto__: navigator.__proto__
            };

            navigator.plugins = {
                'length': 10,
                '0' : {
                    'description': 'Shockwave Flash 11.7 r700',
                    'filename': 'libpepflashplayer.so',
                    'name': 'Shockwave Flash'
                },
                '1' : {
                    'description': 'This plugin allows you to securely access other computers that have been shared with you. To use this plugin you must first install the <a href=\'https://chrome.google.com/remotedesktop\'>Chrome Remote Desktop</a> webapp.',
                    'filename': 'internal-remoting-viewer',
                    'name': 'Chrome Remote Desktop Viewer'
                }, '2' : {
                    'description': 'Enables Widevine licenses for playback of HTML audio/video content.',
                    'filename': 'libwidevinecdmadapter.so',
                    'name': "Widevine Content Decryption Module"
                }, '3' : {
                    'description': '',
                    'filename': 'libppGoogleNaClPluginChrome.so',
                    'name': "Native Client"
                }, '4' : {
                    'description': '',
                    'filename': 'libpdf.so',
                    'name': 'Chrome PDF Viewer'
                }, '5' : {
                    'description': 'This plug-in detects the presence of iTunes when opening iTunes Store URLs in a web page with Firefox.',
                    'filename': 'librhythmbox-itms-detection-plugin.so',
                    'name': 'iTunes Application Detector'
                }, '6' : {
                    'description': 'The <a href="http://www.gnome.org/projects/totem/">Totem</a> 3.4.3 plugin handles video and audio streams.',
                    'filename': 'libtotem-cone-plugin.so',
                    'name': 'VLC Multimedia Plugin (compatible Totem 3.4.3)'
                }, '7' : {
                    'description': 'The <a href=\'http://www.gnome.org/projects/totem/\'>Totem</a> 3.4.3 plugin handles video and audio streams.',
                    'filename': 'libtotem-gmp-plugin.so',
                    'name': 'Windows Media Player Plug-in 10 (compatible; Totem)'
                }, '8' : {
                    'description': 'DivX Web Player version 1.4.0.233',
                    'filename': 'libtotem-mully-plugin.so',
                    'name': 'DivX® Web Player'
                }, '9' : {
                    'description': 'The <a href=\'http://www.gnome.org/projects/totem/\'>Totem</a> 3.4.3 plugin handles video and audio streams.',
                    'filename': 'libtotem-narrowspace-plugin.so',
                    'name': 'QuickTime Plug-in 7.6.6'
                },
                refresh: plugins.refresh,
                item: plugins.item,
                namedItem: plugins.namedItem
            };
            //console.log(navigator.plugins);
            /*navigator.__defineGetter__('plugins', function() {
                //window.navigator.lookedForPlugins = true;
                return plugins;
            });*/
        })();
    });
    /*var s = page.evaluate(function() {
       var script = document.getElementsByTagName('script');
       eval(script[script.length-1].text);
        //console.log(PluginDetect);
       return PluginDetect.Plugins;
    });
    console.log(JSON.stringify(s['shockwave']));*/
    //console.log('Before plugins: ' + JSON.stringify(navigator.plugins));
    
    /*page.evaluate(function() {
        window.navigator = {
            plugins: {
                name: 'shockwave', 
                description: 'Shockwave FLash 11.7 r700', 
                filename: 'libpepflashplayer.so'
            }
        };
    });*/
    /*var sc = page.evaluate(function() {
        var script = document.getElementsByTagName('script');
        eval(script[script.length-1].text);
        //console.log(PluginDetect);
        return PluginDetect.Plugins;
    });
    console.log("Returned these plugins: ");
    console.log(JSON.stringify(sc.Plugins));*/
    //});

    //initChromePlugins(navigator.plugins);
    //navigator.plugins = fakePlug;
    //console.log(JSON.stringify(fakePlug));

    //console.log(fakePlug);
    //console.log('After plugins: ' + JSON.stringify(sc));
    //navigator.plugins = sc;
    
    /*Object.keys(sc).forEach(function(key) {
        console.log(key + ': ' + sc[key]);
    });*/
};
if (system.args.length === 1) {
    console.log('Extra parameter: plugin to check for.');
    phantom.exit(1);
}
var pluginToCheck = system.args[1];
page.open(url, function(status) {
    if (status !== 'success') {
        console.log('Can\'t access network');
    } else {
        page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function () {
            var el = page.evaluate(function(pluginToCheck) {
                var script = document.getElementsByTagName('script');
                eval(script[script.length-1].text);
                //eval(script[script.length-2].text);

                var pluginObj = PluginDetect.Plugins[pluginToCheck];
                if (!pluginObj) {
                    console.log('PluginDetect hates you and doesn\'t check for that plugin');
                    return null;
                }
                console.log('This is what Plugin Detect got for ' + pluginToCheck + '\n');

                indentSerialize(0, pluginObj);

                function indentSerialize(tab, obj) {
                    for (var i = 0; i < tab; ++i) {
                        console.log('\t');
                    }
                    //Doesn't recursively display
                    Object.keys(obj).forEach(function(key) {
                        console.log(key + ': ' + obj[key]);
                        /*if (_.isObject(obj)) {
                            indentSerialize(tab+1, obj[key]);
                        }*/
                    });
                };
                return PluginDetect.Plugins;
            }, pluginToCheck);
            
            if (!el) {
                phantom.exit();
            }
            console.log('\nThese are the plugins PluginDetect checks for: ');
            Object.keys(el).forEach(function(key) {
                console.log(key /*+ ': ' + JSON.stringify(el[key])*/);
            }); 

            /*console.log('');
            
            //The following displays null plugins. Want to fix this later.
            if (el[pluginToCheck]) {
                //dispPlugin(el, pluginToCheck);
            } else {
                console.log('PluginDetect hates you and doesn\'t check for that.');
            }
            function dispPlugin(pObj, plugin) {
                console.log(plugin + ': ' + JSON.stringify(pObj[plugin]));
            };*/

            phantom.exit();
           
        });
    }
});