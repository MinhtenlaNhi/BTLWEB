module.exports.alert = (req) => {
  const success = req.flash("success");
  const error = req.flash("error");
  const messages = {
    success: success.length > 0 ? success : null,
    error: error.length > 0 ? error : null,
  };
  return messages;
};
