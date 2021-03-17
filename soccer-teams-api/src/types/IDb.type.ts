export interface IDb {
    findAll: (collectionName: string) => Promise<Array<any>>;
}