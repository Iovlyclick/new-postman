import { AppDatabase } from "classes/AppDatabase"
import { NotificationHelper } from "helpers/NotificationHelper"

export class MessageService {

    public prepareMessage(message, receiver, userActive, getUserReceiver) {
        let messagesFromLocalStorage = JSON.parse(localStorage.getItem('messages')!)
        let tmpReceiver = getUserReceiver(receiver)
        if (!tmpReceiver) {
            tmpReceiver = {
                name: receiver,
                id: Math.floor(Math.random() * 1000) + 1,
                isActive: false
            }
        }
        let messageToSend = {
            sender: userActive,
            receiver: tmpReceiver,
            content: message
        }
        
        return messagesFromLocalStorage ? [messageToSend, ...messagesFromLocalStorage] : [messageToSend]

    }

    public sendMessageOnline(message, receiver, userActive, getUserReceiver) {
        let messagesForLocalStorage = this.prepareMessage(message, receiver, userActive, getUserReceiver)
        localStorage.setItem("messages", JSON.stringify(messagesForLocalStorage))
    }

    public saveMessageIndexedDb(message, receiver, userActive, getUserReceiver, db: AppDatabase) {
        let messageFoDB = this.prepareMessage(message, receiver, userActive, getUserReceiver)
        db.messages.put({ content: JSON.stringify(messageFoDB) })

    }
    public getMessageFromIndexedDb(db: AppDatabase, form, statusNotification, loadData){
        db.messages.toArray().then(messages =>{
            let messagesForLocalStorage:any[] = [];
            let messagesFromLocalStorage = JSON.parse(localStorage.getItem('messages')!)

            messages.forEach(message => {
                messagesForLocalStorage.push(JSON.parse(message.content)[0])   

            });           

            let messagesToSave = messagesFromLocalStorage ? [...messagesForLocalStorage, ...messagesFromLocalStorage] : messagesForLocalStorage
            localStorage.setItem("messages", JSON.stringify(messagesToSave));

            form.resetFields();
             if (statusNotification == "granted") {
                NotificationHelper.sendMessage()
            }
            loadData()
            db.messages.clear(); 
            
        })
        
    }




}