export const state = () => ({
    counter: 0
});

export const mutations = {
    /**
     * Dummy mutation to enable Vuex.
     * @param {*} state 
     */
    addCounter(state) {
        state.counter++;
    },
}