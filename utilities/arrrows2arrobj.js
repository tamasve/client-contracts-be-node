function arrrows2arrobj (arrayOfRows) {

    let arrayOfObjects = [];

    for (let i=1; i < arrayOfRows.length; i++) {
        let record = {};
        for (let j=0; j < arrayOfRows[i].length; j++) {
            let key = arrayOfRows[0][j].toLowerCase();    // lowercase key
            let value = arrayOfRows[i][j];
            if (key.slice(-4) === "date") value = value.toDateString()  // format conversion to date
            record[ key ] = value;      // {"headercell-value": "datacell-value"}
        }
        arrayOfObjects.push(record);
    }

    return arrayOfObjects;
}

module.exports = arrrows2arrobj;