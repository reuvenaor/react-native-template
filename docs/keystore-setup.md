# Generating a Keystore for Android

This guide explains how to generate a keystore file required for signing and publishing your Android application to the Google Play Store.

## 1. Generate the Keystore

Open your terminal and run the following command. This will create a keystore file named `exapp-release-key.keystore` with an alias `exapp-alias`.

```bash
keytool -genkeypair -v -storetype PKCS12 -keystore exapp-release-key.keystore -alias exapp-alias -keyalg RSA -keysize 2048 -validity 10000
```

You will be prompted to create a password for the keystore and the key. Make sure to remember these passwords.

## 2. Configure Your Project

After generating the key, you need to:

1.  Move the `exapp-release-key.keystore` file to the `android/app/keystores/` directory.
2.  Create or update the `android/app/gradle.properties` file with your keystore credentials:

    ```properties
    EXAPP_RELEASE_STORE_FILE=keystores/exapp-release-key.keystore
    EXAPP_RELEASE_KEY_ALIAS=exapp-alias
    EXAPP_RELEASE_STORE_PASSWORD=YOUR_STORE_PASSWORD
    EXAPP_RELEASE_KEY_PASSWORD=YOUR_KEY_PASSWORD
    ```

    Replace `YOUR_STORE_PASSWORD` and `YOUR_KEY_PASSWORD` with the passwords you created in the previous step. 