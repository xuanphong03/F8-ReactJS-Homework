export const reducer = (state, action) => {
  switch (action.type) {
    case "cart/add": {
      const product = action.payload;
      const existingProduct = state.cart.find((item) => item.id === product.id);
      // Tăng số lượng nếu sản phẩm đã tồn tại
      // Nếu chưa có, thêm sản phẩm mới vào giỏ hàng
      if (existingProduct) {
        return {
          ...state,
          totalQuantity: state.totalQuantity + 1,
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1, left: item.left - 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          totalQuantity: state.totalQuantity + 1,
          cart: [
            ...state.cart,
            { ...product, quantity: 1, left: action.payload.left - 1 },
          ],
        };
      }
    }
    case "cart/delete": {
      const cart = state.cart.filter((item) => item.id !== action.payload.id);
      const deletedItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      return {
        ...state,
        cart,
        totalQuantity: state.totalQuantity - deletedItem.quantity,
      };
    }
    case "cart/payment": {
      return { cart: [], totalQuantity: 0 };
    }
    default: {
      return state;
    }
  }
};
