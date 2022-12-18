import React from "react";
import {Outlet} from "react-router-dom"
import Sidebar from "./Sidebar/Sidebar";
import "./Layout.scss"
import Header from "./Header/Header";
import { ScrollContext } from "../../context/context";


const Layout = () => {

    return <ScrollContext.Consumer>{value => (
        <div className={"layout"}>
            <Sidebar/>
            <div className={"layout__main"}>
                <Header/>
                <Outlet/>
            </div>
        </div>
    )}</ScrollContext.Consumer>
}

export default Layout