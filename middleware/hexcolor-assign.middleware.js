export const hexcolorAssign = (req, res, next) => {
  const { color } = req.body;

  if (!color) {
    req.body.hexcolorAssign = 'no color provided';
  } else {
    const hexMap = {
      red: '#ff0000',
      blue: '#0000ff',
      green: '#00ff00',
    };

    req.body.hexcolorAssign = hexMap[color] || 'color not supported';
  }

  next();
};
