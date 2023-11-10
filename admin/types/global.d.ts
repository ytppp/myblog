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

declare module '*.vue' {
  import { DefineComponent } from 'vue';

  const Component: DefineComponent<{}, {}, any>;
  export default Component;
}

// ==============

type Partial<T> = {
  [P in keyof T]?: T[P];  
};

type Required<T> = {
  [P in keyof T]-?: T[P];  
};

type Readonly<T> = {
  readonly [P in keyof T]: T[P];  
};

type Pick<T, K extends keyof T> = {
  [P in K]: T[P];  
};