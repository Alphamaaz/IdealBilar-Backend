import mongoose from "mongoose";

const workshopServicesSchema = new mongoose.Schema({
    serviceName: {
        type: String,
        required: true
    },
    serviceDescription: {
        type: String,
        required: true
    },
    serviceImage: {
        type: String,
    },
    serviceStatus: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },
    details: {
        type: String,
    },
    serviceCreatedAt: {
        type: Date,
        default: Date.now
    },
    serviceUpdatedAt: {
        type: Date,
        default: Date.now
    }
})

const WorkshopServices = mongoose.model("WorkshopServices", workshopServicesSchema);
export default WorkshopServices;
