import create from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  price: string;
  quantity: number;
  name: string;
  value: string;
  imageUrl: string;
};

type Store = {
  cart: CartItem[];
  setCartItem: (value: CartItem) => void;
  removeCartItem: (value: string) => void;
  resetCart: () => void;
};

const useShoppingCartStore = create(
  persist<Store>(
    (set) => ({
      cart: [],
      setCartItem: (value: CartItem) =>
        set((state) => {
          // Check if the item is already on the cart
          const itemAlreadyOnCart = state.cart.find(
            (item) => item.price === value.price
          );

          if (itemAlreadyOnCart) {
            const previousQuantity = itemAlreadyOnCart.quantity;
            itemAlreadyOnCart.quantity = previousQuantity + value.quantity;

            const filteredCart = state.cart.filter(
              (item) => item.price !== itemAlreadyOnCart.price
            );

            return { cart: [...filteredCart, itemAlreadyOnCart] };
          }

          return { cart: [...state.cart, value] };
        }),
      removeCartItem: (value) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.price !== value),
        })),
      resetCart: () => set(() => ({ cart: [] })),
    }),
    {
      name: "shopping-cart",
    }
  )
);

export default useShoppingCartStore;
