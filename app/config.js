/**
 * Set up the configuration handling
 */
var nconf = require('nconf');

function Config() {
    nconf.argv().env();

    // If NODE_ENV supplied as an argument, use that. Else, fall back to development
    var environment = nconf.get('NODE_ENV') || 'development';
    environment=environment.toLowerCase();
    // First priority: use the environment-specific settings
    nconf.file(environment, {file:'./config/' + environment + '.json'});
    // Second priority: if no config settings found in arguments or configuration files, fall back to default values
    nconf.file('default', {file:'./config/default.json'});
}
/**
 * Load a value from the config by key
 * @param key
 * @returns {*}
 */
Config.prototype.get = function(key) {
    return nconf.get(key);
};

module.exports = new Config();