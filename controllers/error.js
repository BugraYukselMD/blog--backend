module.exports.get404Page = (req, res) => {
  res.status(404).send("Sayfa bulunamadı!");
};

module.exports.get500Page = (req, res) => {
  res.status(500).send("Bir şeyler yolunda gitmedi!");
};
