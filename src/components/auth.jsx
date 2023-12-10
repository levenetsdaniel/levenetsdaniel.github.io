import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from 'axios';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from '@mui/material';
import { useCookies } from 'react-cookie'
import isEmail from "validator/lib/isEmail";
import { light } from '@mui/material/styles/createPalette';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '15px',
    boxShadow: 24,
    p: 4,
};

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
        },
        secondary: {
            main: '#000000',
        },
    },
});

const RegButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#000000'),
    color: '#000000',
    borderColor: '#000000',
    backgroundColor: '#FFFFFF',
    '&:hover': {
        backgroundColor: '#FFFFFF',
        borderColor: '#000000',
    },
}));

const AuthButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#8EE4AF'),
    backgroundColor: '#8EE4AF',
    '&:hover': {
        backgroundColor: '#8EE4AF',
        borderColor: '#000000',
    },
}));

export function Auth({setId}) {
    const [open, setOpen] = useState(false);

    const [cookies, setCookies] = useCookies()

    const [process, setProccess] = useState('logIn');

    const changeStep = () => {
        setProccess(process === 'logIn' ? 'registration' : 'logIn');
        setErrMessage('');
        setLogErrMessage('');
        setPasswordErrMessage('');
        setUsernameErrMessage('');
        setRegMessage('')
    };

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [regMessage, setRegMessage] = useState('')
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const loginChanged = (event) => {
        setLogErrMessage('');
        setLogin(event.target.value)
    };
    const passwordChanged = (event) => {
        setPasswordErrMessage('');
        setPassword(event.target.value)
    };
    const usernameChanged = (event) => {
        setUsernameErrMessage('');
        setUsername(event.target.value)
    };
    const [errMessage, setErrMessage] = useState('');
    const [logErrMessage, setLogErrMessage] = useState('');
    const [passwordErrMessage, setPasswordErrMessage] = useState('');
    const [usernameErrMessage, setUsernameErrMessage] = useState('');

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false);
        setLogin('');
        setPassword('');
        setUsername('');
        setErrMessage('');
        setLogErrMessage('');
        setPasswordErrMessage('');
        setUsernameErrMessage('');
        setRegMessage('');
    }

    const logIn = () => {
        setRegMessage('');
        setErrMessage('');
        setLogErrMessage('');
        setPasswordErrMessage('');
        setUsernameErrMessage('');
        if (login.length === 0) {
            setLogErrMessage('логин обязателен')
        }
        if (password.length === 0) {
            setPasswordErrMessage('пароль обязателен')
        }
        if (login.length !== 0 & password.length !== 0) {
            axios.post('/api/logIn', { email: login, password: password }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                setCookies('token', res.data.token)
                setCookies('id', res.data.id)
                setCookies('name', res.data.name)
                setId(res.data.id)
            }).catch(err => {
                setErrMessage('неверный пароль или логин')
            })
        }
    };

    const registrate = () => {
        setRegMessage('');
        setErrMessage('');
        setLogErrMessage('');
        setPasswordErrMessage('');
        setUsernameErrMessage('');
        if (login.length === 0) {
            setLogErrMessage('логин обязателен')
        } else if (!isEmail(login)) {
            setLogErrMessage('необходимо указать правильный email')
        }
        if (password.length === 0) {
            setPasswordErrMessage('пароль обязателен')
        }
        if (username.length === 0) {
            setUsernameErrMessage('имя пользователя обязательно')
        }
        if (login.length != 0 & password.length != 0 & username.length != 0 & isEmail(login)) {
            setRegMessage('вы успешно зарегистрировались');
            axios.post('/api/registrate', { email: login, password: password, name: username }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).catch(err => {
                setErrMessage('пользователь уже существует')
                setRegMessage('')
                console.log(err)
            })

        }
        else {
            setErrMessage('')
        }
    };


    return (
        <div className='AuthButton'>
            <AuthButton onClick={handleOpen} variant="contained"> Войти</AuthButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} component="form">
                    <Typography id="modal-modal-title" component="h2">
                        {process === 'logIn' && 'Войти'}
                        {process === 'registration' && 'Регистрация'}
                    </Typography>
                    {regMessage}
                    {errMessage && <div className='errorMessage'>{errMessage}</div>}
                    <Typography>
                        <Box
                            sx={{
                                '& > :not(style)': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <ThemeProvider theme={theme}>
                                <TextField
                                    id="filled-basic"
                                    label="Email"
                                    variant="filled"
                                    onChange={loginChanged}
                                    value={login}
                                />
                            </ThemeProvider>
                        </Box>
                        {logErrMessage && <div className='errorMessage'>{logErrMessage}</div>}
                    </Typography>
                    <Typography>
                        <Box
                            sx={{
                                '& > :not(style)': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <ThemeProvider theme={theme}>
                                <TextField
                                    id="filled-basic"
                                    label="Пароль"
                                    variant="filled"
                                    onChange={passwordChanged}
                                    value={password}
                                    type={showPassword ? "text" : "password"}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </ThemeProvider>
                        </Box>
                        {passwordErrMessage && <div className='errorMessage'>{passwordErrMessage}</div>}
                    </Typography>
                    {process === 'registration' && (
                        <Typography>
                            <Box
                                sx={{
                                    '& > :not(style)': { m: 1, width: '25ch' },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <ThemeProvider theme={theme}>
                                    <TextField id="filled-basic" label="Имя" variant="filled" onChange={usernameChanged} value={username} />
                                </ThemeProvider>
                            </Box>
                            {usernameErrMessage && <div className='errorMessage'>{usernameErrMessage}</div>}
                        </Typography>
                    )}
                    <Typography>
                        {process === 'registration' && (
                            <>
                                <Typography>
                                    <RegButton variant="outlined" onClick={registrate}> Зарегистрироваться</RegButton>
                                </Typography>
                                <Typography>
                                    <ThemeProvider theme={theme}>
                                        <Link onClick={changeStep}>Войти</Link>
                                    </ThemeProvider>
                                </Typography>
                            </>
                        )}
                        {process === 'logIn' && (
                            <>
                                <Typography>
                                    <RegButton variant="outlined" onClick={logIn}> Войти</RegButton>
                                </Typography>
                                <Typography>
                                    <ThemeProvider theme={theme}>
                                        <Link onClick={changeStep}>Регистрация</Link>
                                    </ThemeProvider>
                                </Typography>
                            </>
                        )}
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}