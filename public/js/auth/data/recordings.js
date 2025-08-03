import { openDB } from "idb";

const DB_NAME = "japasafe_recordings";
const STORE_NAME = "practice_sessions";

const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(STORE_NAME, { keyPath: "id" });
    }
  });
};

export const saveRecording = async (blob) => {
  const db = await initDB();
  const id = Date.now();
  await db.put(STORE_NAME, {
    id,
    blob,
    timestamp: new Date()
  });
  return id;
};

export const getRecording = async (id) => {
  const db = await initDB();
  return db.get(STORE_NAME, id);
};

export const getAllRecordings = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};
