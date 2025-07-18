const axios = require("axios");

module.exports = async (req, res) => {
  try {
    const response = await axios.get(
      "https://suitmedia-backend.suitdev.com/api/ideas",
      {
        params: req.query,
        headers: {
          Accept: "application/json",
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Serverless Function Error:", {
      message: error.message,
      code: error.code,
      response: error.response?.data,
      status: error.response?.status,
    });
    res
      .status(error.response?.status || 500)
      .json({ error: "Failed to fetch data from backend" });
  }
};
