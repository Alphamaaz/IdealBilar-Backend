
import showroomService from '../services/showroom.service.js';
import { createShowroomLocationSchema, updateShowroomLocationSchema } from '../validators/showroom.validator.js';

const createShowroomLocation = async (req, res) => {
    try {
        const validatedData = await createShowroomLocationSchema.parseAsync(req.body);
        const showroomLocation = await showroomService.createLocation(validatedData);
        res.status(201).json({ message: 'Showroom location created successfully', showroomLocation });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllShowroomLocations = async (req, res) => {
    try {
        const showroomLocations = await showroomService.getAllShowroomLocations();  
        res.status(200).json({ message: 'Showroom locations retrieved successfully', showroomLocations });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateShowroomLocation = async (req, res) => {
    try {
        const { id } = req.params;
        const validatedData = await updateShowroomLocationSchema.parseAsync(req.body);
        const showroomLocation = await showroomService.updateLocation(id, validatedData);
        res.status(200).json({ message: 'Showroom location updated successfully', showroomLocation });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteShowroomLocation = async (req, res) => {
    try {
        const { id } = req.params;
        const showroomLocation = await showroomService.deleteLocation(id);
        res.status(200).json({ message: 'Showroom location deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default {
    createShowroomLocation,
    getAllShowroomLocations,
    updateShowroomLocation,
    deleteShowroomLocation
};