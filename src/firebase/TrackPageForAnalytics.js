import { GA4React } from "ga-4-react";

const ga4react = new GA4React(
  process.env.REACT_APP_API_MEASUREMENT_ID
).initialize();

const trackPathForAnalytics = (data) => {
  const { path } = data;
  ga4react
    .then((ga) => {
      ga.pageview(path);
    })
    .catch((err) => console.error(`Analytics failed: ${err}`));
};

export default trackPathForAnalytics;
