declare module "ziyou" {
    /**
    * 注册控制器，控制器的path必须和事件方法的path有着相同起始路径
    */
    declare function Controller(name: string): void;

    /**
    * 事件方法，控制器的path必须和事件方法的path有着相同起始路径
    * @dataHandle 是否需要数据处理函数处理数据
    */
    declare function RequestMapping(controllerName: string, action: string, keys?: Array<string>, dataHandle?: boolean): void;

    declare class Sender {
        constructor();

        /**
        * 激发事件时传来的参数
        */
        args: any;

        /**
        * 数据处理成功完成后，需要调用的回调函数
        */
        resolve(result: any): void;

        /**
        * 数据处理异常完成后，需要调用的回调函数
        */
        reject(result: any): void;
    }

    declare class Router {
        constructor();

        /**
        * 统一激发事件路由的方法
        */
        Dispatch(controllerName: string, action: string, args?: any): void;

        /**
        * 统一处理数据的方法
        */
        OnDataHandler(callBack?: (controllerName: string, action: string, sender: Sender) => void): void;
    }

    declare var router: Router;
}