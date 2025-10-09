export const hexcolorAssign = (req, res, next) => {
  const { color } = req.body || {}; // ✅ prevents TypeError if req.body is undefined

  if (!color) {
    req.body = { ...req.body, hexcolorAssign: 'color not supplied' };
    return next();
  }

  if (color === 'red') {
    req.body.hexcolorAssign = '#ff0000';
  } else if (color === 'blue') {
    req.body.hexcolorAssign = '#0000ff';
  } else if (color === 'green') {
    req.body.hexcolorAssign = '#00ff00';
  } else {
    req.body.hexcolorAssign = 'color not supported';
  }

  next();
};
