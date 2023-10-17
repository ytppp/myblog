/**
 *  T | null 包装
 */
export type Nullable<T> = T | null;

/**
 * 字符串类型对象
 */
export type Recordable<T = any> = Record<string, T>;