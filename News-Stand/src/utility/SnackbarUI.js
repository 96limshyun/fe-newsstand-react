import { Modal, notification } from "antd";

const SNACK_BAR_DELAY = 5000;

export const showSubscribeModal = (pressName, type) => {
    const instance = Modal.success({
        content: `${pressName} 언론사가 ${type}`,
    });
    setTimeout(() => {
        instance.destroy();
    }, SNACK_BAR_DELAY);
};

export const openNotification = (placement) => {
    notification.info({
        description: "구독한 언론사가 없습니다.",
        placement: placement,
    });
};