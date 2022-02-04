# Le Restaurant API

This API will not run locally without the required auth keys/ Google Cloud Platform Service Account, the nuxt app is configured such that it by default should points to _production_ services (Can be found in `/src/nuxt/config/endpoints`) so it'll run without issue but will not hit this local API. If the auth keys are needed, feel free to contact me and I'll send them over.

### API Roles
Currently, the API only handles the following (As everything else is handled directly by fireauth and firestore)
- Booking a Table
- Placing an Order - By Using a User's Basket and on the backend, making it an order

## Enviroment Varibles - (Secrets/Keys)

The project uses **dotenv** so to run this project locally, add the following lines of config to the ``.env`` file (You might need to create one)

```ps1
GOOGLE_APPLICATION_CREDENTIALS="./keys/service-account-file.secret.json"
```