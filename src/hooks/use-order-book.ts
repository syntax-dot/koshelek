import {binanceWsInjectable} from "../external-api/binance-ws.injectable";
import {onUnmounted, Ref, ref, watch} from "vue";
import {Subscription} from "rxjs";
import {Order, OrderItem} from "../types";
import {RestMarketTypes} from "@binance/connector-typescript";
import {binanceApiInjectable} from "../external-api/binance-api.injectable";
import {AxiosResponse} from "axios";

function isOrderItem(arg: any): arg is OrderItem {
  return !!arg
    && typeof arg === 'object'
    && Array.isArray(arg.a)
    && Array.isArray(arg.b)
}


export function useOrderBook(symbols: Readonly<Ref<string[]>>, limit: Readonly<Ref<number>>) {
  const askOrders = ref<Order[]>([])
  const bidOrders = ref<Order[]>([])

  const {subscribeForSymbols} = binanceWsInjectable.inject()
  const {client} = binanceApiInjectable.inject()

  let subscription: Subscription | null = null

  watch(() => [symbols.value, limit.value], async () => {
    const formattedSymbol = symbols.value[0].split('@')[0].toUpperCase();

    try {
      // TODO not working in hosting
      // const binanceApiRes = await client.orderBook(formattedSymbol, options)

      const {data: binanceApiRes}: AxiosResponse<RestMarketTypes.orderBookResponse> = await client.get('/depth', {
        params: {
          limit: limit.value,
          symbol: formattedSymbol
        }
      })

      if (binanceApiRes.bids && binanceApiRes.asks) {
        askOrders.value = binanceApiRes.asks.map(it => it.map(parseFloat) as Order)
        bidOrders.value = binanceApiRes.bids.map(it => it.map(parseFloat) as Order)
      }
    } catch (e) {
      console.error('binanceApi ERROR:', e)
    }

    if (subscription) subscription.unsubscribe()

    const pair$ = subscribeForSymbols(symbols.value)

    subscription = pair$.subscribe((msg) => {
      if (!isOrderItem(msg)) return

      const updateForAsks = msg.a.map(it => it.map(parseFloat) as Order)
      const updateForBids = msg.b.map(it => it.map(parseFloat) as Order)
      const mappedAsks = new Map([...askOrders.value, ...updateForAsks])
      const mappedBids = new Map([...bidOrders.value, ...updateForBids])

      askOrders.value = Array.from(mappedAsks).slice(0, limit.value).filter(it => it[1] !== 0)
      bidOrders.value = Array.from(mappedBids).slice(0, limit.value).filter(it => it[1] !== 0)
    })

  }, {immediate: true})

  onUnmounted(() => subscription.unsubscribe())

  return {askOrders, bidOrders}
}
