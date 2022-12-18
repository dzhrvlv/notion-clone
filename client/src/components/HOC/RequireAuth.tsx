import React, {useEffect} from 'react';
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

type PropsType = {
    isAuth: boolean,
    children: JSX.Element
}

const RequireAuth: React.FC<PropsType> = ({children, isAuth}) => {
    if (!isAuth) {
        return <Navigate to='/auth'/>
    }

     return children;
};

export default RequireAuth;