import apiClient from "./apiClient";

const tokenMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  //safe check
  if (!state || !state.auth) return result;
  const token = store.getState().auth.token;

  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
  }

  return result;
};

export default tokenMiddleware;
