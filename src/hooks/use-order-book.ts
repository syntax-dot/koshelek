import {binanceWsInjectable} from "../external-api/binance-ws.injectable";
import {onUnmounted, Ref, ref, watch} from "vue";
import {Subscription} from "rxjs";

export interface OrderItem {
  E: number
  T: number
  U: number
  a: [string, string][]
  b: [string, string][]
  e: string
  pu: number
  s: string
  u: number
}

type Order = [number, number]

function isOrderItem(arg: any): arg is OrderItem {
  return !!arg
    && typeof arg === 'object'
    && Array.isArray(arg.a)
    && Array.isArray(arg.b)
}

export function useOrderBook(symbols: Readonly<Ref<string[]>>) {
  const askOrders = ref<Order[]>([])
  const bidOrders = ref<Order[]>([])

  const {subscribeForSymbols} = binanceWsInjectable.inject()

  let subscription: Subscription | null = null

  watch(symbols, (value, oldValue) => {
    if (subscription) subscription.unsubscribe()

    const pair$ = subscribeForSymbols(value)

    subscription = pair$.subscribe((msg) => {
      if (!isOrderItem(msg)) return

      askOrders.value = msg.a.map(it => it.map(parseFloat) as Order)
      bidOrders.value = msg.b.map(it => it.map(parseFloat) as Order)
    })

  }, {immediate: true})

  onUnmounted(() => subscription.unsubscribe())

  return {askOrders, bidOrders}
}
