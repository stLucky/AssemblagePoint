import { setDoc, getDoc, doc, getFirestore } from "firebase/firestore";

export const writeUserData = (uid, email, name) => {
  const db = getFirestore();
  setDoc(doc(db, `users/${uid}`), {
    email,
    name,
  });
};

export const getUserData = async (uid) => {
  const db = getFirestore();
  const snapshot = await getDoc(doc(db, `users/${uid}`));

  return snapshot.exists() ? snapshot.data() : {};
};
