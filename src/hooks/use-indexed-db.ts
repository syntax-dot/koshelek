import {ref} from "vue";

const dbName = "logs_db";

export interface LogTransaction {
  timestamp: number;
  oldValue: string;
  newValue: string;
}

const dbSchema = [
  {name: 'oldValue', keyPath: 'oldValue'},
  {name: 'newValue', keyPath: 'newValue'},
  {name: 'timestamp', keyPath: 'timestamp', unique: true},
]

export function useIndexedDb() {
  const db = ref<IDBDatabase | null>(null);

  const getAll = () => {
    return new Promise<LogTransaction[]>((resolve, reject) => {
      if (!db.value) return

      const transaction = db.value.transaction([dbName], "readonly");
      const objectStore = transaction.objectStore(dbName);
      const getAllRequest = objectStore.getAll();

      getAllRequest.onsuccess = () => {
        const transactions: LogTransaction[] = getAllRequest.result;
        resolve(transactions);
      };

      getAllRequest.onerror = () => {
        reject('Error fetching data from object store');
      };
    });
  };

  const addTransaction = (transaction: LogTransaction) => {
    console.log('db', db.value)
    if (!db.value) return;

    if (!db.value.objectStoreNames.contains(dbName)) return

    const transactionStore = db.value.transaction([dbName], "readwrite").objectStore(dbName);
    console.log('transactionStore', transactionStore)
    transactionStore.add(transaction);
  };

  const initDb = () => {
    const logsDbRequest = indexedDB.open(dbName);

    logsDbRequest.onupgradeneeded = (event) => {
      const database = logsDbRequest.result;
      if (!database.objectStoreNames.contains(dbName)) {
        const objectStore = database.createObjectStore(dbName, {keyPath: 'timestamp', autoIncrement: true});
        dbSchema.forEach(({name, keyPath, unique}) => {
          objectStore.createIndex(name, keyPath, {unique: unique ?? false});
        })
      }
    };

    logsDbRequest.onsuccess = () => {
      const database = logsDbRequest.result;
      db.value = database;

      database.onversionchange = async () => {
        database.close();
        alert("База данных устарела, пожалуйста, перезагрузите страницу.");
        await new Promise(resolve => setTimeout(resolve, 3000));
        window.location.reload();
      };
    };

    logsDbRequest.onerror = (error) => {
      console.error("IndexedDb Error", error);
    };
  };

  initDb();

  return {addTransaction, getAll}
}
