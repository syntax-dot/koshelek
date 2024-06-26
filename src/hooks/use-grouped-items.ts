import {computed, Ref} from "vue";
import {groupBy, last, mapValues, sum, toPairs} from "lodash";

export function useGroupedItems(items: Readonly<Ref<[number, number][]>>, precision: Readonly<Ref<number | null>>) {
  return computed(() => {
      const groupedItems = groupBy(
        items.value,
        precision.value
          ? (el) => (el[0] / precision.value) * precision.value
          : (el) => el[0]
      )
      return toPairs(mapValues(groupedItems, (values) => sum(values.map(last))))
    }
  )
}
