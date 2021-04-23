import { Login } from 'Login'
import { PageMessages } from 'PagesMessage'
import React from 'react'

export const Home = ({ userContext, onRegister, statusNotification }) => {
    return (
        <React.Fragment>
            {userContext ?
                <PageMessages statusNotification={statusNotification} userActive={userContext} /> :
                <Login onRegister={onRegister} />
            }
        </React.Fragment>

    )
}