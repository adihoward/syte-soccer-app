import fs from 'fs/promises';
import { IDb } from './../types/IDb.type';

export class FakeDbService implements IDb {
    constructor() { }

    findAll = async (collectionName: string) => {
        return new Promise<any[]>(async (resolve, reject) => {
            try {
                const jsonFile = await fs.readFile('fakeDb.json', 'utf-8')
                const dbData = JSON.parse(jsonFile);

                if (!dbData[collectionName]) {
                    reject('Collection name does not exist');
                }

                resolve(dbData[collectionName]);
            } catch (err) {
                reject(err);
            }

        })
    }
}