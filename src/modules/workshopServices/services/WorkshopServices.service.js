import WorkshopServices from "../models/workshopServices.model.js";

const createWorkshopService = async (validatedData) => {
    try {
        const { serviceName, serviceDescription, serviceImage, serviceStatus } = validatedData;
        const workshopService = await WorkshopServices.create({
            serviceName,
            serviceDescription,
            serviceImage,
            serviceStatus
        });
        return workshopService;
    } catch (error) {
        throw error;
    }
}

const getAllWorkshopServices = async () => {
    try {
        const workshopServices = await WorkshopServices.find();
        return workshopServices;
    } catch (error) {
        throw error;
    }
}

const getWorkshopServiceById = async (id) => {
    try {
        const workshopService = await WorkshopServices.findById(id);
        return workshopService;
    } catch (error) {
        throw error;
    }
}

const updateWorkshopService = async (id, validatedData) => {
    try {
        const workshopService = await WorkshopServices.findByIdAndUpdate(id, validatedData, { new: true });
        return workshopService;
    } catch (error) {
        throw error;
    }
}

const deleteWorkshopService = async (id) => {
    try {
        const workshopService = await WorkshopServices.findByIdAndDelete(id);
        return workshopService;
    } catch (error) {
        throw error;
    }
}

export { createWorkshopService, getAllWorkshopServices, getWorkshopServiceById, updateWorkshopService, deleteWorkshopService };