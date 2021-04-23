export class NotificationHelper{

    public static sendMessage(){
        new Notification("Message envoyé", { body: "Votre message a bien été envoyé" });
    }

    public static sendMessageOffline(){
        new Notification("Message pris en compte", { body: "Votre message n'a pas encore été envoyé, votre téléphone est hors ligne" });
    }

}