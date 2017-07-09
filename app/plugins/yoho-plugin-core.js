/**
 * 插件
 */
import Router from 'vue-router';
import components from '../components';
import axios from 'axios';
import config from 'config';

export default {
    loadGlobalComponents(Vue) {
        components.forEach(componentModules => {
            _.each(componentModules, component => {
                if (component.length) {
                    Vue.component(component[0], component[1]);
                } else {
                    Vue.component(component.name, component);
                }
            });
        })
    },
    defineVueProp(Vue) {
        Vue.prop = (key, value) => {
            Vue[`$${key}`] = Vue.prototype[`$${key}`] = value;
        };
        Vue.beforeRenderHooks = [];
        Vue.beforeRender = (fn) => {
            Vue.beforeRenderHooks.push(fn);
        };
        Vue.render = opts => {
            return new Promise(resolve => {
                if (Vue.beforeRenderHooks.length) {
                    let step = index => {
                        if (index >= Vue.beforeRenderHooks.length) {
                            resolve();
                        } else {
                            Vue.beforeRenderHooks[index](() => {
                                step(index + 1);
                            });
                        }
                    };

                    step(0);
                } else {
                    resolve();
                }
            }).then(() => {
                return new Vue(opts);
            });
        };
    },
    compatible() {
        // 兼容IE的Function没有name属性为题，为了修复iView的bug
        if (!(function f() {}).name) {
            Object.defineProperty(Function.prototype, 'name', { //eslint-disable-line
                get: function() {
                    let name = (this.toString().match(/^function\s*([^\s(]+)/) || [])[1];

                    Object.defineProperty(this, 'name', { value: name });
                    return name;
                }
            });
        }

        // 使用了webpack code spliting IE下需要promise ployfill
        if (!window.Promise) {
            window.Promise = Promise;
        }
    },
    install(Vue) {
        // 定义Vue全局属性
        this.defineVueProp(Vue);

        // 加载核心组件
        this.loadGlobalComponents(Vue);

        // 兼容
        this.compatible();

        // 加载核心插件
        Vue.use(Router);

        // 附加Vue原型属性
        Vue.prop('config', config[process.env.NODE_ENV]);

        // 设置axios默认参数
        axios.defaults.baseURL = Vue.$config.axiosBaseUrl;
        axios.defaults.responseType = Vue.$config.axiosResponseType;

    }
};
