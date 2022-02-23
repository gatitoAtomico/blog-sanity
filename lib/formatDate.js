const formatDate = (date) => {
  const localeDate = new Date(date);

  let options = {
    // weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return localeDate.toLocaleString("en", options);
  // console.log(localeDate.toLocaleString("en", options));
};

export default formatDate;
