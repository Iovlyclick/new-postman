import { Conversation } from 'classes/Conversation';
import { User } from 'classes/User';
import { ImgContainer } from 'ImgContainer';
import React from 'react';
import { useHistory } from "react-router-dom";

export const RowConversation = ({ conversation, userActive }: { conversation: Conversation, userActive:User }) => {
    const history = useHistory()
    return (
        <div onClick={() => history.push(`/conversations/${conversation.user.id}`)} className="row-conversation">
            <ImgContainer userActive={userActive}/>
            <div className="resume-conversation-container">
                <span className="name-conversation" >{conversation.user.name}</span>
                <span className="conversation-resume" >{conversation.messages[0].content}</span> 
            </div>
        </div>
    )
}