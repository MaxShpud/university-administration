import React, { useContext, useState, useEffect } from "react"
import './SignUpForm.css'
import { UserContext } from "../../../context/UserContext.jsx"
import ErrorMessage from "../ErrorMessage.jsx"
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import {Paper,
    TextInput,
    PasswordInput,
    Checkbox,
    Button,
    Title,
    Text,
    Anchor,
    CloseButton, 
    Box, 
    Group,
    Notification,
     rem,
     LoadingOverlay,
    Select
} from '@mantine/core';
import classes from '../signIn/AuthenticationImage.module.css';
import { useForm } from '@mantine/form';
import { IconX, IconCheck } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

const SighUp = ({theme, setTheme}) => {
    const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
    const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;
    const [visible, { toggle }] = useDisclosure(false);
    const navigate = useNavigate();

    const [surname, setSurname] = useState("")
    const [name, setName] = useState("")
    const [patronymic, setPatronymic] = useState("")
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [role, setRole] = useState("")
    const ROLES = [
        { label: "Декан", value: "DEAN" },
        { label: "Ректор", value: "RECTOR" },
        { label: "Заведующий кафедрой", value: "HEAD_OF_THE_DEPARTMENT" }
      ];

    const passwordsMatch = () => {
        return password === confirmPassword;
    };
    const containsOnlyLatinLetters = (input) => {
        return /^[a-zA-Z]*$/.test(input);
      };
    const containsOnlyLatinCharacters = (input) => {
        return /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/.test(input);
      };

    const submitRegistration = async () => {
        try {
            if (!containsOnlyLatinLetters(login)) {
                setErrorMessage('Логин должен содержать только латинские буквы');
                setTimeout(() => setErrorMessage(''), 5000);
                return;
            }
            if (!containsOnlyLatinCharacters(password)) {
                setErrorMessage('Пароль должен содержать только латинские символы');
                setTimeout(() => setErrorMessage(''), 5000);
                return;
              }
            if (!containsOnlyLatinCharacters(confirmPassword)) {
                setErrorMessage('Повтор пароля должен содержать только латинские символы');
                setTimeout(() => setErrorMessage(''), 5000);
                return;
              }
            if (!passwordsMatch()) {
                setErrorMessage('Пароли не совпадают');
                setTimeout(() => setErrorMessage(''), 5000);
                return;
            }
            
            console.log("ПАРОЛЬ", password)
            const requestOptions = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    name: name, 
                    surname: surname, 
                    login: login,
                    password: password,
                    patronymic: patronymic,
                    role: role
                })
            };
    
            const response = await fetch("/api/user/create", requestOptions);
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.detail);
                
            } else{
                setSuccessMessage("Пользователь зарегистрирован")
                setTimeout(() => {
                    setSuccessMessage('');
                    navigate("/");
                }, 2000);
            }

        } catch (error) {
            setErrorMessage(error.message);
            setTimeout(() => setErrorMessage(''), 5000);
            return;
        }
    }
    return (
        <Paper className={classes.form} radius={0} p={30}>
            <Box maw={340} mx="auto">
                <LoadingOverlay visible={visible} loaderProps={{ children: 'Loading...' }} />
                <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
                Регистрация
                </Title>
                <TextInput label="Фамилия" 
                placeholder="Введите фамилию" size="md" 
                value={surname}
                onChange={(event) => setSurname(event.currentTarget.value)}
                rightSectionPointerEvents="all"
                mt="md"
                rightSection={
                    <CloseButton
                    onClick={() => {setSurname('')}}
                    style={{ display: surname ? undefined : 'none'  }}
                    />
                }
                required
                />
                <TextInput label="Имя" 
                placeholder="Введите имя" size="md" 
                value={name}
                onChange={(event) => setName(event.currentTarget.value)}
                rightSectionPointerEvents="all"
                mt="md"
                rightSection={
                    <CloseButton
                    onClick={() => {setName('')}}
                    style={{ display: name ? undefined : 'none'  }}
                    />
                }
                required
                />
                <TextInput label="Отчество" 
                placeholder="Введите отчество" size="md" 
                value={patronymic}
                onChange={(event) => setPatronymic(event.currentTarget.value)}
                rightSectionPointerEvents="all"
                mt="md"
                rightSection={
                    <CloseButton
                    onClick={() => {setPatronymic('')}}
                    style={{ display: patronymic ? undefined : 'none'  }}
                    />
                }
                />
                <TextInput label="Логин" 
                placeholder="Введите логин" size="md" 
                value={login}
                onChange={(event) => setLogin(event.currentTarget.value)}
                rightSectionPointerEvents="all"
                mt="md"
                rightSection={
                    <CloseButton
                    onClick={() => {setLogin('')}}
                    style={{ display: login ? undefined : 'none'  }}
                    />
                }
                required
                />
                
                <PasswordInput
                size="md"
                mt="md"
                label="Пароль"
                placeholder="Пароль"
                // value={password}
                // onChange={(event) => setPassword(event.currentTarget.value)}
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
                required
                />

                <PasswordInput
                size="md"
                mt="md"
                label="Повторите пароль"
                placeholder="Повтор пароля"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.currentTarget.value)}
                required
                />
                <Select
                label="Роль"
                placeholder="Выберите роль"
                data={ROLES}
                value={role}
                onChange={(value) => setRole(value)}
                required
                />
            </Box>
            <Button fullWidth mt="xl" size="md" variant="gradient"
                gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
                type="submit"
                onClick={submitRegistration}
                >
                Зарегистрироваться
                </Button>
                {errorMessage && <Notification icon={xIcon} 
                color="red" withBorder  title="Ошибка!" 
                style={{ position: 'fixed', top: '20px', right: '20px' }} 
                >
                    {errorMessage}
                </Notification>}
                {successMessage && <Notification icon={checkIcon} 
                color="green" withBorder title="Успех!"
                 style={{ position: 'fixed', top: '20px', right: '20px' }} 
                 >
                    {successMessage}
                </Notification>}
        </Paper>

    )
}

export default SighUp