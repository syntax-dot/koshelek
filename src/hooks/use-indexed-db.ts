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

  const getAll = async () => {
    if (!db.value) db.value = await initDb()

    return new Promise<LogTransaction[]>((resolve, reject) => {
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
    if (!db.value) {
      throw new Error('db does not exist');
    }

    if (!db.value.objectStoreNames.contains(dbName)) {
      throw new Error(`objectStoreNames does not contains ${dbName}`)
    }

    const transactionStore = db.value.transaction([dbName], "readwrite").objectStore(dbName);
    transactionStore.add(transaction);
  };

  const initDb = () => {
    return new Promise<IDBDatabase>((resolve, reject) => {
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

        resolve(database)

        database.onversionchange = async () => {
          database.close();
          alert("База данных устарела, пожалуйста, перезагрузите страницу.");
          await new Promise(resolve => setTimeout(resolve, 3000));
          window.location.reload();
        };
      };

      logsDbRequest.onerror = (error) => {
        console.error(error);
      };
    })
  };

  initDb();

  return {addTransaction, getAll}
}
