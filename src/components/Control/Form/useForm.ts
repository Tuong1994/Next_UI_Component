import useFormStore from "./FormStore";

const useForm = () => {
  const form = useFormStore((state) => state.form);
  return form;
};

export default useForm;
