import React from "react";

export type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const AppButton = (props: Props) => {
  return <button {...props} className='App-btn' />;
};
export default AppButton;
