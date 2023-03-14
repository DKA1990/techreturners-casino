import React from "react";

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {};

const AppButton = (props: Props) => {
  return <button {...props}>Hit</button>;
};
export default AppButton;
