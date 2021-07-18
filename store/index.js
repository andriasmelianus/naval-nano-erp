export const state = () => ({
  /**
   * Store the current active company of logged-in user.
   */
  company: {},
  /**
   * Store the current active branch of logged-in user.
   */
  branch: {}
});

export const mutations = {
  /**
   * Set current active company data.
   * @param {*} state Store state
   * @param {*} company Company object
   */
  setCompany(state, company) {
    state.company = Object.assign({}, state.company, company);
  },

  /**
   * Set current active branch data.
   * @param {*} state Store state
   * @param {*} branch Branch object
   */
  setBranch(state, branch) {
    state.branch = Object.assign({}, state.branch, branch);
  }
};

export const actions = {
  fetchCompany(context) {
    this.$axios
      .$get("/company/mine")
      .then(function(result) {
        context.commit("setCompany", result);
      })
      .catch(function(result) {
        context.commit("global-snackbar/show", {
          message: "Gagal mengambil data.",
          color: "error"
        });
      });
  },
  fetchBranch(context) {
    this.$axios
      .$get("/branch/mine")
      .then(function(result) {
        context.commit("setBranch", result);
      })
      .catch(function(result) {
        context.commit("global-snackbar/show", {
          message: "Gagal mengambil data.",
          color: "error"
        });
      });
  }
};

export const getters = {
  /**
   * Get the company store state.
   * @param {*} state Store state
   * @param {*} getters Store getters
   * @param {*} rootState Store root state
   * @returns Object
   */
  company(state, getters, rootState) {
    return state.company;
  },

  /**
   * Get the branch store state.
   * @param {*} state Store state
   * @param {*} getters Store getters
   * @param {*} rootState Store root state
   * @returns Object
   */
  branch(state, getters, rootState) {
    return state.branch;
  }
};
