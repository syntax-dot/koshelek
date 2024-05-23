import {customRef} from "vue";
import {LogTransaction, useIndexedDb} from "./use-indexed-db";

const {addTransaction} = useIndexedDb()

export function useSelectedPair() {
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return localStorage.getItem('selectedPair');
      },
      set(value) {
        const changeLog: LogTransaction = {
          timestamp: Date.now(),
          newValue: value,
          oldValue: localStorage.getItem('selectedPair')
        }
        addTransaction(changeLog)
        localStorage.setItem('selectedPair', value);
        trigger()
      }
    }
  })
}
