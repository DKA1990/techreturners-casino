import React from 'react';
import { useFetchData } from "../hooks/useFetchData";
import AppButton from './AppButton';

export const HitGameControl : React.FC = () => {
    const { isFetching, error, status, execute } = useFetchData("http://localhost:8080/hit");

    const handleClick = () => {
      execute();
    };

    return (
        <AppButton onClick={handleClick} disabled={isFetching}>Hit</AppButton>
    )
}