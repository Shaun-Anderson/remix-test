import { ReactNode, FC } from "react";
interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  leading?: ReactNode;
  rl?: "none" | "xs" | "sm" | "md" | "lg";
  rr?: "none" | "xs" | "sm" | "md" | "lg";
  variant?: "base" | "outlined" | "light";
}

export const Button = (props: React.PropsWithChildren<ButtonProps>) => {
  const borderProps = (): string =>
    props.variant == "outlined"
      ? "bg-transparent border border-gray-300"
      : "border border-gray-300";
  const roundedProps = (): string =>
    `rounded-l-${props.rl} rounded-r-${props.rr}`;
  return (
    <button
      className={`-ml-px relative inline-flex items-center space-x-2 px-4 py-2 ${borderProps()} text-sm font-medium ${roundedProps()} text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`}
    >
      {props.leading}
      <span>{props.children}</span>
    </button>
  );
};

Button.defaultProps = {
  rl: "none",
  rr: "none",
  variant: "base",
};
