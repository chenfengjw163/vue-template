export default {
    path: '/',
    name: 'overview',
    component: () => import(/* webpackChunkName: "home.overview" */'./overview'),
};
