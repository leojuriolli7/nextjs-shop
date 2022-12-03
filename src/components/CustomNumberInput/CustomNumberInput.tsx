import React, { useCallback } from "react";

import * as S from "./styles";

type Props = {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  min?: number;
  max?: number;
};

const CustomNumberInput: React.FC<Props> = ({
  value,
  setValue,
  min = 1,
  max = 10,
}) => {
  const onClickDecrement = useCallback(() => {
    setValue((prev) => prev - 1);
  }, [setValue]);

  const onClickIncrement = useCallback(() => {
    setValue((prev) => prev + 1);
  }, [setValue]);

  return (
    <S.Container>
      <S.Decrement onClick={onClickDecrement} disabled={value === min}>
        -
      </S.Decrement>
      <S.Center>
        <S.ValueText>{value}</S.ValueText>
      </S.Center>
      <S.Increment onClick={onClickIncrement} disabled={value === max}>
        +
      </S.Increment>
    </S.Container>
  );
};

export default CustomNumberInput;
