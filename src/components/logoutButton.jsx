import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useCookies } from 'react-cookie';

const ExitButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#8EE4AF'),
    backgroundColor: '#8EE4AF',
    '&:hover': {
        backgroundColor: '#00ff47',
        borderColor: '#000000',
    },
}));

export function LogoutButton(props) {



    const [cookie, setCookies] = useCookies()

    const exit = () => {
        setCookies('token', '')
        setCookies('id', '')
        setCookies('name', '')
        props.setId('')
    }

    return (
        <div className='AuthButton'>
            <ExitButton variant="contained" onClick={exit}>Выйти</ExitButton>
        </div>
    );
}