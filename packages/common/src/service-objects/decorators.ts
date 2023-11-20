import * as OBJECTS from "./objects";

/**
 * 
 */
export function IsService() {
    return <U extends OBJECTS.IServiceConstructor>(constructor: U) => { constructor };
}
/**
 * 
 */
export function IsServiceExecutor() {
    return <U extends OBJECTS.IServiceExecutorConstructor>(constructor: U) => { constructor };
}

/**
 * 
 */
export function IsServiceRepository() {
    return <U extends OBJECTS.IServiceRepositoryConstructor>(constructor: U) => { constructor };
}

/* class decorator to implement given type*/
// function Implements<T>() {
//     return <U extends T>(constructor: U) => {constructor};
// }
// @Implements<MyType>()   /* this statement implements both normal interface & static interface */
// class MyServiceClass { /* implements MyType { */ /* so this become optional not required */

//     /**
//      * 
//      * @param request 
//      */
//     execute(context: IServiceContext<One>): Two {
//         return {}
//     }
// }
