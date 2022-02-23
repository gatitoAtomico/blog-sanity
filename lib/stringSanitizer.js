const stringSanitizer = (a) => {
  let sanitizeString = a;
  if (sanitizeString) {
    return sanitizeString
      .trim() //might need polyfill if you need to support older browsers
      .toLowerCase()
      .replace(/\s/g, "") //remove spaces
      .replace(/([^A-Z0-9]+)(.)/gi); //match multiple non-letter/numbers followed by any character
  }
};

export default stringSanitizer;
