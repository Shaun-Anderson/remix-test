import { ReactNode, FC } from "react";
interface CardProps {
  rounded?: "none" | "xs" | "sm" | "md" | "lg";
  elevation?: number;
  outlined?: boolean;
}

export const Card = (props: React.PropsWithChildren<CardProps>) => {
  return (
    <div
      className={`bg-white py-8 px-4 shadow rounded-${props.rounded} sm:px-10 ${
        props.outlined && "border border-gray-300"
      }`}
    >
      {props.children}
    </div>
  );
};

Card.defaultProps = {
  rounded: "md",
};
