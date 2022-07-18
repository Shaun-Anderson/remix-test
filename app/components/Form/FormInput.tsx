import { BriefcaseIcon, PlusCircleIcon } from "@heroicons/react/solid";
import { ReactNode } from "react";
import { useController, UseControllerProps } from "react-hook-form";
interface InputProps<T>
  extends Omit<React.HTMLProps<HTMLInputElement>, "defaultValue" | "name"> {
  leadingIcon?: ReactNode;
  trailing?: ReactNode;
  rounded?: "xs" | "sm" | "md" | "lg";
}
interface FormInputProps<T> extends InputProps<T>, UseControllerProps<T> {}
export const FormInput = (props: FormInputProps<T>) => {
  const {
    field: { onChange, onBlur, name, value, ref },
  } = useController(props);
  return (
    <div className={props.className}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {props.label}
      </label>
      <div
        className={`relative flex focus-within:z-10 ${props.label && "mt-1"}`}
      >
        {props.leadingIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {props.leadingIcon}
          </div>
        )}
        <input
          ref={ref}
          type={props.type}
          hidden={props.hidden}
          readOnly={props.readOnly}
          name={name}
          disabled={props.disabled}
          value={value}
          onChange={onChange}
          placeholder={props.placeholder}
          className={`h-10 border grow border-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500  rounded-${
            props.rounded
          } ${
            props.leadingIcon ? "pl-8 pr-4" : "px-3"
          } text-sm w-full disabled:text-gray-100 disabled:bg-gray-50`}
        />
        {props.trailing && props.trailing}
      </div>
    </div>
  );
};

FormInput.defaultProps = {
  rounded: "md",
};
