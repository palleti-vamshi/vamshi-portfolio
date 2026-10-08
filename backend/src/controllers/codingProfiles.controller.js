import { getCodingProfiles } from '../services/codingProfiles.service.js';
import { sendSuccess, HttpStatus } from '../utils/apiResponse.js';

export const getCodingProfilesController = async (req, res, next) => {
  try {
    const data = await getCodingProfiles();
    return sendSuccess(res, data, 'Coding profiles retrieved successfully', HttpStatus.OK);
  } catch (error) {
    next(error);
  }
};
