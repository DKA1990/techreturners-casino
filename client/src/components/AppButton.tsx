import React from "react";

export type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { disabled?: boolean };

const AppButton = (props: Props) => {
  return <button {...props} />;
};
export default AppButton;
