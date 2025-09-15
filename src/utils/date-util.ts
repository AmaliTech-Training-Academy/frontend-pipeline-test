export const getCurrentDateString = () => {
  return new Date().toISOString().split("T")[0];
};
