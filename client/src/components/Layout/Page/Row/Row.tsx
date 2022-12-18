import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import RowApi from "../../../../API/RowApi";
import "./Row.scss"
import {useDebounce} from "../../../../hooks/useDebounce";

type PropsType = {
    rowId: string,
    index: number,
    onRowKeyDown: (
        key: string,
        index: number,
        rowId: string,
        type?: string
    ) => void,
    onChangeFocus: (
        index: number
    ) => void,
    focus: boolean
}

const Row = (props: PropsType) => {
    const {rowId, index, onRowKeyDown, onChangeFocus, focus} = props

    const inputRef = useRef<HTMLInputElement>(null)

    const urlParams = useParams()

    const [row, setRow] = useState({
        _id: "",
        object: "text",
        user: "",
        title: "",
        content: [],
        status: false
    })

    const setFocus = () => {
        if (inputRef.current) {
            inputRef.current.focus()
            onChangeFocus(index)
        }
    }

    const getRow = useCallback((id: string) => {
        RowApi.getRowById(id)
            .then(data => {
                if (data) setRow(data)
            })
    }, [row])

    const editRow = useDebounce((id: string, values: any) => {
        RowApi.editRowById(id, values)
            .then(data => {
                console.log(data)
            })
    }, 300)

    const onTextChange = useCallback((event: any) => {
        console.log(event.target.selectionStart)
        if (row._id !== "") {
            const {value} = event.target
            setRow({...row, title: value})
            editRow(row._id, {title: value})
        }
    }, [row])

    const onStatusChange = useCallback((event: any) => {
        if (row._id !== "") {
            const {checked} = event.target
            setRow({...row, status: checked})
            editRow(row._id, {status: checked})
        }
    }, [row])

    const addRow = useCallback(() => {
        if (row.title.length || row.object !== "text") onRowKeyDown("Enter", index, row._id)
    }, [row])

    const onKeyDown = useCallback(( event: React.KeyboardEvent<HTMLElement>) => {
        console.log(index, row._id)
        if (row._id !== "") {
            const {key} = event

            if (key == "Enter") {
                if (["/text", "/todo"].includes(row.title)) {
                    if (row.object === "text") {
                        if (row.title === "/text") {
                            setRow({...row, title: ""})
                            editRow(row._id, {title: ""})
                        }
                        else if (row.title === "/todo") {
                            setRow({...row, title: "", object: "todo"})
                            editRow(row._id, {title: "", object: "todo"})
                        }
                    } else {
                        setRow({...row, title: ""})
                        editRow(row._id, {title: ""})
                        onRowKeyDown(key, index, row._id, row.title.slice(1))
                    }
                } else {
                    if (row.object === "todo" && row.title.length === 0) {
                        setRow({...row, object: "text", status: false})
                        editRow(row._id, {object: "text", status: false})
                    } else onRowKeyDown(key, index, row._id)
                }
            } else if (key === "Backspace" && row.title.length === 0) {
                if (row.object === "todo") {
                    setRow({...row, object: "text", status: false})
                    editRow(row._id, {object: "text", status: false})
                }
                else onRowKeyDown(key, index, row._id)
            } else if (key === "Delete" && row.title.length === 0) {
                if (row.object === "todo") {
                    setRow({...row, object: "text", status: false})
                    editRow(row._id, {object: "text", status: false})
                }
                else onRowKeyDown(key, index, row._id)
            } else if (key === "ArrowUp" || key === "ArrowDown") {
                onRowKeyDown(key, index, row._id)
            }
        }
    }, [row])


    useEffect(() => {
        if (urlParams.pageId) {
            getRow(rowId)
        }

    }, [rowId, urlParams])

    useEffect(() => {
        if (row._id !== "" && focus && inputRef.current) inputRef.current.focus()
        console.log(row._id, focus)
    }, [focus])

    if (row.object === "todo") return (
        <div className={"row__container"}>
            <div className={"row__options"}>
                <button onClick={addRow}>+</button>
            </div>
            <span style={{opacity: 0.5}}>{index}</span>
            <input
                type={"checkbox"}
                className={"row__checkbox"}
                autoComplete={"off"}
                checked={row.status}
                onChange={onStatusChange}
            />
            <input
                type={"text"}
                className={"row__field"}
                autoComplete={"off"}
                value={row.title}
                onChange={onTextChange}
                onKeyDown={onKeyDown}
                placeholder={row.object}
                onClick={setFocus}
                ref={inputRef}
                autoFocus={focus}
            />

        </div>
    )

    return (
        <div className={"row__container"}>
            <div className={"row__options"}>
                <button onClick={addRow}>+</button>
            </div>
            <span style={{opacity: 0.5}}>{index}</span>
            <input
                type={"text"}
                className={"row__field"}
                autoComplete={"off"}
                value={row.title}
                onChange={onTextChange}
                onKeyDown={onKeyDown}
                ref={inputRef}
                autoFocus={focus}
                onClick={setFocus}
            />
        </div>
    )

}

export default Row