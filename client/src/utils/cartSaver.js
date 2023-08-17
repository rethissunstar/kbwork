// cartSaver.js
const cartSaver = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type.includes("cart")) {
    localStorage.setItem("cart", JSON.stringify(store.getState().cart));
  }
  return result;
};

export default cartSaver;
