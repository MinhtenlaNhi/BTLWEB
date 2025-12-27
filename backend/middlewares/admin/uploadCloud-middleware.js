// const cloudiary = require("cloudinary").v2;
// const streamifier = require("streamifier");
// require("dotenv").config();

// cloudiary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });

// module.exports = (req, res, next) => {
//   let streamUpload = (req) => {
//     return new Promise((resolve, reject) => {
//       let stream = cloudiary.uploader.upload_stream((error, result) => {
//         if (result) {
//           resolve(result);
//         } else {
//           reject(error);
//         }
//       });
//       streamifier.createReadStream(req.file.buffer).pipe(stream); 
//     });
//   };

//   async function upload(req) {
//     let result = await streamUpload(req);
//     req.body.thumbnail = result.url;
//     console.log(result);
//     next();
//   }
//     upload(req);
// };


const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

module.exports = async (req, res, next) => {
  try {
    // Nếu không có file thì bỏ qua
    if (!req.file) {
      return next();
    }

    const streamUpload = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "uploads" }, // tuỳ chọn: lưu file vào folder "uploads" trên Cloudinary
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const result = await streamUpload();
    // Lưu URL ảnh vào req.body để controller xử lý
    const fieldName = req.file.fieldname;
    req.body[fieldName] = result.secure_url;
    console.log("Upload thành công:", result.secure_url);

    next();
  } catch (error) {
    console.error("Upload error:", error);
    next(error); // chuyển lỗi qua Express error handler
  }
};
