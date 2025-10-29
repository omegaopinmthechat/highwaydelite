import Experience from '../models/Experience.js';

// basic crud operations for experiences
// get all experiences from database
const getAllExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get a specific experience by its id
const getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    res.json(experience);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// create a new experience in database
const createExperience = async (req, res) => {
  try {
    const experience = new Experience(req.body);
    const savedExperience = await experience.save();
    res.status(201).json(savedExperience);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// update an existing experience
const updateExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    res.json(experience);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



// search experiences by title using regex
const searchExperiences = async (req, res) => {
  try {
    const { q } = req.query;
    const experiences = await Experience.find({
      title: { $regex: q, $options: 'i' }
    });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// bulk upload multiple experiences at once
const bulkUploadExperiences = async (req, res) => {
  try {
    const experiences = req.body;
    if (!Array.isArray(experiences)) {
      return res.status(400).json({ message: 'Request body must be an array of experiences' });
    }
    
    await Experience.deleteMany({});
    const savedExperiences = await Experience.insertMany(experiences);
    res.status(201).json({ 
      message: 'Experiences uploaded successfully', 
      count: savedExperiences.length,
      data: savedExperiences 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export {
  getAllExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  searchExperiences,
  bulkUploadExperiences
};