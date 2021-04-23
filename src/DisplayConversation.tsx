import { Button, message } from 'antd';
import { Message } from 'classes/Message';
import { User } from 'classes/User';
import { DisplayMessage } from 'DisplayMessage';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { SendMessage } from 'SendMessage';
import { useHistory } from "react-router-dom";
import { CaretLeftOutlined } from "@ant-design/icons";
import { ImgContainer } from 'ImgContainer';

export const DisplayConversation = ({ statusNotification, userActive }) => {
    const { receiverId } = useParams()
    const [messages, setMessages] = useState<Message[]>();
    const [receiver, setReceiver] = useState<User>();
    const [conversations, setConversations] = useState<any>();
    const history = useHistory();

    const getAllMessages = () => {
        return JSON.parse(localStorage.getItem('messages')!)

    }

    const getConversations = () => {
        let tmpMessages: Message[] = getAllMessages()
        if (!tmpMessages) { return }
        let usersMessages = tmpMessages.map(a => a.receiver)
        usersMessages = usersMessages.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i)
        let tmpConversation = usersMessages.map(user => {
            let messages = tmpMessages.filter(msg => msg.receiver.id == user.id)
            return { user: user, messages: messages }
        })
        return tmpConversation

    }

    const getMessagesFromConversation = () => {
        let messages = JSON.parse(localStorage.getItem('messages')!);
        return messages.filter(a => a.receiver.id == receiverId);
    }

    useEffect(() => {
        loadData();
    }, [])

    const loadData = () => {
        let tmpMessages = getMessagesFromConversation();
        setMessages(tmpMessages.reverse());
        setReceiver(tmpMessages[0].receiver)
        setConversations(getConversations())
    }


    return (
        <React.Fragment>
            <div id="display-conversation" className="container-message-sender">
                    <div className="information-conversation-container">
                        <Button className="return-button" onClick={() => history.goBack()} type="primary"> <CaretLeftOutlined /> </Button>
                    <ImgContainer userActive={userActive}/>
                    {messages && <p className="info-connection"> Conversation : <span> {messages[0].receiver.name} </span>  </p>}
                    </div>
                <div className="conversation-container single-conversation">
                    {messages && receiver && messages.map(message =>
                        <DisplayMessage userActive={userActive} message={message} />)}
                    <SendMessage receiver={receiver} statusNotification={statusNotification} userActive={userActive} conversations={conversations} loadData={loadData} />

                </div>
            </div>

        </React.Fragment>

    )
}