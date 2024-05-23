import {customRef} from "vue";

export function useSelectedPair() {
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return localStorage.getItem('selectedPair');
      },
      set(value) {
        localStorage.setItem('selectedPair', value);
        trigger()
      }
    }
  })
}
