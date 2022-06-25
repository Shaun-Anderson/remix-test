import { BriefcaseIcon, PlusCircleIcon } from "@heroicons/react/solid";
import { ReactNode } from "react";
interface InputProps extends React.HTMLProps<HTMLInputElement> {
  leadingIcon?: ReactNode;
  trailing?: ReactNode;
  rounded?: "xs" | "sm" | "md" | "lg";
}
export const Input = ({
  rounded,
  value,
  onChange,
  leadingIcon,
  placeholder,
  trailing,
}: InputProps) => {
  console.log(rounded);
  return (
    <>
      <div className="relative flex focus-within:z-10">
        {leadingIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {leadingIcon}
          </div>
        )}
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={` border grow border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 block rounded-${rounded} ${
            leadingIcon ? "pl-8 pr-4" : "px-4"
          } text-sm`}
        />
        {trailing && trailing}
      </div>
    </>
  );
};

Input.defaultProps = {
  rounded: "md",
};
