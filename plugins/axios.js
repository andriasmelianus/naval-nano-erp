export default function(context) {
  context.$axios.onError(error => {
    /**
     * Redirect to login page when an Axios's request contains an expired token.
     */
    const code = parseInt(error.response && error.response.status);
    if (code === 400 && error.response.data.error == "Token is expired") {
      context.redirect("/login");
    }
  });
}
