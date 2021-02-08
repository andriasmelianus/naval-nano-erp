<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title
                  >Login - {{ this.APPLICATION_NAME }}</v-toolbar-title
                >
                <v-spacer></v-spacer>
              </v-toolbar>

              <v-form @submit.prevent="submitLogin">
                <v-card-text>
                  <v-text-field
                    v-model="email"
                    :error-messages="invalidEmailMessage"
                    label="Email"
                    name="email"
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
  auth: "guest",
  head() {
    return {
      title: "Login",
    };
  },

  data: () => ({
    APPLICATION_NAME: process.env.APPLICATION_NAME,
    email: "",
    password: "",

    remember: false,

    loginFail: false,
    invalidEmailMessage: "",
    invalidPasswordMessage: "",
    otherErrorMessage: "",
  }),

  methods: {
    submitLogin: function () {
      let vm = this;
      vm.$auth
        .loginWith("laravelJWT", {
          data: {
            email: vm.email,
            password: vm.password,
            remember: vm.remember,
          },
        })
        .then(function (result) {})
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data);

            vm.loginFail = true;
            vm.invalidEmailMessage = err.response.data.error.email;
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
