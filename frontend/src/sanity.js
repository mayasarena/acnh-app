import {createClient} from '@sanity/client';

export const client = createClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2023-09-04',
  useCdn: false,
  token: process.env.REACT_APP_SANITY_TOKEN,
});