import { router, RequestMappingPath } from './Router.js';

var index = 1;

function GenerateUUID() {
    return index++;
}

function DispatchDefaultAction(name, defaultAction, obj) {
    if (defaultAction) {
        let args = {};
        let requestMappingPathWidthDescriptor = router.GetRequestMapping(name, defaultAction);
        let keys = requestMappingPathWidthDescriptor.keys;
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            args[key] = obj[key];
        }
        router._Dispatch(obj, requestMappingPathWidthDescriptor, args);
    }
}

export function Controller(name, defaultAction) {
    return function (type) {
        if (type.prototype.componentWillMount) {
            type.prototype.__ziyou__componentWillMount = type.prototype.componentWillMount;
            type.prototype.componentWillMount = function () {
                this.__ziyou__componentWillMount();
                this.__ziyou__id = GenerateUUID();
                router.AddController(name, this);
                DispatchDefaultAction(name, defaultAction, this);
            }
        }
        else {
            type.prototype.componentWillMount = function () {
                this.__ziyou__id = GenerateUUID();
                router.AddController(name, this);
                DispatchDefaultAction(name, defaultAction, this);
            }
        }
        if (type.prototype.componentWillUnmount) {
            type.prototype.__ziyou__componentWillUnmount = type.prototype.componentWillUnmount;
            type.prototype.componentWillUnmount = function () {
                this.__ziyou__componentWillUnmount();
                router.RemoveController(name, this);
            }
        }
        else {
            type.prototype.componentWillUnmount = function () {
                router.RemoveController(name, this);
            }
        }
    }
}

