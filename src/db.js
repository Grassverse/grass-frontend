import firebase from "firebase/app";
import "firebase/firestore";

firebase.initializeApp({
  projectId: "grass-a3449",
  apiKey: "AIzaSyCcbRcmbdOymOq3HHYxXOPaZtuTq7ZGSB8",
  authDomain: "grass-a3449.firebaseapp.com",
});

const firestore = firebase.firestore();

const getUser = async (user) => {
  const data = await firestore
    .collection("users")
    .doc(user.toLowerCase())
    .get();

  if (data.exists) return { id: data.id, ...data.data() };

  return null;
};

export default getUser;
