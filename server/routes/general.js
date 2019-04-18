const generateCloudinaryInfo = require("../utils/cloudinary");

module.exports = app => {
  app.get("/api/general/cloudinary_signature", (req, res) => {
    res.json({
      status: "success",
      message: "successfully generated token",
      data: { ...generateCloudinaryInfo() }
    });
  });

  app.get("/api/general/health_check", (req, res) => {
    return res.json({
      status: "success",
      message: "im ok"
    });
  });
  ``;
};
