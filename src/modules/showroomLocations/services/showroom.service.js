import ShowroomLocation from '../model/location.model.js';

const createLocation = async (data) => {
  try {
    const showroomLocation = new ShowroomLocation(data);
    await showroomLocation.save();
    return showroomLocation;
  } catch (error) {
    throw new Error('Error creating showroom location: ' + error.message);
  }
};

const getAllShowroomLocations = async () => {
  try {
    return await ShowroomLocation.find({ isActive: true });
  } catch (error) {
    throw new Error('Error fetching showroom locations: ' + error.message);
  }
};

const updateLocation = async (id, data) => {
  try {
    const showroomLocation = await ShowroomLocation.findByIdAndUpdate(id, data, { new: true });
    if (!showroomLocation) {
      throw new Error('Showroom location not found');
    }
    return showroomLocation;
  } catch (error) {
    throw new Error('Error updating showroom location: ' + error.message);
  }
};

const deleteLocation = async (id) => {
  try {
    const showroomLocation = await ShowroomLocation.findByIdAndUpdate(id, { isActive: false }, { new: true });  
    if (!showroomLocation) {
      throw new Error('Showroom location not found');
    }
    return showroomLocation;
  } catch (error) {
    throw new Error('Error deleting showroom location: ' + error.message);
  }
};


export default {
  createLocation,
  getAllShowroomLocations,
    updateLocation,
    deleteLocation,
};