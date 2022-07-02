import { Switch } from "@headlessui/react";
import { UseControllerProps, useController } from "react-hook-form";

interface FormSwitchProps<T> extends UseControllerProps<T> {
  size: "small" | "large";
  disabled?: boolean;
}
export const FormSwitch = (props: FormSwitchProps<T>) => {
  const {
    field: { onChange, onBlur, name, value, ref },
  } = useController(props);

  const switchSize = props.size === "large" ? "h-6 w-11" : "h-5 w-10";
  const controlSize = props.size === "large" ? "h-4 w-4" : "h-3 w-3";
  return (
    <Switch
      name={name}
      disabled={props.disabled}
      onBlur={onBlur}
      onChange={onChange}
      checked={value}
      ref={ref}
      className={`${
        value ? "bg-indigo-600" : "bg-gray-200"
      } relative inline-flex ${switchSize} items-center rounded-full disabled:bg-gray-100 disabled:border disabled:border-gray-200`}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`transform transition ease-in-out duration-200 ${
          value ? "translate-x-6" : "translate-x-1"
        } inline-block ${controlSize} transform rounded-full bg-white`}
      />
    </Switch>
  );
};
