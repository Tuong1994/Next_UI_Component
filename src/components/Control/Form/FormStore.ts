import { create, StateCreator } from "zustand";

export type FormMethods = {
  resetForm: () => void;
  watchField: (...args: any) => any;
  handleSubmit: (...args: any) => void;
};

interface FormState {
  form: FormMethods | null;
  setForm: (method: FormMethods) => void;
}

const store: StateCreator<FormState> = (set) => ({
  form: null,
  setForm: (method) => set((state) => ({ ...state, form: { ...state.form, ...method } })),
});

const useFormStore = create(store);

export default useFormStore;
