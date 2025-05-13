import React from 'react';
import { Button, Modal } from 'antd';
import { CustomerServiceOutlined } from '@ant-design/icons';

const RemoteHelpButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        type="text"
        icon={<CustomerServiceOutlined />}
        onClick={showModal}
        className="text-white text-2xl flex items-center"
      >
        远程协助
      </Button>

      <Modal
        title="远程协助"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="py-4">
          <p className="text-lg mb-4">请选择协助方式：</p>
          <div className="space-y-4">
            <Button block size="large" icon={<CustomerServiceOutlined />}>
              语音引导
            </Button>
            <Button block size="large" icon={<CustomerServiceOutlined />}>
              视频协助
            </Button>
            <Button block size="large" icon={<CustomerServiceOutlined />}>
              屏幕共享
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RemoteHelpButton; 