const settingResponse = (res, result) => {
  return res.status(result.status).json({
    success: false,
    error: `${result.field ? result.field + " is required." : result.messages}`,
  });
};


export default settingResponse;
