/**
 * Plugins to standarize the API URL.
 * Proxy is managed in the nuxt.config.js.
 */
export default function ({ app }, inject) {
    /**
     * Register a new global function returning string of complete API URL.
     * 
     * @param {String} uri
     * @return {String} full-path ready-to-use API URL
     */
    inject('apiUrl', function (uri) {
        return './api' + uri;
    });
}