const Township = require("../models/Township");

module.exports = app => {
  app.get("/api/townships", async (req, res) => {
    const townships = await Township.find({});
    res.json({ status: "success", data: { townships } });
  });

  app.post("/api/townships/setup", async (req, res) => {
    const townships = [
      "Kamayut",
      "Sanchaung",
      "Hlaing",
      "Tarmwe",
      "Dala",
      "Lanmadaw"
    ];
    for (const township of townships) {
      await new Township({ name: township }).save();
    }
    return res.json({ status: "success" });
  });
};
