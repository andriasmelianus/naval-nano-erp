export const state = () => ({
    apiUrl: './api'
});

export const mutations = {
    /**
     * Set the global API URL.
     * @param {Object} state Store state
     * @param {String} url The API URL
     */
    setApiUrl(state, url) {
        state.apiUrl = url;
    }
}

export const getters = {
    /**
     * Get the full API URL to the resource.
     * @param {Object} state Store state
     * @param {Object} getters Store getters
     * @param {Object} rootState Store root state
     */
    apiUrl(state, getters, rootState) {
        return function (resourceUrl = "") {
            return state.apiUrl + resourceUrl;
        };
    }
}