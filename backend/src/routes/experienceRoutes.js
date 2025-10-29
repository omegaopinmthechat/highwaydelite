import express from 'express';
import {
  getAllExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  searchExperiences,
  bulkUploadExperiences
} from '../controller/experienceController.js';

// routes for handling experience operations
const experienceRoutes = express.Router();

// get all experiences
experienceRoutes.get('/', getAllExperiences);

// search experiences
experienceRoutes.get('/search', searchExperiences);

// get experience by id
experienceRoutes.get('/:id', getExperienceById);

// create new experience
experienceRoutes.post('/', createExperience);

// bulk upload experiences
experienceRoutes.post('/bulk', bulkUploadExperiences);

// update experience
experienceRoutes.put('/:id', updateExperience);


export default experienceRoutes;