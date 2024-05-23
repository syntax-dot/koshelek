import {ref} from "vue";

const dbName = "logs_db";

export interface LogTransaction {
  timestamp: number;
  oldValue: string;
  newValue: string;
}

export function useIndexedDb() {
  const db = ref<IDBDatabase | null>(null);

  const addTransaction = (transaction: LogTransaction) => {
    console.log('db', db.value)
    if (!db.value) {
      console.error('Database is not initialized');
      return;
    }

    const transactionStore = db.value.transaction([dbName], "readwrite").objectStore(dbName);
    console.log('transactionStore', transactionStore)
    transactionStore.add(transaction);
  };

  const initDb = () => {
    const logsDbRequest = indexedDB.open(dbName);

    logsDbRequest.onupgradeneeded = (event) => {
      const database = logsDbRequest.result;
      if (!database.objectStoreNames.contains(dbName)) {
        database.createObjectStore(dbName, {keyPath: 'timestamp', autoIncrement: true});
      }
    };

    logsDbRequest.onsuccess = () => {
      const database = logsDbRequest.result;
      database.onversionchange = async () => {
        database.close();
        alert("База данных устарела, пожалуйста, перезагрузите страницу.");
        await new Promise(resolve => setTimeout(resolve, 3000));
        window.location.reload();
      };
      db.value = database;
    };

    logsDbRequest.onerror = (error) => {
      console.error("IndexedDb Error", error);
    };
  };

  initDb();

  return {addTransaction}
}
