import { getAuth } from "firebase/auth";

import {
  addDoc,
  setDoc,
  getDoc,
  updateDoc,
  doc,
  collection,
  getFirestore,
  query,
  where,
  onSnapshot,
  orderBy,
  getDocs,
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

export const sendMessage = async ({ roomId, uid, displayName, text }) => {
  const db = getFirestore();
  const message = createMessage(uid, displayName, text);

  await addDoc(collection(db, `users/${roomId}/messages`), message);
};

export const writeLastMessageToDataBase = async (roomId, lastMessage) => {
  const db = getFirestore();

  await updateDoc(doc(db, `users/${roomId}`), {
    lastMessage,
  });
};

const getQueryForUsers = (type) => {
  const db = getFirestore();
  const condition = type === "admin" ? "==" : "!=";
  return query(collection(db, "users"), where("role", condition, "admin"));
};

export const getUsers = async (type) => {
  const q = getQueryForUsers(type);
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => doc.data());
};

export const subscribeUsers = (type, cb) => {
  const q = getQueryForUsers(type);

  return onSnapshot(
    q,
    (querySnapshot) => {
      cb(querySnapshot);
    },
    (err) => {
      console.log(err);
    }
  );
};

const getQueryForMessages = (roomId) => {
  const db = getFirestore();
  return query(
    collection(db, `users/${roomId}/messages`),
    orderBy("createdAt")
  );
};

export const getMessages = async (roomId) => {
  const q = getQueryForMessages(roomId);
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => doc.data());
};

export const subscribeMessages = (roomId, cb) => {
  const q = getQueryForMessages(roomId);

  return onSnapshot(
    q,
    (querySnapshot) => {
      cb(querySnapshot);
    },
    (err) => {
      console.log(err);
    }
  );
};
