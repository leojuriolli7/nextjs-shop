import { useMemo } from "react";
import useShoppingCartStore from "@state/shoppingCart/cart";
import { convertCurrencyToNumber } from "@utils/convertCurrencyToNumber";

const useGetCartSum = (key: "quantity" | "value") => {
  const { cart } = useShoppingCartStore();
  const isValueSum = key === "value";

  const sumOfValueOrQuantity = useMemo(
    () =>
      cart.reduce(
        (acc, current) =>
          acc +
          (isValueSum
            ? convertCurrencyToNumber(current[key]) * current.quantity
            : current[key] || 0),
        0
      ),

    [cart, key]
  );

  return sumOfValueOrQuantity;
};

export default useGetCartSum;
