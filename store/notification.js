export const state = () => ({
    isShown: false,
    color: 'success',
    timeout: 5000,
    message: undefined
});

export const getters = {
    isShown: (state) => {
        return state.isShown;
    }
}

export const mutations = {
    hide(state) {
        state.isShown = false;
    },

    show(state, notification) {
        state.isShown = true;
        // Modify the default color state.
        /*
        switch (notification.color) {
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
                state.color = notification.color;
                break;
        }
        */
        state.color = notification.color;
        state.timeout = notification.timeout ? notification.timeout : 5000;

        state.message = notification.message;
    }
}