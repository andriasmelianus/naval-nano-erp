export const state = () => ({
    isShown: false,
    color: 'success',
    timeout: 5000,
    title: undefined,
    message: undefined
});

export const getters = {
    isShown: (state) => {
        return state.isShown;
    },

    color: (state) => {
        return state.color;
    },

    timeout: (state) => {
        return state.timeout;
    },

    title: (state) => {
        return state.title;
    },

    message: (state) => {
        return state.message;
    }
}

export const mutations = {
    hide(state) {
        state.isShown = false;
    },

    show(state, snackbarSpecification) {
        state.isShown = true;
        // Modify the default color state.
        switch (snackbarSpecification.color) {
            case 'info':
                state.color = 'light-blue';
                break;
            case 'success':
                state.color = 'green lighten-2'
                break;
            case 'warning':
                state.color = 'yellow lighten-2';
                break;
            case 'error':
                state.color = 'red lighten-2';
                break;
            default:
                state.color = snackbarSpecification.color;
                break;
        }
        state.color = snackbarSpecification.color;
        state.timeout = snackbarSpecification.timeout ? snackbarSpecification.timeout : 5000;

        state.title = snackbarSpecification.title;
        state.message = snackbarSpecification.message;
    }
}