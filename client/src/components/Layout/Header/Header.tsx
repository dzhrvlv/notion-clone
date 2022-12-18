import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../store/store";
import "./Header.scss"
import {useCallback, useContext, useEffect, useState} from "react";
import PageApi from "../../../API/PageApi";
import {editPage} from "../../../store/slices/pageSlice";
import {editPageThunk} from "../../../store/actions/pageActions";
import {ScrollContext} from "../../../context/context";

const Header = () => {
    const currentPage = useSelector((state: RootState) => state.pages.currentPage)
    const dispatch = useAppDispatch()
    const [title, setTitle] = useState("")
    const [isPopoverVisible, setIsPopoverVisible] = useState(false)
    const [pageScrollPosition, setPageScrollPosition] = useContext(ScrollContext)

    const onTitleClick = useCallback(() => {
        if (pageScrollPosition === 0) {
            setIsPopoverVisible(!isPopoverVisible)
        }
        else {
            setIsPopoverVisible(false)
            setPageScrollPosition(0)
        }
    }, [isPopoverVisible, pageScrollPosition])

    const onTitleChange = useCallback((event: any) => {
        const {value} = event.target
        setTitle(value)
        //dispatch(editPageThunk({id: currentPage._id, values: {title: value}}))


        PageApi.editPageById(currentPage._id, {title: value})
            .then(data => {
                if (data) {
                    dispatch(editPage({page: data}))
                }
            })
    }, [title])

    useEffect(() => {
        if (currentPage.title !== title) setTitle(currentPage.title)
    }, [currentPage])

    return (
        <div className={"header__container"}>
            <div className={"header__title"}>
                <div className={"title__container"}>
                    <div className={"title__text"} onClick={onTitleClick}>
                        {title || "Untitled"}
                    </div>
                    {isPopoverVisible &&
                        <div className={"title__popover"}>
                            <input
                                className={"title__field"}
                                type="text"
                                value={title}
                                autoComplete="off"
                                onChange={onTitleChange}
                            />
                        </div>
                    }
                </div>

            </div>
        </div>
    )
}

export default Header