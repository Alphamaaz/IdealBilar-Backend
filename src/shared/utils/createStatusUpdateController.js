const createStatusUpdateController = ({ model, allowedStatuses, resourceName }) => {
  return async (req, res) => {
    try {
      const { status } = req.body;

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: `Invalid status. Allowed statuses: ${allowedStatuses.join(", ")}`,
        });
      }

      const updatedInquiry = await model.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true, runValidators: true },
      );

      if (!updatedInquiry) {
        return res.status(404).json({
          success: false,
          message: `${resourceName} not found`,
        });
      }

      return res.status(200).json({
        success: true,
        message: `${resourceName} status updated successfully`,
        data: updatedInquiry,
      });
    } catch (error) {
      if (error.name === "CastError") {
        return res.status(400).json({
          success: false,
          message: `Invalid ${resourceName.toLowerCase()} ID`,
        });
      }

      return res.status(500).json({
        success: false,
        message: `Failed to update ${resourceName.toLowerCase()} status`,
        error: error.message,
      });
    }
  };
};

export default createStatusUpdateController;
