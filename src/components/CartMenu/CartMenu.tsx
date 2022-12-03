import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ShouldRender from "@components/ShouldRender";
import useShoppingCartStore from "@state/shoppingCart/cart";
import autoAnimate from "@formkit/auto-animate";
import Lottie from "react-lottie";
import useIsCartMenuVisibleStore from "@state/shoppingCart/menu";
import useGetCartSum from "@hooks/cart/useGetCartSum";
import { BeatLoader } from "react-spinners";
import { getColors } from "@utils/getColors";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";

import * as S from "./styles";
import { LOTTIE_CONFIG } from "./_constants";

const gray300 = getColors("gray300");

const CartMenu: React.FC = () => {
  const { visible, setVisible, canShowCart } = useIsCartMenuVisibleStore();
  const { cart, removeCartItem, resetCart } = useShoppingCartStore();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const productsListRef = useRef(null);

  const totalQuantityOfItemsOnCart = useGetCartSum("quantity");
  const totalCartValue = useGetCartSum("value");

  const formattedTotalValue = useMemo(
    () =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(totalCartValue / 100),
    [totalCartValue]
  );

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

  useEffect(() => {
    productsListRef.current && autoAnimate(productsListRef.current);
  }, [productsListRef]);

  return (
    <S.Container isVisible={isMenuOpen}>
      <S.Content className="cartMenu__content">
        <S.CloseIcon onClick={closeMenu} size={30} color={gray300} />
        <S.Title>Carrinho de compras</S.Title>

        <ShouldRender if={!cart.length}>
          <S.NoItemsContainer>
            <Lottie
              options={LOTTIE_CONFIG}
              width="clamp(270px, 90%, 370px)"
              height="auto"
              style={{ marginTop: 40 }}
            />
            <S.NoItemsMessage>
              Nenhum item no seu carrinho no momento
            </S.NoItemsMessage>

            <S.NoItemsMessage>Explore a loja e volte aqui!</S.NoItemsMessage>
          </S.NoItemsContainer>
        </ShouldRender>

        <S.ProductsList ref={productsListRef}>
          {cart?.map((item) => (
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

        <ShouldRender if={!!cart.length}>
          <S.TotalContainer>
            <S.TotalTextContainer>
              <S.TotalQuantity>Quantidade</S.TotalQuantity>
              <S.TotalQuantity>{totalQuantityOfItemsOnCart}</S.TotalQuantity>
            </S.TotalTextContainer>

            <S.TotalTextContainer style={{ marginTop: 10 }}>
              <S.FullPriceLabel>Valor total</S.FullPriceLabel>
              <S.FullPrice>{formattedTotalValue}</S.FullPrice>
            </S.TotalTextContainer>
          </S.TotalContainer>

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
