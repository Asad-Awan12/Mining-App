export const request = (payload) => ({ type: payload.type });
export const success = (payload) => ({
  type: payload.type,
  payload: payload.payload,
});
export const failure = (payload) => ({
  type: payload.type,
  error: payload.error,
});
