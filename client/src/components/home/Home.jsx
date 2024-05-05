import React, { useContext, useState, useEffect } from "react"
import { UserContext } from "../../context/UserContext.jsx"
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
import { useForm } from '@mantine/form';
import { IconX, IconCheck } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import './Home.css'
import classes from '../auth/signIn/AuthenticationImage.module.css';

const Home = ({theme, setTheme}) => {
    const [userData] = useContext(UserContext)

    return (
        <Paper className={classes.form} radius={0} p={30}>
            <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
            Hello {userData.userRole}
            </Title>
        </Paper>
        
        
    );
}

export default Home