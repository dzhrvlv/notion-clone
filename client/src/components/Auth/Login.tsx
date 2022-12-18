import {useCallback, useMemo, useState} from "react";
import {UserDataLoginType} from "../../config/types";
import {login} from "../../store/actions/userActions";
import {useAppDispatch} from "../../store/store";
import {Link} from "react-router-dom";
import "./Form.scss"

const initialValues =  {
    login: '',
    password: ''
}

const Login = () => {
    const dispatch = useAppDispatch()

    const [form, setForm] = useState<UserDataLoginType>(initialValues)

    const changeHandler = useCallback((event: any) => {
        setForm({...form, [event.target.name]: event.target.value})
    }, [form])

    const submitHandler = useCallback((e: any) => {
        e.preventDefault()
        dispatch(login(form))
    }, [dispatch, form])

    return (
        <>
            <div className={"form__container"}>
                <form onSubmit={submitHandler} className={"form"}>
                    <label>
                        Логин:
                        <input type={"text"} name={"login"} onChange={changeHandler}/>
                    </label>
                    <label>
                        Пароль:
                        <input type={"text"} name={"password"} onChange={changeHandler}/>
                    </label>
                    <button type={"submit"}>Войти</button>
                    <Link to={"signup"}>Зарегистрироваться</Link>
                </form>
            </div>
        </>
    )
}

export default Login