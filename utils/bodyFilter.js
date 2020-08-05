module.exports = (reqBody, ...fieldsToInclude) => {
  const filteredBody = {};
  fieldsToInclude.forEach((field) => {
    if (reqBody[field]) filteredBody[field] = reqBody[field];
  });
  return filteredBody;
};
