## Directories

### `nuxt`

The Front End app which includes the server that serves the web app. The bulk of the app directly communicates with Google's APIs for both Authentication and the Database.

The Database is secured using security rules - so even though direct access is available, it is still protected and actions like editing and deleting are restricted to admin accounts only.

### `api`

This folder contains the source code for the cloud function that acts as the backend API and is deployed to the Google Cloud Platform and is used when a user needs to write something to the Database but we want to ensure the backend verifies the integrity of the submitted payload. (Admins can write directly with no restrictions)

This Cloud functions can only run locally when provided with the appropriate authentication keys from the Google Cloud Platform Identity and Access Management Service, which I can provide on request. The Nuxt App should work without issue as there is a flag in `/src/nuxt/config/endpoints` that forces it to use production services (Which have the appropriate permissions)

