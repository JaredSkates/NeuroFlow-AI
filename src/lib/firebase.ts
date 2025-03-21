// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "neuroflow-ai-f1fb4.firebaseapp.com",
  projectId: "neuroflow-ai-f1fb4",
  storageBucket: "neuroflow-ai-f1fb4.firebasestorage.app",
  messagingSenderId: "440222011700",
  appId: "1:440222011700:web:2c766e50e5c59bf7445561",
  measurementId: "G-1JQ9EXR6TY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

// Upload to image to firebase
export async function uploadToFirebase(imageUrl: string, name: string) {
    try {
        const response = await fetch(imageUrl); // Fetch the imageUrl that's passed
        const buffer = await response.arrayBuffer(); // Convert the response to an arrayBuffer
        const file_name = name.replace(' ', '') + Date.now + '.jpeg.'; // File name for firebase to store
        const storageRef = ref(storage, file_name); // Create a reference to the storage location 

        // Upload the image to firebase storage
        await uploadBytes(storageRef, buffer, {
            contentType: 'image/jpeg',
        });

        // Get the url for the uploaded image and return it
        const firebase_url = await getDownloadURL(storageRef);
        return firebase_url; // Permanent url

    } catch(error) {console.error(error)}
}