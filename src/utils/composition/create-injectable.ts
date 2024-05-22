import {uniqueId} from 'lodash'
import {InjectionKey, provide as vueProvide} from 'vue'
import {createInjector} from './create-injector'

interface Injectable<T, A extends any[]> {
  provide(...args: A): T

  inject(): T
}

export function createInjectable<T, A extends any[]>(
  factory: (...args: A) => T,
  prefix = 'injectable'
): Injectable<T, A> {
  const key: InjectionKey<T> = Symbol.for(uniqueId(prefix))

  function provide(...args: A) {
    const data = factory(...args)

    vueProvide(key, data)

    return data
  }

  const inject = createInjector(key)

  return {
    inject,
    provide
  }
}
