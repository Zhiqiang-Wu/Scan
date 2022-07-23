import {
    closeScan,
    listVideoInputDevices,
    openScan,
} from '@/services/scanService';

export default {
    namespace: 'scanModel',
    state: {},
    effects: {
        *listVideoInputDevices({ payload }, { call }) {
            return yield call(listVideoInputDevices, payload);
        },
        *openScan({ payload }, { call }) {
            return yield call(openScan, payload);
        },
        *closeScan({ payload }, { call }) {
            return yield call(closeScan, payload);
        },
    },
};
