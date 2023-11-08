// for Excel import - currently inactive

const clientsSchema = {
    Name: {
        prop: "name",
        type: String,
        required: true
    },
    Taxnumber: {
        prop: "taxnumber",
        type: String,
        required: true
    },
    Segment: {
        prop: "segment",
        type: String,
        required: true
    },
    Headquarters: {
        prop: "headquarters",
        type: String,
        required: true
    }

}

module.exports = clientsSchema;