

class DataApi{

    constructor(rawData){
        this.rawData = rawData;
    }

    mapIntoObject(arr) {
        return arr.reduce((acc, curr) => {
            acc[curr.id] = curr;
            return acc;
        }, {});
    }

    getNotes() {
        return this.mapIntoObject(this.rawData.notes);
    }
}