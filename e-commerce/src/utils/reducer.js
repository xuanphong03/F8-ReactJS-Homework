import { StorageKeys } from "~/constants/storage-key";

export const reducer = (state, action) => {
  switch (action.type) {
    case "cart/add": {
      const product = action.payload;
      const existingProduct = state.items.find(
        (item) => item.id === product.id
      );
      if (existingProduct) {
        const cart = {
          ...state,
          totalQuantity: state.totalQuantity + 1,
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1, left: item.left - 1 }
              : item
          ),
        };
        localStorage.setItem(StorageKeys.CART, JSON.stringify(cart));
        return cart;
      } else {
        const cart = {
          ...state,
          totalQuantity: state.totalQuantity + 1,
          items: [
            ...state.items,
            { ...product, quantity: 1, left: action.payload.left - 1 },
          ],
        };
        localStorage.setItem(StorageKeys.CART, JSON.stringify(cart));
        return cart;
      }
    }
    case "cart/delete": {
      const newItems = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      const deletedItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      const newCart = {
        ...state,
        items: newItems,
        totalQuantity: state.totalQuantity - deletedItem.quantity,
      };
      localStorage.setItem(StorageKeys.CART, JSON.stringify(newCart));
      return newCart;
    }
    case "cart/payment": {
      localStorage.removeItem(StorageKeys.CART);
      return { items: [], totalQuantity: 0 };
    }
    default: {
      return state;
    }
  }
};
