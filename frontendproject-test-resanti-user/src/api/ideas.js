const axios = require("axios");

module.exports = async (req, res) => {
  try {
    const response = await axios.get(
      "https://suitmedia-backend.suitdev.com/ideas",
      {
        params: req.query,
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json({ error: "Failed to fetch data" });
  }
};
