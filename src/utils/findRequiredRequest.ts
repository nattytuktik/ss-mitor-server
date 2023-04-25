export const findRequiredRequest = (
  request: {},
  fillRequest: Array<string>,
): Array<string> => {
  let state: Array<string> = [];
  const keys = Object.keys(request);
  /**
   *
   *
   *
   *
   *
   * filter mistake requred
   */
  const fillkeys = fillRequest.filter((fill) => !keys.includes(fill));

  /**
   *
   *
   *
   * when fillkey have mistake feild
   */
  if (fillkeys.length >= fillRequest.length) {
    for (let [key, value] of Object.entries(request)) {
      /**
       *
       *
       *
       *
       * push key couse value = null
       */
      if (value === null || value === undefined) {
        state.push(key);
      }
    }
  } else {
    state.push(...fillkeys);
  }
  return state;
};
