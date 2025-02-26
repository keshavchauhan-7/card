import React from "react";
import { View, StyleSheet, Button } from "react-native";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
    webClientId: "665272463850-vi4713gc08ae8ucnhcnht0i3pa56v0is.apps.googleusercontent.com",
});

export default function LoginScreen({ navigation }) {
    async function onGoogleButtonPress() {
        try {
            // Check if device supports Google Play Services
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

            // Sign-in user and get token
            const signInResult = await GoogleSignin.signIn();
            const idToken = signInResult.idToken;

            if (!idToken) throw new Error("No ID token found");

            // Create Firebase credential
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign in user with Firebase
            const userCredential = await auth().signInWithCredential(googleCredential);

            console.log("Google Sign In Success", userCredential.user.displayName);

            // Navigate to Profile screen & pass user data
            navigation.navigate("Profile", { username: userCredential.user.displayName });

        } catch (e) {
            console.error("Google Sign In Error:", e);
        }
    }

    return (
        <View style={styles.container}>
            <Button onPress={onGoogleButtonPress} title="Google Sign In" />
        </View>
    );
}

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
