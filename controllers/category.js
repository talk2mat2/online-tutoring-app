const categorydb = require('../models/category');

//Create Subject
exports.create = (req, res) => {
  const { title, description } = req.body;
  //Validate subject input
  !title ? res.status(404).send({ message: 'Subject can not be blank' }) : '';

  //creating the subject
  let subject = new categorydb({
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

// exports.create = (req, res) => {
//   let { name, description } = req.body;

//   !name || !description
//     ? res.status(423).send({
//         message: 'Fields can not be empty',
//       })
//     : '';

//   let category = new categorydb({
//     name,
//     description,
//   });

//   category
//     .save()
//     .then((data) => {
//       res.status(200).send({
//         message: 'Category created',
//         data,
//       });
//     })
//     .catch((e) => {
//       res.status(500).send({
//         message: 'an error occured',
//       });
//     });
// };
