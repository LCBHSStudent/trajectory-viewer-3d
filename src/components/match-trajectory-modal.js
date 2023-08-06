import React, { useState } from 'react';
import { Modal, Tabs, Input, Button, Form } from 'antd';

const { TabPane } = Tabs;

const MatchTrajectoryModal = ({ visible, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('mtlib-gpsimu-file');

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const handleConfirm = () => {
    setLoading(true);
    form
      .validateFields()
      .then((values) => {
        // Simulate backend request, replace with actual backend API call
        setTimeout(() => {
          setLoading(false);
          onClose();
        }, 2000);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="confirm" type="primary" loading={loading} onClick={handleConfirm}>
          Match!
        </Button>,
      ]}
    >
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="mtlib-gpsimu-points" key="mtlib-gpsimu-points">
          <Form form={form} layout="vertical">
            <Form.Item name="section_id" label="Section ID" rules={[{ required: true, message: '请输入Section ID' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="ts_begin" label="Timestamp Begin" rules={[{ required: true, message: '请输入Timestamp Begin' }]}>
              <Input type="number" />
            </Form.Item>
            <Form.Item name="ts_end" label="Timestamp End" rules={[{ required: true, message: '请输入Timestamp End' }]}>
              <Input type="number" />
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="mtlib-gpsimu-file" key="mtlib-gpsimu-file">
          <Form form={form} layout="vertical">
            <Form.Item name="section_id" label="Section ID" rules={[{ required: true, message: '请输入Section ID' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="lidar_id" label="Lidar ID" rules={[{ required: true, message: '请输入Lidar ID' }]}>
              <Input type="number" />
            </Form.Item>
            <Form.Item name="stage" label="Stage" rules={[{ required: true, message: '请输入Stage' }]}>
              <Input type="number" />
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="local-gpsimu-file" key="local-gpsimu-file">
          <Form form={form} layout="vertical">
            <Form.Item name="file_path" label="File Path" rules={[{ required: true, message: '请输入文件路径' }]}>
              <Input />
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default MatchTrajectoryModal;
