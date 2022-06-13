import { getAuth } from "firebase/auth";

import {
  addDoc,
  setDoc,
  getDoc,
  doc,
  collection,
  getFirestore,
} from "firebase/firestore";

export const getUid = () => getAuth().currentUser?.uid;

export const writeUserRole = async (uid, role) => {
  const db = getFirestore();
  await setDoc(doc(db, `users/${uid}`), {
    role,
  });
};

export const getUserData = async (uid) => {
  const db = getFirestore();
  const snapshot = await getDoc(doc(db, `users/${uid}`));

  return snapshot.exists() ? snapshot.data() : {};
};

export const sendMessage = async (uid, displayName, message) => {
  const db = getFirestore();
  await addDoc(collection(db, `room-${uid}`), {
    uid,
    name: displayName,
    message,
    createdAt: Date.now(),
  });
};
