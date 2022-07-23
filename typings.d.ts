import '@umijs/max/typings';

declare global {
    type Result = {
        readonly code: number;
        readonly message?: string;
        readonly data?: any;
    };
}
