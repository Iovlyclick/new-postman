import { Button } from 'antd';
import React, { useState } from 'react';

export const Login = ({ onRegister }) => {
    const [valueInput, setValueInput] = useState<string>();

    const onInputChange = (value: any) => {
        setValueInput(value.target.value)
    }
    const checkEnter = (event) => {
        if (event.keyCode === 13) {
            onRegister(valueInput)
        }
    }
    return (
        <div id="container-login">
            <div className="logo-container"> <img src={process.env.PUBLIC_URL + '/logo.jpg'}/></div>
            <input onKeyDown={ev => checkEnter(ev)} className="input-login" onChange={onInputChange} placeholder="Nom d'utilisateur" />
            <Button className="button-login" type="primary" onClick={() => onRegister(valueInput)}  disabled={!valueInput ? true : false}> Se connecter ! </Button>
        </div>
    )
}