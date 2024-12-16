export type BaseFormProps<T> = {
  onSubmit: (data: T) => void;
  isLoading: boolean;
};