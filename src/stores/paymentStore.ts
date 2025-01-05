import { create } from 'zustand';

interface PaymentStore {
  method: string | null;
  setMethod: (method: string | null) => void;
  reset: () => void;
}

export const usePaymentStore = create<PaymentStore>((set) => ({
  method: null,
  setMethod: (method) => set({ method }),
  reset: () => set({ method: null })
}));
