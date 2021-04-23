import { Message } from 'classes/Message'
import { User } from 'classes/User'
import React, { useState } from 'react'

export const DisplayMessage = ({ userActive, message }: { userActive: User, message: Message }) => {

    const msgAutomatic: Message = {
        sender: message.receiver,
        receiver: message.sender,
        content: "Ceci est un message automatique pour simuler une réponse"
    }
    const [messages, setMessages] = useState<Message[]>([message, msgAutomatic]);


    return (
        <React.Fragment>
            {messages.map(message => 
                <div className={message.sender.isActive ? "sender-message-container" : "receiver-message-container"}>
                    <div className="message-container">
                        <div className="flex-between w-100 mb-1">
                            <span className="italic"> 01/08/10 </span>
                        </div>
                        <div className="message-content">
                            {message.content}
                        </div>
                    </div>
                </div>
            )}

        </React.Fragment>


    )
}