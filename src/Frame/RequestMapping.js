import { router } from './Router.js';

export function RequestMapping(controllerName, action, keys, dataHandle) {
    return function (target, key, descriptor) {
        router.AddRequestMapping(controllerName, action, keys, descriptor, dataHandle);
        return descriptor;
    }
}

