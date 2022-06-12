import { getDatabase, ref, set } from "firebase/database";

export const writeUserData = (userId, email, name) => {
  const db = getDatabase();
  set(ref(db, `users/${userId}`), {
    name,
    email,
  });
};
