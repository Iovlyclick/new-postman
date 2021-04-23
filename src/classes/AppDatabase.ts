import Dexie from 'dexie';
import { IMessageInDb } from './IMessageinDb';

export class AppDatabase extends Dexie {
    messages: Dexie.Table<IMessageInDb, number>;

    constructor() {
        super("AppDatabase");

        this.version(1).stores({
            messages: '++id, content',
        });
        this.messages = this.table("messages");
    }
}
