import logo from '@/assets/logo.svg';
import { ReloadOutlined } from '@ant-design/icons';
import { useCreation } from 'ahooks';
import { Button, Image, Space, Spin, Switch, Table, Typography } from 'antd';

const ScanView = ({
    loading,
    onSelectedChange,
    selectedRowKeys,
    switchDisabled,
    onSwitchChange,
    enable,
    dataSource,
    onReload,
    reloadDisabled,
    version,
}) => {
    const columns = useCreation(() => {
        return [
            {
                title: 'deviceId',
                dataIndex: 'deviceId',
                ellipsis: true,
            },
            {
                title: 'groupId',
                dataIndex: 'groupId',
                ellipsis: true,
            },
            {
                title: 'label',
                dataIndex: 'label',
                ellipsis: true,
            },
        ];
    }, []);

    return (
        <Spin size="large" spinning={loading}>
            <div style={{ padding: 20 }}>
                <Space size="large" style={{ marginBottom: 20 }}>
                    <Switch
                        disabled={switchDisabled}
                        onChange={onSwitchChange}
                        checked={enable}
                        checkedChildren="On"
                        unCheckedChildren="Off"
                    />
                    <Button
                        icon={<ReloadOutlined />}
                        disabled={reloadDisabled}
                        onClick={onReload}
                    />
                </Space>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    rowKey={(record) => record.deviceId}
                    rowSelection={{
                        hideSelectAll: true,
                        selectedRowKeys,
                        onChange: onSelectedChange,
                    }}
                />
                <Space size="large">
                    <Image preview={false} src={logo} width={70} height={70} />
                    <Typography.Title level={3}>
                        Scan {version}
                    </Typography.Title>
                </Space>
            </div>
        </Spin>
    );
};

export default ScanView;
