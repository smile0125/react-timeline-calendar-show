import AsyncComponent from './component/AsyncComponents/index.jsx';
export default [
    {
        name: "index",
        path: "/",
        exact: true,
        component: AsyncComponent(() => import(/*webpackChunkName: "index"*/'./pages/index/index.jsx'))
    }]
