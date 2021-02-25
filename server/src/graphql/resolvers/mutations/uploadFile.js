const cloudinary = require('cloudinary');

module.exports = async (file) => {
  // The Upload scalar return a a promise
  const { createReadStream } = await file;
  const fileStream = createReadStream();

  // Initiate Cloudinary with your credentials
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });

  // Return the Cloudinary object when it's all good
  return new Promise((resolve, reject) => {
    const cloudStream = cloudinary.v2.uploader.upload_stream(function (
      err,
      fileUploaded
    ) {
      // In case something hit the fan
      if (err) {
        rejet(err);
      }

      // All good :smile:
      resolve(fileUploaded);
    });

    fileStream.pipe(cloudStream);
  });
};

