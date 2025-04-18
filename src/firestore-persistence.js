import { enableIndexedDbPersistence } from 'firebase/firestore';
import { db } from './firebase';

export const initPersistence = () => {
  enableIndexedDbPersistence(db)
    .catch((err) => {
      if (err.code == 'failed-precondition') {
        console.warn("Persistence failed - multiple tabs open");
      }
    });
};