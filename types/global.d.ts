declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

/**
 *  T | null 包装
 */
declare type Nullable<T> = T | null;

/**
 * 字符串类型对象
 */
declare type Recordable<T = any> = Record<string, T>;