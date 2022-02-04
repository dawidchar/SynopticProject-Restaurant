# Deployment Instructions

I will provide instructions on how to create a new firebase project and link it up to the app, deploying the app can be done to any service, I chose GCP (I won't show this here), the main thing to consider is secrets managment for the API, (As the Nuxt app does not require any auth keys/secrets), secrets can be injected through Enviroment Varibles, which most services allow for or can be done through a secrets file, I explained this in the `README.md` file in the `/src/api` folder.

## Creating a New Project and Linking it up

1. Create a new **Firebase Project** (You will need a Google Account)
2. Create a new Web App - This should give you a `firebaseConfig` object
3. Copy the contents of the `firebaseConfig` into the `/src/nuxt/config/firebase.config.js` file
4. Go back to Firebase, Go to the Authentication Tab on the side, Then enable **Email/Password** Authentication.
5. Still in Firebase, Go to the **Firestore Database** tab, also on the side, initialize firestore, when asked what region/location you want to select the _europe-west2_ (London)
6. Create the following collections, it will require you to also create a document, create a blank document, it can be anything
    - users
    - basket
    - bookings
    - menu
    - orders

This is the front app done, let's quickly set up the API

7. In Firebase, go to your project setting, typically a cog wheel at the top of the sidebar, then go to Service Accounts and click **Generate new private key**, this should download a new sercrets files that contains keys, place this file in the `/src/api/keys` folder and rename it to `service-account-file.secret.json`, then create a `.env` file in the root of the api folder `/src/api` and add the following line: <br> `GOOGLE_APPLICATION_CREDENTIALS="./keys/service-account-file.secret.json"`

8. All done! The App should now be fully functionaly using your own config! You can now run the app as per the instructions in the main **README.md** file
9. Feel free to also edit the app config file `/src/nuxt/config/app.config.js` to tailor the application to your own needs.

---
Deploying the Nuxt app can be done to any service of your choice, it does not need to be deployed to GCP, everything should work without issue.

Deploying the API is also not limited to GCP, you just need to consider how to manage the secrets file in a secure way as the secrets file contains the authentication details to a service account that has unrestricted access to your whole firebase project.