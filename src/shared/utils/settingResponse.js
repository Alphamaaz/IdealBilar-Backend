const settingResponse = (res, result) => {
  console.log("We are in the settingResponse function ", result.status);
  
  return res.status(result.status || 500).json({
    success: false,
    error: `${result.field ? result.field + " is required." + result.messages : result.message || "An unexpected error occurred"}`
  });
};


export default settingResponse;
