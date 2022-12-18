import React, {useEffect, useState} from 'react';
import './App.scss';

import {Route, Routes, useNavigate, useParams,} from "react-router-dom";
import "./index.css";
import Layout from "./components/Layout/Layout";
import Page from "./components/Layout/Page/Page";
import GuestRoute from "./components/HOC/GuestRoute";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "./store/store";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import {auth} from "./store/actions/userActions";
import RequireAuth from "./components/HOC/RequireAuth";
import {useAuth} from "./hooks/useAuth";
import {ScrollContext} from "./context/context"

function App() {
    const dispatch = useAppDispatch();
    const urlParams = useParams()
    const navigate = useNavigate()

    const {isAuth} = useAuth()
    const userLoading = useSelector((state: RootState) => state.user.isLoading);
    const currentPage = useSelector((state: RootState) => state.pages.currentPage)

    const [pageScrollPosition, setPageScrollPosition] = useState(0)

    useEffect(() => {
        dispatch(auth());
    }, [dispatch])

    useEffect(() => {
        const curPage = localStorage.getItem("page")
        const goToCurPage = () => navigate(`/${curPage}`)

        if (isAuth && curPage !== null && urlParams.pageId !== curPage) goToCurPage()
    }, [isAuth, urlParams.pageId, navigate])

    return (
        <>
            {(!userLoading) &&
                <Routes>
                    <Route path='/auth'>
                        <Route index element={
                            <GuestRoute isAuth={isAuth}>
                                <Login/>
                            </GuestRoute>
                        }/>
                        <Route path='signup' element={<Signup/>}/>
                    </Route>

                    <Route path="/" element={
                        <RequireAuth isAuth={isAuth}>
                            <ScrollContext.Provider value={[pageScrollPosition, setPageScrollPosition]}>
                                <Layout/>
                            </ScrollContext.Provider>
                        </RequireAuth>}>
                        <Route path="/:pageId" element={<Page/>}/>
                    </Route>
                </Routes>
            }
        </>
    );
}

export default App;
