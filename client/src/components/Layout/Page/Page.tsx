import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import EmptyPage from "./EmptyPage/EmptyPage";
import {RootState, useAppDispatch} from "../../../store/store";
import PageApi from "../../../API/PageApi";
import {PageType} from "../../../config/types";
import {editPage, setCurrentPage} from "../../../store/slices/pageSlice";

import "./Page.scss"
import RowApi from "../../../API/RowApi";
import Row from "./Row/Row";
import {useSelector} from "react-redux";
import {useDebounce} from "../../../hooks/useDebounce";
import {ScrollContext} from "../../../context/context";

const Page = () => {
    const urlParams = useParams()
    const dispatch = useAppDispatch()

    const titleRef = useRef<HTMLInputElement>(null)
    const pageRef = useRef<HTMLInputElement>(null)
    const currentPage = useSelector((state: RootState) => state.pages.currentPage)

    const [page, setPage] = useState<PageType>({
        _id: "",
        object: "page",
        user: "",
        title: "",
        content: [],
        status: false,
        focus: {
            focusRow: "title"
        }
    })

    const [pageScrollPosition, setPageScrollPosition] = useContext(ScrollContext)

    const setTitleFocus = () => {
        if (titleRef.current) {
            titleRef.current.focus()
            setPage({...page, focus: {focusRow: "title"}})
            editPageById(page._id, {focus: {focusRow: "title"}})
        }
    }

    const getPageById = useCallback((id: string) => {
        PageApi.getPageById(id)
            .then(data => {
                if (data) {
                    setPage(data)
                    if (data._id !== currentPage._id) dispatch(setCurrentPage(data))
                }
            })
    }, [page])

    const editPageById = useDebounce((id: string, values: any) => {
        PageApi.editPageById(id, values)
            .then(data => {
                console.log(data)
            })
    }, 300)

    const createRow = useCallback((type: string, index: number, parentId: string) => {
        RowApi.createRow(type, index.toString(), parentId)
            .then(data => {
                    if (data) {
                        setPage({
                            ...page,
                            content: [
                                ...page.content.slice(0, index + 1),
                                data._id,
                                ...page.content.slice(index + 1)
                            ],
                            focus: {
                                focusRow: data._id
                            }
                        })
                        dispatch(editPage({
                                page: {
                                    ...page,
                                    content: [
                                        ...page.content.slice(0, index + 1),
                                        data._id,
                                        ...page.content.slice(index + 1)
                                    ],
                                    focus: {
                                        focusRow: data._id
                                    }
                                }
                            })
                        )
                    }
                }
            )
    }, [page])

    const deleteRow = useCallback((index: number) => {
        setPage({
            ...page,
            content: [
                ...page.content.slice(0, index),
                ...page.content.slice(index + 1)
            ],
            focus: {
                focusRow: page.content[index - 1]
            }
        })
        dispatch(editPage({
                page: {
                    ...page,
                    content: [
                        ...page.content.slice(0, index),
                        ...page.content.slice(index + 1)
                    ],
                    focus: {
                        focusRow: page.content[index - 1]
                    }
                }
            })
        )
        RowApi.deleteRowById(page.content[index])
            .then(data => {
                    console.log(data)
                }
            )
    }, [page, dispatch])

    const onTitleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (page._id !== "") {
            const {value} = event.target
            setPage({...page, title: value})

            dispatch(editPage({id: page._id, values: {title: value}}))
            editPageById(page._id, {title: value})
        }
    }, [page])

    const onTitleKeyDown = useCallback((event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === "Enter") {
            createRow("text", 0, page._id)
        } else if (event.key === "ArrowDown" && page.content.length) {
            onRowChangeFocus(0)
        }
    }, [page])

    const onRowKeyDown = useCallback((key: string, index: number, rowId: string, type: string = "text") => {
        switch (key) {
            case "Enter": {
                createRow(type, index, page._id)
            }
                break;
            case "Backspace": {
                deleteRow(index)
            }
                break;
            case "Delete": {
                deleteRow(index + 1)
            }
                break;
            case "ArrowUp": {
                if (index === 0) setTitleFocus()
                else onRowChangeFocus(index - 1)
            }
                break;
            case "ArrowDown": {
                if (index !== (page.content.length - 1)) onRowChangeFocus(index + 1)
            }
                break;

            default:
                break;
        }
    }, [page])

    const onRowChangeFocus = useCallback((index: number) => {
        setPage({...page, focus: {focusRow: page.content[index]}})
        editPageById(page._id, {focus: {focusRow: page.content[index]}})
    }, [page])

    const setScroll = useDebounce((scrollTop: number) => {
        console.log('scrollTop: ', scrollTop);
        if (scrollTop !== setPageScrollPosition) setPageScrollPosition(scrollTop)
    }, 300)

    const handleScroll = (event: any) => {
        setScroll(event.currentTarget.scrollTop);
    }

    useEffect(() => {
        // console.log(urlParams.pageId)
        if (urlParams.pageId) getPageById(urlParams.pageId)
    }, [urlParams.pageId])

    useEffect(() => {
        console.log(pageScrollPosition)
        if (pageRef.current && pageRef.current.scrollTop !== pageScrollPosition && pageScrollPosition === 0) {
            pageRef.current.scrollTo(0, 0)
        }
    }, [pageScrollPosition])

    return (
        <>
            <div ref={pageRef} className={"page__container"} onScroll={handleScroll}>
                <div className={"page__title"}>
                    <input
                        autoFocus={page.focus.focusRow === "title"}
                        placeholder={"Untitled"}
                        type={"text"}
                        value={page.title}
                        onChange={onTitleChange}
                        onKeyDown={onTitleKeyDown}
                        ref={titleRef}
                        onClick={setTitleFocus}
                    />
                </div>
                <div className={"page__content"}>
                    {
                        page.content.length ?
                            page.content.map((row, index) =>
                                <Row
                                    rowId={row}
                                    key={index}
                                    index={index}
                                    onRowKeyDown={onRowKeyDown}
                                    onChangeFocus={onRowChangeFocus}
                                    focus={page.focus.focusRow === row}/>
                            )
                            :
                            <EmptyPage/>
                    }
                </div>
            </div>
        </>
    )
}

export default Page