import React from "react";
import ReactDOM from "react-dom";
import styled from "@emotion/styled";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 4rem;
  border-radius: 8px;
  text-align: center;
`;

const CloseButton = styled.button`
  display: flex;
  width: 100%;
  margin-top: 1.5rem;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.color.green};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
`;

const Modal = ({ children, onClose }) => {
  // React의 createPortal을 사용하여 Modal 구현
  return ReactDOM.createPortal(
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
        <CloseButton onClick={onClose}>Ok</CloseButton>
      </ModalContent>
    </ModalOverlay>,
    document.body
  );
};

export default Modal;
