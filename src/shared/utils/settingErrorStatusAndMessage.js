//This funtion is only for validation error. If the validation if faild then this would be work proper

const settingErrorStatusAndMessage = (error) => {
  
  const validationErrors = new Error(error.issues[0].message);
  validationErrors.status = 409;
  validationErrors.field = error.issues[0].path[0];
  validationErrors.messages = error.issues[0].message;
  console.log("We are in the setting Error status and message ", error);
  return validationErrors;
};

// exports
export default settingErrorStatusAndMessage;