// /// <reference types="node" />
//
// // Extend the NodeJS namespace with Next.js-defined properties
// declare namespace NodeJS {
//   interface Process {
//     readonly browser: boolean
//   }
//
//   interface ProcessEnv {
//     readonly NODE_ENV: 'development' | 'production' | 'test'
//   }
// }
//
declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}
//
// declare module "*.svg" {
//   const value: any;
//   export default value;
// }
//
// interface Window {
//   MSInputMethodContext?: unknown
// }
