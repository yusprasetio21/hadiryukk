module.exports = function handler(req, res) {
  res.status(200).json({ ok: true, msg: "function works" });
}