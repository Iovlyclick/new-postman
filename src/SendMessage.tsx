import { WechatOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import TextArea from 'antd/lib/input/TextArea';
import { AppDatabase } from "classes/AppDatabase";
import { NotificationHelper } from "helpers/NotificationHelper";
import React, { useEffect } from 'react';
import { MessageService } from "services/MessageService";

export const SendMessage = ({ conversations, userActive, loadData, statusNotification, receiver = null }: { conversations: any, userActive: any, loadData: any, statusNotification: any, receiver?: any }) => {
    const [form] = Form.useForm();
    const service = new MessageService()
    const db = new AppDatabase();

    const getUserReceiver = (valueReceiver) => {
        if (receiver) { return receiver }
        if (!conversations) { return null }
        let conversation = conversations.find(x => x.user.name == valueReceiver)
        return conversation ? conversation.user : null
    }

    const sendMessage = async (message, valueReceiver) => {
        if (navigator.onLine) {
            service.sendMessageOnline(message, valueReceiver, userActive, getUserReceiver)
            loadData();
            form.resetFields();
            if (statusNotification == "granted") {
                NotificationHelper.sendMessage()
            }
            return
        }
        service.saveMessageIndexedDb(message, valueReceiver, userActive, getUserReceiver, db)

        if (statusNotification == "granted") {
            NotificationHelper.sendMessageOffline()
        }

        // appel au service worker si backend fonctionnel
        // const registration = await navigator.serviceWorker.ready
        // await registration.sync.register('sendMessage');

    }


    const onSubmitForm = (value) => {
        sendMessage(value.message, value.receiver)
    }

    useEffect(() => {
        window.addEventListener('online', () => {
            service.getMessageFromIndexedDb(db, form, statusNotification, loadData)
        })
    }, [])


    return (
        <div className="container-send-message" style={{width:'100%'}}>
            <Form form={form} className="form-send-message" onFinish={onSubmitForm}>
                <Form.Item name="message">
                    <TextArea className="text-area-width"  autoSize={{ minRows: 1, maxRows: 3 }} placeholder="Ecrire un message" />
                </Form.Item>
                {!receiver &&
                    <Form.Item name="receiver">
                        <Input placeholder="A qui ? " />
                    </Form.Item>
                }
                <Button className="button-send" htmlType="submit" type="primary"> <WechatOutlined /></Button>
            </Form>
        </div>
    )
}