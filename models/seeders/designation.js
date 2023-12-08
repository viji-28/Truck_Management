const designation = require('../designation');

(async () => {
  try {
    const designationData = [
      'Admin',
      'Driver',
      'Manager',
      'Accountant',
      'Sales Executive',
    ];

    designationData.map(async (e) => {
      let existingData = await designation.findOne({
        where: { designation: e },
      });
      if (!existingData) {
        await designation.create({ designation: e });
        console.log('Designation created successfully');
        process.exit();
      } else {
        console.log(`Data already exists`);
      }
    });
  } catch (error) {
    console.log('ERROR ', error.message);
    process.exit(1);
  }
})();
