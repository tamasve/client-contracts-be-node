const readXlsxFile = require('read-excel-file/node');
// const { clientsSchema } = require('./clientsSchema');
const path = require("path");
const fs = require('fs');

// -- Load clients data from an Excel file --

const clientsLoader = () => {

    let table = [];

    // unfortunately this xlsx >> json from npmjs.com does not work:
    // const schema = {'Name': 'name', 'Taxnumber': 'taxnumber', 'Segment': 'segment', 'Headquarters': 'headquarters'}
    // readXlsxFile(path.join(__dirname, "data", "clients.xlsx"), {clientsSchema}).then(({rows}) => console.log(rows));

    // instead normal xlsx read, then an own converter to json:
    readXlsxFile(path.join(__dirname, "clients.xlsx")).then((rows) => {

        // convert to json
        for (let i=1; i < rows.length; i++) {
            let record = {};
            for (let j=0; j < rows[i].length; j++) {
                record[ rows[0][j].toLowerCase() ] = rows[i][j];      // {"headercell-value": "datacell-value"}
            }
            table.push(record);
        }

        // write json into file
        fs.writeFile( path.join(__dirname, "clientsData.json"), JSON.stringify(table),
            (err) => {
                if (err) console.log(err)
                else console.log("clients data written into file successfully")
            });
    });


}

module.exports = clientsLoader;