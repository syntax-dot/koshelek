import {computed, Ref} from "vue";
import {groupBy, last, mapValues, round, sum, toPairs} from "lodash";

export function useGroupedItems(items: Readonly<Ref<[number, number][]>>, precision: Readonly<Ref<number | null>>) {
  return computed(() => {
      const groupedItems = groupBy(
        items.value,
        precision.value
          ? (el) => round(el[0] / precision.value) * precision.value
          : (el) => el[0]
      )
      return toPairs(mapValues(groupedItems, (values) => round(sum(values.map(last)), 2)))
    }
  )
}
