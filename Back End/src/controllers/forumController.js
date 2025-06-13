const Forum = require("../models/forum");

exports.createPost = async (req, res) => {
  try {
    const { username, message } = req.body;

    if (!username || !message) {
      return res.status(400).json({ error: "Username dan pesan wajib diisi." });
    }

    const newPost = await Forum.create({ username, message });
    res.status(201).json({ status: "success", data: newPost });
  } catch (error) {
    res.status(500).json({ error: "Gagal menyimpan pesan." });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Forum.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({ status: "success", data: posts });
  } catch (error) {
    res.status(500).json({ error: "Gagal mengambil data forum." });
  }
};
