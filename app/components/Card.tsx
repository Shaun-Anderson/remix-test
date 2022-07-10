import { ReactNode, FC } from "react";
interface CardProps {
  rounded?: "none" | "xs" | "sm" | "md" | "lg";
  elevation?: number;
  outlined?: boolean;
  className?: string;
}

const getElevationStyles = (elevation: number): string => {
  switch (elevation) {
    case 1:
      return "shadow-sm";
    case 2:
      return "shadow-md";
    case 3:
      return "shadow-lg";
    default:
      return "";
  }
};

export const Card = (props: React.PropsWithChildren<CardProps>) => {
  const { className, elevation, outlined } = props;
  return (
    <div
      className={`${className} bg-white ${
        elevation ? getElevationStyles(elevation) : ""
      }  rounded-${props.rounded} ${outlined && "border border-gray-300"}`}
    >
      {props.children}
    </div>
  );
};

Card.defaultProps = {
  rounded: "md",
  elevation: 0,
};
