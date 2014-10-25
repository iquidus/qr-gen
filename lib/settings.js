/**
* The Settings Module reads the settings out of settings.json and provides
* this information to the other modules
*/

var fs = require("fs");
var jsonminify = require("jsonminify");

// The url it will be accessed from
exports.address = "127.0.0.1:9001";

// The Port faucet should listen on
exports.port = process.env.PORT || 9001;

// The image format
exports.format = "png";

// Size of one module in pixels (png only). Default 5.
exports.size = 5;

// White space around QR image in modules. Default 4 (png) start with 1 for others.
exports.margin = 4;

// Error correction level. One of L, M, Q, H. Default M.
exports.ec_level = "M";

exports.reloadSettings = function reloadSettings() {
  // Discover where the settings file lives
  var settingsFilename = "settings.json";
  settingsFilename = "./" + settingsFilename;

  var settingsStr;
  try{
    //read the settings sync
    settingsStr = fs.readFileSync(settingsFilename).toString();
  } catch(e){
    console.warn('No settings file found. Continuing using defaults!');
  }

  // try to parse the settings
  var settings;
  try {
    if(settingsStr) {
      settingsStr = jsonminify(settingsStr).replace(",]","]").replace(",}","}");
      settings = JSON.parse(settingsStr);
    }
  }catch(e){
    console.error('There was an error processing your settings.json file: '+e.message);
    process.exit(1);
  }

  //loop trough the settings
  for(var i in settings)
  {
    //test if the setting start with a low character
    if(i.charAt(0).search("[a-z]") !== 0)
    {
      console.warn("Settings should start with a low character: '" + i + "'");
    }

    //we know this setting, so we overwrite it
    if(exports[i] !== undefined)
    {
      exports[i] = settings[i];
    }
    //this setting is unkown, output a warning and throw it away
    else
    {
      console.warn("Unknown Setting: '" + i + "'. This setting doesn't exist or it was removed");
    }
  }

};

// initially load settings
exports.reloadSettings();