import create from "zustand";

type Store = {
  visible: boolean;
  canShowCart: boolean;
  setVisible: (value: boolean) => void;
  setCanShowCart: (value: boolean) => void;
};

const useIsCartMenuVisible = create<Store>((set) => ({
  visible: false,
  canShowCart: false,
  setVisible: (value: boolean) => set(() => ({ visible: value })),
  setCanShowCart: (value: boolean) => set(() => ({ canShowCart: value })),
}));

export default useIsCartMenuVisible;
