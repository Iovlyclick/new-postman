import { Conversation } from 'classes/Conversation';
import { Message } from 'classes/Message';
import { User } from 'classes/User';
import React, { useEffect, useState } from 'react';
import { RowConversation } from 'RowConversation';
import { SendMessage } from 'SendMessage';

export const PageMessages = ({ userActive, statusNotification }: { userActive: User, statusNotification: string }) => {
    const [conversations, setConversation] = useState<Conversation[]>()

    const getMessages = () => {
        return JSON.parse(localStorage.getItem('messages')!)

    }

    const getConversation = () => {
        let tmpMessages: Message[] = getMessages()
        if (!tmpMessages) { return }
        let usersMessages = tmpMessages.map(a => a.receiver)
        usersMessages = usersMessages.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i)
        let tmpConversation = usersMessages.map(user => {
            let messages = tmpMessages.filter(msg => msg.receiver.id == user.id)
            return { user: user, messages: messages }
        })
        return tmpConversation

    }

    const loadData = () => {
        setConversation(getConversation())
    }

    useEffect(() => {
        loadData()
    }, [])






    return (
        <React.Fragment>
            {userActive && <p className="info-connection"> Connecté en tant que : <span> {userActive.name} </span>  </p>}
            <div className="container-message-sender">
                <div className="conversation-container">

                    {conversations ? conversations.map(conversation => <RowConversation userActive={userActive} conversation={conversation} />)
                        :
                        <React.Fragment>
                            <div className="logo-container"> <img src={process.env.PUBLIC_URL + '/logo.jpg'} /></div>
                            <p className="no-conversation"> Aucune conversation pour le moment, pour commencer à tchatter vous pouvez envoyer un message :) </p>
                        </React.Fragment>


                    }
                </div>
                <SendMessage statusNotification={statusNotification} loadData={loadData} userActive={userActive} conversations={conversations} />
            </div>
        </React.Fragment>
    )
}