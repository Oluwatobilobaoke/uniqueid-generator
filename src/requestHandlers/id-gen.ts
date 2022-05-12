import { RequestHandler } from 'express';
import { generatorController } from '../controllers/id-gen';

export const generate: RequestHandler = async (req, res) => {
  try {
    const { start, machineId } = req.body;
    const { success, error, status, data, message } = await generatorController(start, machineId);
    if (error) {
      return res.status(status).json({ success, error });
    }
    return res.status(status).json({ success, data, message });
  } catch (error) {
    return res.json({
      success: false,
      error: 'Internal server error',
    });
  }
};
