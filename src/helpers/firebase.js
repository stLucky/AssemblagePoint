import { getAuth } from "firebase/auth";

import {
  addDoc,
  setDoc,
  getDoc,
  updateDoc,
  doc,
  collection,
  getFirestore,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const getUid = () => getAuth().currentUser?.uid;

export const writeUserToDatabase = async (user, role) => {
  const db = getFirestore();
  await setDoc(doc(db, `users/${user.uid}`), {
    ...user,
    role,
  });
};

export const getUserFromDatabase = async (uid) => {
  const db = getFirestore();
  const snapshot = await getDoc(doc(db, `users/${uid}`));

  return snapshot.exists() ? snapshot.data() : {};
};

const createMessage = (uid, displayName, text) => ({
  uid,
  name: displayName,
  text,
  createdAt: Date.now(),
});

export const sendMessage = async ({ uid, displayName, text }) => {
  const db = getFirestore();
  const message = createMessage(uid, displayName, text);

  await addDoc(collection(db, `users/${uid}/messages`), message);
};

export const writeLastMessageToUser = async ({ uid, displayName, text }) => {
  const db = getFirestore();
  const message = createMessage(uid, displayName, text);

  await updateDoc(doc(db, `users/${uid}`), {
    lastMessage: message,
  });
};

export const getUsers = async (type) => {
  const db = getFirestore();
  const condition = type === "admin" ? "==" : "!=";
  const q = query(collection(db, "users"), where("role", condition, "admin"));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => doc.data());
};
