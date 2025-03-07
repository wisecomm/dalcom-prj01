import { create } from "zustand";

type CounterStore = {
    count: number;
};

interface Actions {
  actions: {
    increase: () => void
    increaseAsync: () => void
    decrease: () => void
    resetState: () => void
}
};

const initialState = { // initialState 추가
  count: 0,
};

export const useCounterStore = create<CounterStore & Actions>((set) => ({
    ...initialState,
    actions: {
        increase: () => {
            set((state) => ({ count: state.count + 1 }));
        },
        increaseAsync: async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            set((state) => ({ count: state.count + 1 }));
        },
        decrease: () => {
            set((state) => ({ count: state.count - 1 }));
        },
        resetState: () => {
            set({ ...initialState });
        },
    }
}));
