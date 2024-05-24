import {binanceWsInjectable} from "../external-api/binance-ws.injectable";
import {onUnmounted, Ref, ref, watch} from "vue";
import {Subscription} from "rxjs";
import {Order, OrderItem} from "../types";
import {RestMarketTypes} from "@binance/connector-typescript";
import {binanceApiInjectable} from "../external-api/binance-api.injectable";

function isOrderItem(arg: any): arg is OrderItem {
  return !!arg
    && typeof arg === 'object'
    && Array.isArray(arg.a)
    && Array.isArray(arg.b)
}

const options: RestMarketTypes.orderBookOptions = {
  limit: 100,
};


export function useOrderBook(symbols: Readonly<Ref<string[]>>) {
  const askOrders = ref<Order[]>([])
  const bidOrders = ref<Order[]>([])

  const {subscribeForSymbols} = binanceWsInjectable.inject()
  const {client} = binanceApiInjectable.inject()

  let subscription: Subscription | null = null

  watch(symbols, async (value, oldValue) => {
    const formattedSymbol = value[0].split('@')[0].toUpperCase();

    const binanceApiRes = await client.orderBook(formattedSymbol, options)

    askOrders.value = binanceApiRes.asks.map(it => it.map(parseFloat) as Order)
    bidOrders.value = binanceApiRes.bids.map(it => it.map(parseFloat) as Order)

    if (subscription && oldValue) subscription.unsubscribe()

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
