// Define Sanity Client to make the request to Sanity API
import SanityClient from "@sanity/client";

const options = {
  dataset: process.env.SANITY_DATASET_NAME,
  projectId: process.env.SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
  //useCdn === true, gives you fast response, with cached data
  //useCdn === false, gives you a little bit slower response, but latest data
};

export default SanityClient(options);
