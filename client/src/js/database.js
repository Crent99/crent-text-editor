import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  try {
    const db = await openDB("jate", 1);
    const tx = db.transaction("jate", "readwrite");
    const store = tx.objectStore("jate");
    const data = { content };
    await store.put(data);
    await tx.done;
    console.log("Data added or updated successfully", data);
  } catch (error) {
    console.error("Error adding or updating data:", error);
  }
};

export const getDb = async () => {
  try {
    const db = await openDB("jate", 1);
    const tx = db.transaction("jate", "readonly");
    const store = tx.objectStore("jate");
    const data = await store.getAll();
    return data;
  } catch (error) {
    console.error("Error getting data:", error);
    return [];
  }
};

initdb();
