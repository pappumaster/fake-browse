/*
    Initializes this browser with certain Chrome Plugins.
    Runs panoticlick against it and outputs the fingerprint in pan.png
*/

var page = require('webpage').create(),
    url = 'https://panopticlick.eff.org/index.php?action=log&js=yes';

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
                }, '1' : {
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

page.open(url, function(status) {
    if (status !== 'success') {
        console.log('Can\'t access network');
    } else {
        /*var el = page.evaluate(function() {

            //$('#clickLink').click();
            //return page.content;

            //console.log('yeahh in the page dude');
        });*/

        window.setTimeout(function() {
            page.render('pan.png');
            console.log('Fingerprint rendered in \'pan.png\'');

            phantom.exit();
        }, 10000);  //panoticlick takes time to load
            
        /*if (el) {
            console.log("Looked for plugins");
        } else {
            console.log("Didn\'t look dude");
        }*/   
    }
});