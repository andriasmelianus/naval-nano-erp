export const UserData = {
    computed: {
        /**
         * Returns authenticated user name.
         */
        user_name: function () {
            return this.$auth.user.name;
        }
    }
}