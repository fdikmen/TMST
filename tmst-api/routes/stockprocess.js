var express = require('express');
var router = express.Router();
var Model = require("../models/Stockprocess");
var ModelUser = require("../models/User");

router.get("/", (req, res) => {
  Model.find({}, (err, data) => {
    if (err) res.json(err);
    res.json(data);
  });
});

router.get("/all", function (req, res, next) {

  Model.aggregate([
    { $set: { UserId: { $toObjectId: "$UserId" } } },
    {
      $lookup: {
        from: 'users',
        localField: 'UserId',
        foreignField: '_id',
        as: 'user'
      }
    },
    { $set: { StockId: { $toObjectId: "$StockId" } } },
    {
      $lookup: {
        from: 'stocks',
        localField: 'StockId',
        foreignField: '_id',
        as: 'stock'
      }
    }, 
    {
      $unwind: "$stock"
    },
    { $set: { 'stock.MaterialId': { $toObjectId: "$stock.MaterialId" } } },
    { $lookup: {
      from: "materials",
      localField:'stock.MaterialId',        
      foreignField: '_id',
      as:'Material'
    }},
    { $set: { 'stock.WarehouseId': { $toObjectId: "$stock.WarehouseId" } } },
    { $lookup: {
      from: "warehouses",
      localField:'stock.WarehouseId',        
      foreignField: '_id',
      as:'Warehouse'
    }},
    {$project:{
      _id:1,
      Quantity:1,
      ProcessDate:true,
      'UserName':{ "$arrayElemAt": ["$user.Name", 0] },
      'UserSurname':{ "$arrayElemAt": ["$user.Surname", 0] },
      'UserJob':{ "$arrayElemAt": ["$user.Job", 0] },
      //'StockQuantity':{ "$arrayElemAt": ["$stock.Quantity", 0] },
      'MaterialName':{ "$arrayElemAt": ["$Material.Name", 0] },
      'WarehouseName':{ "$arrayElemAt": ["$Warehouse.Name", 0] },
}}
  ]).then((data) => { res.json(data); })
    .catch((err) => { res.json(err); })
});

router.get("/:Id", (req, res, next) => {
  Model.findById({ "_id": req.params.Id }, (err, data) => {
    if (err) res.json(err);
    res.json(data);
  });
});

router.post("/", function (req, res) {
  const newModel = new Model(req.body);
  newModel.save((err, data) => {
    if (err) res.json(err);
    res.json(data);
  });
});

router.put("/:Id", (req, res, next) => {
  Model.findByIdAndUpdate(req.params.Id, req.body, { new: true })
    .then((data) => { res.json(data); })
    .catch((err) => { res.json(err); })
});

router.delete("/:Id", (req, res, next) => {
  Model.findByIdAndRemove(req.params.Id)
    .then((data) => { res.json(data); })
    .catch((err) => { res.json(err); })
});



module.exports = router;