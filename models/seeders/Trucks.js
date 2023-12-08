const Trucksdata = require('./Trucksdata');
const Brand = require('../Brand');
const TruckModel = require('../Truck');
const Variant = require('../Variant');
(async () => {
  try {
    Trucksdata;

    const brands = await Brand.bulkCreate(Trucksdata.Brands);
    const models = await TruckModel.bulkCreate(Trucksdata.Models);
    const variants = await Variant.bulkCreate(Trucksdata.Variants);
    console.log('Trucks created successfully');
    process.exit();
  } catch (error) {
    console.log('ERROR ', error.message);
  }
})();
