import forIn from 'lodash/forIn';

// Function that helps format the data from firebase
export const firebaseLooper = data => {
    let newDataset = [];

    forIn(data, (item, key) => {
        newDataset.push({
            ...item,
            id: key
        });
    });

    return newDataset;
};
