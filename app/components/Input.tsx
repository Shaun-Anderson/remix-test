import { BriefcaseIcon, PlusCircleIcon } from "@heroicons/react/solid";
import { ReactNode } from "react";
interface InputProps extends React.HTMLProps<HTMLInputElement> {
  leadingIcon?: ReactNode;
  trailing?: ReactNode;
  rounded?: "xs" | "sm" | "md" | "lg";
}
export const Input = ({
  rounded,
  className,
  value,
  name,
  disabled,
  onChange,
  leadingIcon,
  placeholder,
  trailing,
  label,
}: InputProps) => {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className={`relative flex focus-within:z-10 ${label && "mt-1"}`}>
        {leadingIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {leadingIcon}
          </div>
        )}
        <input
          name={name}
          disabled={disabled}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`h-8 border grow border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 block rounded-${rounded} ${
            leadingIcon ? "pl-8 pr-4" : "px-4"
          } text-sm w-full disabled:text-gray-100 disabled:bg-gray-50`}
        />
        {trailing && trailing}
      </div>
    </div>
  );
};

Input.defaultProps = {
  rounded: "md",
};
