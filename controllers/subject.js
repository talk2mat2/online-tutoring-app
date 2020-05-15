const db = require('../models/subject');

//Create Subject
exports.create = (req, res) => {
  const { title, description } = req.body;
  //Validate subject input
  !title ? res.status(404).send({ message: 'Subject can not be blank' }) : '';

  //creating the subject
  let subject = new db({
    title,
    description,
  });

  //saving the created subject
  subject
    .save()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(500).send({
        message: 'An error Occured while creating your subject',
      });
    });
};

//find and read all subjects
exports.findAll = async (req, res) => {
  const title = req.body.query;
  try {
    await db.find(title).then((data) => {
      res.status(200).send(data);
    });
  } catch (e) {
    res.status(500).send({
      message: 'An error occured while retrieving subjects',
    });
  }
};

//Find subject by ID
exports.findById = async (req, res) => {
  const id = req.body.id;
  try {
    await db.findById(id).then((data) => {
      !id
        ? res.status(404).send({ message: 'Subject not found' })
        : res.status(200).send(data);
    });
  } catch (e) {
    res.status(500).send({
      message: 'An error occured while finding your subject',
    });
  }
};

//Update By ID

exports.updateById = async (req, res) => {
  try {
    const data = await db.findByIdAndUpdate(
      { _id: req.body.id },
      { useFindAndModify: true }
    );

    !data
      ? res.status(404).send({
          message: `'Oh no! subject with the id: ${_id} not found'`,
        })
      : res.status(200).send({
          message: 'Subject updated successfully',
          data,
        });
  } catch (e) {
    res.status(500).send({ message: 'An error occured' });
  }
};

//Delete by Id
exports.deleteById = async (req, res) => {
  let id = req.body.id;
  try {
    await db.findByIdAndDelete({ _id: id }).then((data) => {
      !data
        ? res.status(404).send({
            message: 'Error deleting the subject',
          })
        : res.status(200).send({
            message: 'deleted successfully',
          });
    });
  } catch (e) {
    res.status(500).send({
      message: 'An error occured',
    });
  }
};

//Delete all Subject from Database
exports.deleteAll = async (req, res) => {
  try {
    await db.deleteMany({}).then((data) => {
      res.status(200).send({
        message: 'All subjects deleted successfully',
      });
    });
  } catch (e) {
    res.status(500).send({
      message: 'An error occurred while deleting all subjects',
    });
  }
};
