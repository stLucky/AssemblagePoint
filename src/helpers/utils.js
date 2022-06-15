export const getTimestampDay = (timestamp) => {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return new Date(year, month, day).getTime();
};

export const getLocaleDate = (timestamp) => {
  const options = {
    month: "long",
    day: "numeric",
  };

  const currentYear = new Date().getFullYear();
  const incomingYear = new Date(timestamp).getFullYear();

  if (currentYear !== incomingYear) {
    options.year = "numeric";
  }

  return new Date(timestamp).toLocaleString("ru", options);
};
