cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-webrtc/dist/webrtc.js",
        "id": "cordova-plugin-webrtc.WebRTC",
        "pluginId": "cordova-plugin-webrtc",
        "clobbers": [
            "webrtc"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.2",
    "cordova-plugin-android-permissions": "0.11.0",
    "cordova-opentok-android-permissions": "1.0.0",
    "cordova-plugin-webrtc": "0.1.1"
}
// BOTTOM OF METADATA
});