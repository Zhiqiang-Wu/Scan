import {
    CLOSE_SCAN,
    LIST_VIDEO_INPUT_DEVICES,
    OPEN_SCAN,
} from '@/actions/actionTypes';
import useDvaEffect from '@/hooks/useDvaEffect';
import ScanView from '@/pages/scan/view';
import { getVersion } from '@tauri-apps/api/app';
import { useSelector } from '@umijs/max';
import {
    useBoolean,
    useCreation,
    useMemoizedFn,
    useMount,
    useSafeState,
} from 'ahooks';
import { message } from 'antd';
import lodash from 'lodash';
import { useLayoutEffect } from 'react';
import { createSelector } from 'reselect';

const ScanPage = () => {
    const { listVideoInputDevices, closeScan, openScan } = useDvaEffect();

    const [dataSource, setDataSource] = useSafeState([]);

    const [selectedRowKeys, setSelectedRowKeys] = useSafeState<Array<string>>(
        [],
    );

    const [enable, { set: setEnable }] = useBoolean(false);

    const [version, setVersion] = useSafeState<string>('');

    useLayoutEffect(() => {
        getVersion().then((v) => {
            setVersion(v);
        });
    }, []);

    const { loading } = useSelector((state) => ({
        loading: createSelector(
            [
                (state) => state.loading.effects[LIST_VIDEO_INPUT_DEVICES],
                (state) => state.loading.effects[OPEN_SCAN],
                (state) => state.loading.effects[CLOSE_SCAN],
            ],
            (
                listVideoInputDevicesLoading,
                openScanLoading,
                closeScanLoading,
            ) => {
                return (
                    !!listVideoInputDevicesLoading ||
                    !!openScanLoading ||
                    !!closeScanLoading
                );
            },
        )(state),
    }));

    useMount(() => {
        listVideoInputDevices().then((result) => {
            if (result.code !== 200000) {
                message.error(result.message);
                return;
            }
            if (result.data.length > 0) {
                setSelectedRowKeys([result.data[0].deviceId]);
            }
            setDataSource(result.data);
        });
    });

    const onSelectedChange = useMemoizedFn((keys: Array<string>) => {
        if (enable) {
            return;
        }
        setSelectedRowKeys(lodash.xor(selectedRowKeys, keys));
    });

    const onSwitchChange = useMemoizedFn((enable) => {
        setEnable(enable);
        if (enable) {
            openScan({ deviceId: selectedRowKeys[0] });
        } else {
            closeScan();
        }
    });

    const onReload = useMemoizedFn(() => {
        listVideoInputDevices().then((result) => {
            if (result.code !== 200000) {
                message.error(result.message);
                return;
            }
            if (result.data.length > 0) {
                setSelectedRowKeys([result.data[0].deviceId]);
            }
            setDataSource(result.data);
        });
    });

    const switchDisabled = useCreation(() => {
        return selectedRowKeys.length === 0;
    }, [selectedRowKeys]);

    const reloadDisabled = useCreation(() => {
        return enable || loading;
    }, [enable, loading]);

    return (
        <ScanView
            loading={loading}
            dataSource={dataSource}
            enable={enable}
            onSelectedChange={onSelectedChange}
            selectedRowKeys={selectedRowKeys}
            onSwitchChange={onSwitchChange}
            switchDisabled={switchDisabled}
            onReload={onReload}
            version={version}
            reloadDisabled={reloadDisabled}
        />
    );
};

export default ScanPage;
