exports.successData = (res, data) => {
  return res.send({
    success: true,
    data,
  });
};

exports.successMessage = (res, message) => {
  return res.json({
    success: true,
    message,
  });
};

exports.errorMessage = (res, message, status = 400) => {
  console.log('\n************** ERROR *************\n', message, '\n');
  return res.status(status).json({
    success: false,
    message,
  });
};

exports.findOneData = async (model, filter) => {
  let data = await model.findOne({ where: filter });
  return data;
};

exports.getAllData = async (model, pages, offsets) => {
  let page = parseInt(pages) || 1;
  let offset = parseInt(offsets) || 10;
  let skip = (page - 1) * offset;

  const data = await model.findAll({
    limit: offset,
    offset: skip,
    order: ['createdAt'],
  });
  return data;
};

exports.readAllPopulate = async (model, filters, references) => {
  const data = await model.find(filters).populate(references);
  return data;
};

exports.postData = async (model, data) => {
  await model.create(data);
  return true;
};

exports.updateData = async (model, id, data) => {
  await model.update(data, { where: { id } });
  return true;
};

exports.removeData = async (model, id) => {
  await model.destroy({ where: { id } });
  return true;
};
