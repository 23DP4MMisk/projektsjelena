exports.requireUser = (req, res, next) => {
  if (
    req.user.loma === 'registretajsklients' ||
    req.user.loma === 'admins'
  ) {
    next();
  } else {
    res.status(403).json({ message: 'Nepietiekamas tiesības' });
  }
};

exports.requireAdmin = (req, res, next) => {
  if (req.user.loma === 'admins') {
    next();
  } else {
    res.status(403).json({ message: 'Tikai administratoram' });
  }
};