import { defineConfig } from '@umijs/max';

export default defineConfig({
    antd: {},
    dva: {},
    routes: [
        {
            path: '/',
            redirect: '/scan',
        },
        {
            path: '/scan',
            component: './scan',
        },
    ],
    npmClient: 'pnpm',
});
