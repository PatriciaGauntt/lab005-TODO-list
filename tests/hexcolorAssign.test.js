import { jest } from '@jest/globals';
import { hexcolorAssign } from '../middleware/hexcolor-assign.middleware';

describe('hexcolorAssign middleware', () => {
  it('assigns correct hex for red', () => {
    const req = { body: { color: 'red' } };
    const res = {};
    const next = jest.fn();

    hexcolorAssign(req, res, next);

    expect(req.body.hexcolorAssign).toBe('#ff0000');
    expect(next).toHaveBeenCalled();
  });

  it('handles uppercase color', () => {
    const req = { body: { color: 'BLUE' } };
    const res = {};
    const next = jest.fn();

    hexcolorAssign(req, res, next);

    expect(req.body.hexcolorAssign).toBe('#0000ff');
    expect(next).toHaveBeenCalled();
  });

  it('handles missing color', () => {
    const req = { body: {} };
    const res = {};
    const next = jest.fn();

    hexcolorAssign(req, res, next);

    expect(req.body.hexcolorAssign).toBe('color not supplied');
  });

  it('handles unsupported color', () => {
    const req = { body: { color: 'purple' } };
    const res = {};
    const next = jest.fn();

    hexcolorAssign(req, res, next);

    expect(req.body.hexcolorAssign).toBe('color not supported');
  });
});
