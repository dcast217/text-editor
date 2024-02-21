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

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    const db = await initdb(); // Initialize the IndexedDB database
    const transaction = db.transaction('storeName', 'readwrite'); // Specify the object store name and read/write mode
    const store = transaction.objectStore('storeName'); // Access the object store

    // Add the content to the object store
    const request = store.add({ content });

    request.onsuccess = () => {
      console.log('Content added to the database');
    };

    request.onerror = (error) => {
      console.error('Error adding content to the database:', error);
    };
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    const db = await initdb(); // Initialize the IndexedDB database
    const transaction = db.transaction('storeName', 'readonly'); // Specify the object store name and read-only mode
    const store = transaction.objectStore('storeName'); // Access the object store

    // Get all content from the object store
    const request = store.getAll();

    request.onsuccess = () => {
      const allContent = request.result;
      console.log('All content retrieved from the database:', allContent);
    };

    request.onerror = (error) => {
      console.error('Error getting content from the database:', error);
    };
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};
