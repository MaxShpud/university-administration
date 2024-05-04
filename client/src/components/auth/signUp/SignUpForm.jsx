import React, { useContext, useState, useEffect } from "react"
import './SignUpForm.css'
import { UserContext } from "../../../context/UserContext.jsx"
import ErrorMessage from "../ErrorMessage"
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const SighUp = ({theme, setTheme}) => {
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")


    const submitRegistration = async () => {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name: name, surname: surname, email: email, password: password})
        }

        const response = await fetch("/api/user/create", requestOptions)
        const data = await response.json()
        
        if(!response.ok) {
            setErrorMessage(data.detail)
        } else {
            
            console.log('WD');
            navigate('/', {replace: true})
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (password.length >= 5) {
            submitRegistration()
        } else {
            setErrorMessage("Ensure that the password greater than 5 characters")
        }
    }
    
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        console.log('Current location is ', location)
    }, [location])
    return (
        <div className={`column ${theme}`}>
            <form className="box" onSubmit={handleSubmit}>
                <h1 className="title has-text-centered">Регистрация</h1>
                <div className="field">
                    <label className="label">Имя</label>
                    <div className="control">
                        <input type="text" 
                        placeholder="Введите имя" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        className="input"
                        required/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Фамилия</label>
                    <div className="control">
                        <input type="text" 
                        placeholder="Введите фамилию" 
                        value={surname} 
                        onChange={(e) => setSurname(e.target.value)}
                        className="input"
                        required/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input type="email" 
                        placeholder="Введите email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        className="input"
                        required/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Пароль</label>
                    <div className="control">
                        <input type="password" 
                        placeholder="Введите пароль" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        className="input"
                        required/>
                    </div>
                </div>
                <ErrorMessage message={errorMessage} />
                <br/>
                <button className="button is-primary" type="submit">Зарегистрироваться</button>
                <hr />
                <Outlet />
            </form>
        </div>
    )
}

export default SighUp