const getParsedItem = (key: string) => {
    try {
        let serializedState = localStorage.getItem(key);

        if (serializedState) {
            return JSON.parse(serializedState);
        }

        return null;
    }
    catch (err) {
        throw new Error(`Error occured while trying to get state: ${err}`);
    }
}

const saveItem = (key: string, state: any) => {
    try {
        let serializedState = JSON.stringify(state);
        localStorage.setItem(key, serializedState);
    }
    catch (err) {
        throw new Error('Error occurred while trying to save state to local storage');
    }
}

export { saveItem, getParsedItem }