import React from "react";
import { useFetchData } from "../hooks/useFetchData";
import AppButton from "./AppButton";

const StandControl: React.FC = () => {
  const { isFetching, error, status, execute } = useFetchData("http://localhost:8080/stand");

  const handleClick = () => {
    execute();
  };

  return (
    <div>
      <AppButton onClick={handleClick}>Stand</AppButton>
    </div>
  );
};
export default StandControl;
