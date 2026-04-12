const settingErrorStatusAndMessage = (error) => {
  console.log("We are in the setting Error status and message ", error);
  
  const validationErrors = new Error("Invalid user data");
  validationErrors.status = 400;
  validationErrors.field = error.issues[0].path[0];
  validationErrors.messages = error.issues[0].message;
  return validationErrors;
};

// exports

export default settingErrorStatusAndMessage;
