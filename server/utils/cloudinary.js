const CryptoJS = require("crypto-js");

module.exports = () => {
  const cloudinaryApiKey = process.env.CLOUDINARY_KEY;
  const cloudinaryApiSecret = process.env.CLOUDINARY_SECRET;
  const cloud = process.env.CLOUD;
  const folder = process.env.CLOUDINARY_FOLDER;
  const timestamp = ((Date.now() / 1000) | 0).toString();
  const hashString =
    "folder=" + folder + "&timestamp=" + timestamp + cloudinaryApiSecret;
  const signature = CryptoJS.SHA1(hashString).toString();
  const uploadUrl =
    "https://api.cloudinary.com/v1_1/" + cloud + "/image/upload";

  return { timestamp, signature, uploadUrl, cloudinaryApiKey, folder };
};
