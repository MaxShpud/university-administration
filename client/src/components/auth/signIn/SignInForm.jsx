import React, { useState, useContext, useEffect } from "react"

import ErrorMessage from "../ErrorMessage.jsx"
import { UserContext } from "../../../context/UserContext"
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import './SignInForm.css'
import {Paper,
    TextInput,
    PasswordInput,
    Checkbox,
    Button,
    Title,
    Text,
    Anchor,
    CloseButton
} from '@mantine/core';
import { IconAt } from '@tabler/icons-react';
import classes from './AuthenticationImage.module.css';

const SignIn = ({theme, setTheme}) => {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [, setUserData] = useContext(UserContext)
  const location = useLocation()
  const navigate = useNavigate()


  const submitLogin = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: JSON.stringify(
        `grant_type=&username=${login}&password=${password}&scope=&client_id=&client_secret=`
      ),
    };

    const response = await fetch("/api/login/token", requestOptions);
    const data = await response.json();
    if (!response.ok) {
      setErrorMessage(data.detail)
    } else {
      setUserData({ token: data.access_token, userRole: data.role})

      navigate('/home', {replace: true})
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    submitLogin()
  };


  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Авторизация
        </Title>

        <TextInput label="Логин" 
        placeholder="Введите ваш логин" size="md" 
        value={login}
        onChange={(event) => setLogin(event.currentTarget.value)}
        rightSectionPointerEvents="all"
        mt="md"
        rightSection={
            <CloseButton
              onClick={() => setLogin('')}
              style={{ display: login ? undefined : 'none' }}
            />
          }
        />
        <PasswordInput label="Пароль" placeholder="Введите ваш пароль" mt="md" size="md" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />

        <Button fullWidth mt="xl" size="md" variant="gradient"
         gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
           type="submit"
           onClick={handleSubmit}>
          Авторизоваться
        </Button>

        <Text ta="center" mt="md">
            Нет аккаунта?{' '}
            <Anchor fw={700} onClick={() => navigate('register', {replace: false})}>
                Зарегистрироваться
            </Anchor>
            </Text>

      </Paper>
    </div>
    );
};
    
    // <div className={`mainContainer ${theme}`}>
    //   <div className="titleContainer">
    //     <h1>Авторизация</h1>
    //   </div>
      
    //   <form className="box" onSubmit={handleSubmit}>
    //     <div className="field">
    //       <div className="control">
    //       <Input
    //         placeholder="Clearable input"
    //         value={value}
    //         onChange={(event) => setValue(event.currentTarget.value)}
    //         rightSectionPointerEvents="all"
    //         mt="md"
    //         rightSection={
    //         <CloseButton
    //             aria-label="Clear input"
    //             onClick={() => setValue('')}
    //             style={{ display: value ? undefined : 'none' }}
    //         />
    //     }
    //     />
    //         {/* <input
    //           type="email"
    //           placeholder="Введите email"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //           className="input"
    //           required
    //         /> */}
    //       </div>
    //     </div>
    //     <div className="field">
    //       <div className="control">
    //         <input
    //           type="password"
    //           placeholder="Введите пароль"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           className="input"
    //           required
    //         />
    //       </div>
    //     </div>
    //     <ErrorMessage message={errorMessage} />
    //     <br />
    //     {/* <button className="button is-primary" type="submit">
    //       Log in
    //     </button> */}
    //     <Button
    //       variant="gradient"
    //       gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
    //       type="submit"
    //     >
    //       Авторизоваться
    //     </Button>
    //   </form>
      
    //   <p className="has-text-centered">
    //     Нет аккаунта? <button onClick={() => navigate('register', {replace: false})}>Зарегистрируйтесь здесь</button>
    //   </p>
    //   <Outlet />
    // </div>

export default SignIn;
