import React, {useEffect} from 'react';
import {Navigate} from "react-router-dom";

type PropsType = {
    isAuth: boolean,
    children: JSX.Element
}

const GuestRoute: React.FC<PropsType> = ({children, isAuth}) => {
    if (isAuth) {
        return <Navigate to='/'/>
    }
    return children;
};

export default GuestRoute;