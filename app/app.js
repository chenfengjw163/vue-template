import Vue from 'vue';
import Router from 'vue-router';
import App from './pages/app';
import yohoPluginCore from './plugins/yoho-plugin-core';
import routes from './pages';

import './filters';
import './directives';

Vue.use(yohoPluginCore);

Vue.render({
    el: '#app',
    template: '<App/>',
    components: {App},
    router: new Router({
        routes: routes,
        mode: Vue.$config.historyMode
    })
});
