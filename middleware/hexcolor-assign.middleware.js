import { logger } from '../lib/logger.js';

export const hexcolorAssign = (req, res, next) => {
  const body = req.body || {};
  const colorInput = body.color;

  if (!colorInput || typeof colorInput !== 'string' || !colorInput.trim()) {
    req.body = { ...body, hexcolorAssign: 'color not supplied' };
    return next();
  }

  const color = colorInput.trim().toLowerCase();

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
