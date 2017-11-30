const mandateModel = require('./mandateModel');

const getMandates = (req, res) => {
    let query = mandateModel.find().exec();
    query.then((results) => {
        let mandates = results.map((result) => {
            return { name: result.name, id: result._id };
        });
        return res.send(mandates);
    }).catch((err) => {
        console.error(err);
        return res.status(500).send(err);
    });
}

exports.getMandates = getMandates;