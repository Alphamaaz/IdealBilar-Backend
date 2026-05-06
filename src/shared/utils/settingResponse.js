const settingResponse = (res, result) => {
  return res.status(result.status || 500).json({
    success: false,
    error: `${result.field ? result.field + " is required." + result.messages : result.message || "An unexpected error occurred"}`
  });
};


export default settingResponse;
