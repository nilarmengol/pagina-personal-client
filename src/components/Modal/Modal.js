import React from "react";
import { Modal as ModalAntd } from "antd";

export default function Modal({ children, title, isVisible, setIsVisible }) {
  return (
    <ModalAntd
      title={title}
      centered
      visible={isVisible}
      onCancel={() => setIsVisible(false)}
      footer={false}
    >
      {children}
    </ModalAntd>
  );
}
