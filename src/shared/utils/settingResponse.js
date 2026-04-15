const settingResponse = (res, result) => {
  console.log("We are in the settingResponse function ", result.status);
  
  return res.status(result.status).json({
    success: false,
    error: `${result.field ? result.field + " is required." + result.messages : result.message}`
  });
};


export default settingResponse;
