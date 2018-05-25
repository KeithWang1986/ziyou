class RequestMappingPathWidthDescriptor {
    constructor(controllerName, action, keys = [], descriptor, dataHandle = false) {
        this.controllerName = controllerName;
        this.action = action;
        this.keys = keys;
        this.descriptor = descriptor;
        this.dataHandle = dataHandle;
    }
}

class Router {
    constructor() {
        this.controllers = {};
        this.mappings = {};
        this.dataHandler = null;
    }

    OnDataHandler(callback) {
        this.dataHandler = callback;
    }

    AddController(name, target) {
        let controller = this.controllers[name];
        if (!controller) {
            this.controllers[name] = [target];
            return;
        }
        controller.push(target);
    }

    RemoveController(name, target) {
        let controller = this.controllers[name];
        if (controller) {
            this.controllers[name] = controller.filter((item) => item.__ziyou__id != target.__ziyou__id);
        }
    }

    AddRequestMapping(controllerName, action, keys, descriptor, dataHandle) {
        let requestMappingPathWidthDescriptor = new RequestMappingPathWidthDescriptor(controllerName, action, keys, descriptor, dataHandle);
        let mappingController = this.mappings[controllerName];
        if (!mappingController) {
            this.mappings[controllerName] = {};
            mappingController = this.mappings[controllerName];
        }
        let mappingAction = mappingController[action];
        if (!mappingAction) {
            mappingController[action] = requestMappingPathWidthDescriptor;
        }
        else {
            console.error("重复插入action");
        }
    }

    GetRequestMapping(controllerName, action) {
        let mappingController = this.mappings[controllerName];
        if (!mappingController) {
            return;
        }
        let requestMappingPathWidthDescriptor = mappingController[action];
        if (!requestMappingPathWidthDescriptor) {
            return;
        }
        return requestMappingPathWidthDescriptor;
    }

    Dispatch(controllerName, action, args) {
        let mappingController = this.mappings[controllerName];
        if (!mappingController) {
            return;
        }
        let requestMappingPathWidthDescriptor = mappingController[action];
        if (!requestMappingPathWidthDescriptor) {
            return;
        }
        let allControllers = this.controllers[controllerName];
        if (!allControllers) {
            return;
        }
        for (let i = 0; i < allControllers.length; i++) {
            let controller = allControllers[i];
            this._Dispatch(controller, requestMappingPathWidthDescriptor, args);
        }
    }

    _Dispatch(controller, requestMappingPathWidthDescriptor, args) {
        let sender = { args: {}, result: {} };
        if (args) {
            sender.args = Object.assign(args);
        }
        let isEqual = true;
        if (requestMappingPathWidthDescriptor.keys.length > 0) {
            for (let j = 0; j < requestMappingPathWidthDescriptor.keys.length; j++) {
                let key = requestMappingPathWidthDescriptor.keys[j];
                let val = args[key];
                if (controller[key] != val) {
                    isEqual = false;
                    break;
                }
            }
        }
        if (isEqual) {
            if (requestMappingPathWidthDescriptor.dataHandle && this.dataHandler) {
                (new Promise((resolve, reject) => {
                    sender.resolve = resolve;
                    sender.reject = reject;
                    this.dataHandler(requestMappingPathWidthDescriptor.controllerName, requestMappingPathWidthDescriptor.action, sender);
                })).then((result) => {
                    sender.result = result;
                    delete sender.resolve;
                    delete sender.reject;
                    requestMappingPathWidthDescriptor.descriptor.value.call(controller, sender);
                }).catch((err) => {
                    console.error(err);
                });
            }
            else {
                requestMappingPathWidthDescriptor.descriptor.value.call(controller, sender);
            }
        }
    }    
}

const router = new Router();

window.router = router;

export { router };