import {useCallback, useMemo, useState} from "react";
import {UserDataLoginType} from "../../config/types";
import {signup} from "../../store/actions/userActions";
import {useAppDispatch} from "../../store/store";
import {Link} from "react-router-dom";
import "./Form.scss"

const initialValues =  {
    login: '',
    password: ''
}

const Signup = () => {
    const dispatch = useAppDispatch()

    const [form, setForm] = useState<UserDataLoginType>(initialValues)

    const changeHandler = useCallback((event: any) => {
        setForm({...form, [event.target.name]: event.target.value})
    }, [form])

    const submitHandler = useCallback((e: any) => {
        console.log(typeof e)
        e.preventDefault()

        dispatch(signup(form))
        setForm(initialValues)
    }, [dispatch, form])

    return (
        <>
            <div className={"form__container"}>
                <form onSubmit={submitHandler} className={"form"}>
                    <label>
                        Логин:
                        <input type={"text"} name={"login"} value={form.login} onChange={changeHandler}/>
                    </label>
                    <label>
                        Пароль:
                        <input type={"text"} name={"password"} value={form.password} onChange={changeHandler}/>
                    </label>
                    <button type={"submit"}>Зарегистрироваться</button>
                    <Link to={"/"}>Есть аккаунт</Link>
                </form>
            </div>
        </>
    )
}

export default Signup