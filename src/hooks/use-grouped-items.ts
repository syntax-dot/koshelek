import {computed, Ref} from "vue";
import {groupBy, last, mapValues, sum, toPairs} from "lodash";

export function useGroupedItems(items: Readonly<Ref<[number, number][]>>, precision: Readonly<Ref<number>>) {
  return computed(() => {
      const asd = groupBy(
        items.value,
        (el) => Math.round(el[0] / precision.value) * precision.value
      )
      return toPairs(mapValues(asd, (values) => sum(values.map(last))))
    }
  )
}
