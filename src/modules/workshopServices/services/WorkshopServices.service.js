import WorkshopServices from "../models/workshopServices.model.js";

const mapWorkshopServicePayload = (data = {}) => {
    const update = {};

    if (data.name !== undefined || data.serviceName !== undefined) {
        update.serviceName = data.name ?? data.serviceName;
    }
    if (data.description !== undefined || data.serviceDescription !== undefined) {
        update.serviceDescription = data.description ?? data.serviceDescription;
    }
    if (data.image !== undefined || data.serviceImage !== undefined) {
        update.serviceImage = data.image ?? data.serviceImage;
    }
    if (data.status !== undefined || data.serviceStatus !== undefined) {
        update.serviceStatus = data.status ?? data.serviceStatus;
    }
    if (data.details !== undefined) {
        update.details = data.details;
    }

    update.serviceUpdatedAt = new Date();
    return update;
};

const createWorkshopService = async (validatedData) => {
    try {
        const workshopService = await WorkshopServices.create(mapWorkshopServicePayload(validatedData));
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
        const workshopService = await WorkshopServices.findByIdAndUpdate(
            id,
            mapWorkshopServicePayload(validatedData),
            { returnDocument: "after", runValidators: true }
        );
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
