import React, { useCallback, useMemo, useState } from "react";
import ShouldRender from "@components/ShouldRender";
import useShoppingCartStore from "@state/shoppingCart/cart";
import useIsCartMenuVisible from "@state/shoppingCart/menu";
import { BeatLoader } from "react-spinners";
import { getColors } from "@utils/getColors";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";

import * as S from "./styles";

const gray300 = getColors("gray300");

const CartMenu: React.FC = () => {
  const { visible, setVisible, canShowCart } = useIsCartMenuVisible();
  const { cart, removeCartItem, resetCart } = useShoppingCartStore();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const isMenuOpen = useMemo(() => {
    if (visible) return "open";

    if (!visible && canShowCart) return "closed";

    return undefined;
  }, [visible, canShowCart]);

  const closeMenu = useCallback(() => setVisible(false), []);

  const onClickRemoveFromCart = useCallback(
    (itemId: string) => () => removeCartItem(itemId),
    []
  );

  const onClickBuyProducts = useCallback(async () => {
    const filteredCartToSendToStripe = cart.map((item) => ({
      price: item.price,
      quantity: item.quantity,
    }));

    try {
      setIsRedirecting(true);

      const response = await axios.post("/api/checkout", {
        cart: filteredCartToSendToStripe,
      });

      const { checkoutUrl } = response.data;
      window.location.href = checkoutUrl;
      setVisible(false);
      resetCart();
    } catch (err) {
      toast.error("Falha ao redirecionar ao checkout");
      setIsRedirecting(false);
    }
  }, [cart]);

  return (
    <S.Container isVisible={isMenuOpen}>
      <S.Content className="cartMenu__content">
        <S.CloseIcon onClick={closeMenu} size={30} color={gray300} />
        <S.Title>Sacola de compras</S.Title>

        <ShouldRender if={!cart.length}>
          <S.NoItemsMessage>Nenhum item na sua sacola</S.NoItemsMessage>
        </ShouldRender>

        <ShouldRender if={!!cart.length}>
          <S.ProductsList>
            {cart.map((item) => (
              <S.Product key={item.price}>
                <S.ImageContainer>
                  <Image
                    src={item?.imageUrl}
                    alt={item.name}
                    width={90}
                    height={90}
                  />
                </S.ImageContainer>

                <S.TextSection>
                  <S.Name>{item?.name}</S.Name>

                  <S.Price>
                    {item?.value} <S.Quantity>x {item?.quantity}</S.Quantity>
                  </S.Price>

                  <S.Remove onClick={onClickRemoveFromCart(item.price)}>
                    Remover
                  </S.Remove>
                </S.TextSection>
              </S.Product>
            ))}
          </S.ProductsList>

          <S.BuyButton disabled={isRedirecting} onClick={onClickBuyProducts}>
            <ShouldRender if={!isRedirecting}>Comprar agora</ShouldRender>

            <ShouldRender if={isRedirecting}>
              <BeatLoader size={10} color={gray300} />
            </ShouldRender>
          </S.BuyButton>
        </ShouldRender>
      </S.Content>
    </S.Container>
  );
};

export default CartMenu;
