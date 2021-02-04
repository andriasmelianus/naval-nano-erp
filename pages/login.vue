<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title
                  >Login - {{ this.application_name }}</v-toolbar-title
                >
                <v-spacer></v-spacer>
              </v-toolbar>

              <v-form @submit.prevent="submitLogin">
                <v-card-text>
                  <v-text-field
                    v-model="username"
                    :error-messages="invalidUsernameMessage"
                    label="Username"
                    name="username"
                    prepend-icon="mdi-account-lock"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    v-model="password"
                    :error-messages="invalidPasswordMessage"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                  ></v-text-field>

                  <v-checkbox
                    v-model="remember"
                    label="Ingat saya"
                    color="primary"
                  ></v-checkbox>
                </v-card-text>

                <v-card-actions>
                  <v-btn color="primary" type="submit">Masuk</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="default" v-show="false">
                    <v-icon>mdi-account-circle</v-icon>&nbsp; Daftar...
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-snackbar v-model="loginFail" color="error" :top="true">
      Login gagal
      <br />
      {{ otherErrorMessage }}
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  head() {
    return {
      title: "Login",
    };
  },

  data: () => ({
    application_name: process.env.application_name,
    username: "",
    password: "",

    remember: false,

    loginFail: false,
    invalidUsernameMessage: "",
    invalidPasswordMessage: "",
    otherErrorMessage: "",
  }),

  methods: {
    submitLogin: function () {
      let vm = this;
      vm.$auth
        .loginWith("local", {
          data: {
            username: vm.username,
            password: vm.password,
            remember: vm.remember,
          },
        })
        .then(function (result) {})
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data);

            vm.loginFail = true;
            vm.invalidUsernameMessage = err.response.data.error.username;
            vm.invalidPasswordMessage = err.response.data.error.password;
          } else {
            vm.loginFail = true;
            vm.otherErrorMessage = err.message;
          }
        });
    },
  },
};
</script>
