
import showroomService from '../services/showroom.service.js';
import { createShowroomLocationSchema, updateShowroomLocationSchema } from '../validators/showroom.validator.js';

const sendValidationError = (res, error) => {
    if (error?.issues) {
        return res.status(400).json({
            success: false,
            message: error.issues.map((issue) => issue.message).join(', '),
        });
    }

    return res.status(500).json({ success: false, message: error.message });
};

const createShowroomLocation = async (req, res) => {
    try {
        const validatedData = await createShowroomLocationSchema.parseAsync(req.body);
        const showroomLocation = await showroomService.createLocation(validatedData);
        res.status(201).json({ success: true, message: 'Showroom location created successfully', showroomLocation });
    } catch (error) {
        sendValidationError(res, error);
    }
};

const getAllShowroomLocations = async (req, res) => {
    try {
        const showroomLocations = await showroomService.getAllShowroomLocations();  
        res.status(200).json({ success: true, message: 'Showroom locations retrieved successfully', showroomLocations });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateShowroomLocation = async (req, res) => {
    try {
        const { id } = req.params;
        const validatedData = await updateShowroomLocationSchema.parseAsync(req.body);
        const showroomLocation = await showroomService.updateLocation(id, validatedData);
        res.status(200).json({ success: true, message: 'Showroom location updated successfully', showroomLocation });
    } catch (error) {
        sendValidationError(res, error);
    }
};

const deleteShowroomLocation = async (req, res) => {
    try {
        const { id } = req.params;
        const showroomLocation = await showroomService.deleteLocation(id);
        res.status(200).json({ success: true, message: 'Showroom location deleted successfully', showroomLocation });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export default {
    createShowroomLocation,
    getAllShowroomLocations,
    updateShowroomLocation,
    deleteShowroomLocation
};
