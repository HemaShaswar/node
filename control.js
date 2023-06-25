const fs = require('fs');
const path = require('path');

const toursPath = path.join(__dirname, '../dev-data/data/tours-simple.json');
const data = JSON.parse(fs.readFileSync(toursPath, 'utf-8'));

exports.getTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: data.length,
    data,
  });
};

exports.getAllTours = (req, res) => {
  const targetId = req.params.id * 1;
  console.log(targetId);
  const tour = data.find((el) => el.id === targetId);

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.addTour = (req, res) => {
  const newId = data[data.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  data.push(newTour);
  fs.writeFile(toursPath, JSON.stringify(data), (err) => {
    res.status(201).json({
      status: 'success',
      data,
    });
  });
};

exports.checkID = (req, res, next, val) => {
  if (val > data.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'id not found',
    });
  }
  next();
};

exports.checkReq = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(404).json({
      status: 'failed',
      message: 'request not complete',
    });
  }
  next();
};
