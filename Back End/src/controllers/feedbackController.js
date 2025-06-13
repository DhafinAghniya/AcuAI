const Feedback = require("../models/feedback");

exports.sendFeedback = async (req, res) => {
  const { name, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({ error: "Nama dan pesan wajib diisi" });
  }

  try {
    const feedback = await Feedback.create({ name, message });
    res.status(201).json({ status: "success", data: feedback });
  } catch (error) {
    res.status(500).json({ error: "Gagal menyimpan feedback" });
  }
};
