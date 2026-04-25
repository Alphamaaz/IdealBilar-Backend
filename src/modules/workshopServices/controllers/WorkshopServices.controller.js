import { createWorkshopService, deleteWorkshopService, getAllWorkshopServices, getWorkshopServiceById, updateWorkshopService } from "../services/WorkshopServices.service.js";
import { createWorkshopServiceValidation } from "../validations/WorkshopServices.validation.js";

const createWorkshopController = async (req, res) => {
    try {
        const validatedData = createWorkshopServiceValidation.parse(req.body);
        const workshopService = await createWorkshopService(validatedData)
        res.status(201).json({
            success: true,
            message: "Workshop service created successfully",
            data: workshopService
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create workshop service",
            error: error.message
        });
    }
}

const getAllWorkshopServicesController = async (req, res) => {
    try {
        const workshopServices = await getAllWorkshopServices();
        res.status(200).json({
            success: true,
            message: "Workshop services fetched successfully",
            data: workshopServices
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch workshop services",
            error: error.message
        });
    }
}

const getSingleWorkshopServiceController = async (req, res) => {
    try {
        const workshopService = await getWorkshopServiceById(req.params.id);
        res.status(200).json({
            success: true,
            message: "Workshop service fetched successfully",
            data: workshopService
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch workshop service",
            error: error.message
        });
    }
}

const updateWorkshopServiceController = async (req, res) => {
    try {
        const workshopService = await updateWorkshopService(req.params.id, req.body);
        res.status(200).json({
            success: true,
            message: "Workshop service updated successfully",
            data: workshopService
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update workshop service",
            error: error.message
        });
    }
}

const deleteWorkshopServiceController = async (req, res) => {
    try {
        const workshopService = await deleteWorkshopService(req.params.id);
        res.status(200).json({
            success: true,
            message: "Workshop service deleted successfully",

        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete workshop service",
            error: error.message
        });
    }
}

export { createWorkshopController, getAllWorkshopServicesController, getSingleWorkshopServiceController, updateWorkshopServiceController, deleteWorkshopServiceController };