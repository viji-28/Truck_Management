const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'public/images',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + file.originalname);
  },
});

const imageUpload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, //10 MB  ,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg |PNG|JPEG|jpeg)$/)) {
      const err = new Error('Only .png, .jpg and .jpeg format allowed!');
      err.name = 'ExtensionError';
      return cb(err, false);
    }
    cb(undefined, true);
  },
});

const multipleFileUpload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, //10 MB  ,
  },
  fileFilter(req, file, cb) {
    if (
      !file.originalname.match(/\.(png|jpg|JPEG|jpeg|pdf|doc|PNG|JPG|PDF|DOC)$/)
    ) {
      const err = new Error(
        'Only .png, .jpg , .jpeg , .pdf , .doc format allowed!'
      );
      err.name = 'ExtensionError';
      return cb(err, false);
    }
    if (req.files.length > 5) {
      const err = new Error('Only FIVE files allowed!');
      err.name = 'FileCount';
      return cb(err, false);
    }
    cb(undefined, true);
  },
});

const errorHandler = (err, req, res, next) => {
  if (err.name === 'ExtensionError') return err;
  if (err.name === 'FileCount') return err;
  next(err);
};

module.exports = {
  imageUpload,
  multipleFileUpload,
  // multipleFileUpload: multipleFileUpload.array('files'),
  errorHandler,
};
