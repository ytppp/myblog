
import { intersectionWith, isEqual, isArray, isObject, mergeWith, unionWith } from 'lodash-es';
import type { App, Component } from 'vue';

// https://github.com/vant-ui/vant/issues/8302
type EventShim = {
  new (...args: any[]): {
    $props: {
      onClick?: (...args: any[]) => void;
    };
  };
};

type WithInstall<T> = T & {
  install(app: App): void;
} & EventShim;

type CustomComponent = Component & { displayName?: string };

export function withInstall<T extends CustomComponent>(component: T, alias?: string) {
  (component as Record<string, unknown>).install = (app: App) => {
    const compName = component.name || component.displayName;
    if (!compName) return;
    app.component(compName, component);
    if (alias) {
      app.config.globalProperties[alias] = component;
    }
  };
  return component as WithInstall<T>;
};

/**
 * 递归合并两个对象。
 *
 * @param source 要合并的源对象。
 * @param target 目标对象，合并后结果存放于此。
 * @param mergeType 如何合并数组。默认为replace。
 *        - "union": 对数组执行并集操作。
 *        - "intersection": 对数组执行交集操作。
 *        - "concat": 连接数组。
 *        - "replace": 用目标数组替换源数组。
 * @returns 合并后的对象。
 */
export function deepMerge<T extends object | null | undefined, U extends object | null | undefined>(
  source: T,
  target: U,
  mergeType: 'union' | 'intersection' | 'concat' | 'replace' = 'replace'
): T & U {
  if (!target) {
    return source as T & U
  }
  if (!source) {
    return target as T & U
  }
  return mergeWith({}, source, target, (sourceValue, targetValue) => {
    if (isArray(targetValue) && isArray(sourceValue)) {
      switch (mergeType) {
        case 'union':
          return unionWith(sourceValue, targetValue, isEqual);
        case 'intersection':
          return intersectionWith(sourceValue, targetValue, isEqual);
        case 'concat':
          return sourceValue.concat(targetValue);
        case 'replace':
          return targetValue;
        default:
          throw new Error(`Unknown merge array strategy: ${mergeType as string}`);
      }
    }
    if (isObject(targetValue) && isObject(sourceValue)) {
      return deepMerge(sourceValue, targetValue, mergeType);
    }
    return undefined;
  })
}

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = '';
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
  }
  parameters = parameters.replace(/&$/, '');
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters;
}