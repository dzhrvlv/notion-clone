import {useCallback, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../store/store";
import {getAllUserPagesThunk} from "../../../store/actions/pageActions";
import {PageType} from "../../../config/types";
import PageApi from "../../../API/PageApi";
import {addPage, removeCurrentPage, removePage} from "../../../store/slices/pageSlice";
import "./Sidebar.scss"
import {logoutCurrentUser} from "../../../store/slices/userSlice";

const Sidebar = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const urlParams = useParams()

    const user = useSelector((state: RootState) => state.user.user)
    const pages = useSelector((state: RootState) => state.pages.pages)

    const [isPopoverVisible, setIsPopoverVisible] = useState(false)

    const addHandler = useCallback(() => {
        PageApi.createPage()
            .then((data: any) => {
                if (data) {
                    dispatch(addPage(data))
                    navigate(`/${data._id}`)
                    localStorage.setItem('page', data._id)
                }
            })
    }, [pages, dispatch])

    const removeHandler = useCallback((e: any, id: string) => {
        e.stopPropagation()
        dispatch(removePage({id}))
        if (urlParams.pageId === id) {
            navigate(`/`)
            localStorage.removeItem('page')
        }

        PageApi.deletePageById(id)
            .then((data: any) => {
                if (data) {
                    console.log(data)
                }
            })
    }, [pages, dispatch])

    function navigateHandler(id: string) {
        if (urlParams.pageId !== id) {
            navigate(`/${id}`)
            localStorage.setItem('page', id)
        }
    }

    const onHeaderClick = useCallback(() => {
        setIsPopoverVisible(!isPopoverVisible)
    }, [isPopoverVisible])

    const logoutHandler = useCallback(() => {
        dispatch(logoutCurrentUser())
        dispatch(removeCurrentPage())
    }, [dispatch])

    useEffect(() => {
        dispatch(getAllUserPagesThunk())
    }, [dispatch])

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div className={"sidebar__user"} onClick={onHeaderClick}>
                    <div className="user__icon">
                        Д
                    </div>
                    <div className="user__name">{user.login}</div>
                </div>
                {isPopoverVisible &&
                    <div className={"header__popover"}>
                        <ul>
                            <li onClick={logoutHandler}>Log out</li>
                        </ul>
                    </div>
                }
            </div>
            {/*<ul className="sidebar__options">*/}
            {/*    <li className="sidebar__row">*/}
            {/*        Search*/}
            {/*    </li>*/}
            {/*    <li className="sidebar__row">*/}
            {/*        Updates*/}
            {/*    </li>*/}
            {/*    <li className="sidebar__row">Settings & members</li>*/}
            {/*</ul>*/}
            <div className="notelist">
                <ul>
                    {Array.isArray(pages) ?
                        pages.map((page: PageType, index: number) =>
                            <li className="sidebar__row" onClick={() => navigateHandler(page._id)} key={index}>
                                <span>{page.title ? page.title : "Untitled"}</span>
                                <div className="row__delete" onClick={(e) => removeHandler(e, page._id)}>&times;</div>
                            </li>
                        )
                        : null}
                    <li className="sidebar__row" onClick={addHandler}>
                        <div className="notelist__add">
                            <div className="add__icon">+</div>
                            <div className="add__text">Add a page</div>
                        </div>
                    </li>
                </ul>
            </div>
            {/*<ul>*/}
            {/*    <li className="sidebar__row">Templates</li>*/}
            {/*    <li className="sidebar__row">Import</li>*/}
            {/*    <li className="sidebar__row">Trash</li>*/}
            {/*</ul>*/}
        </div>
    )
}

export default Sidebar