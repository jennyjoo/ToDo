import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
  type ComponentType,
} from 'react';
import { Modal } from './modal';

interface ModalContextType {
  openModal: <T>(Component: ComponentType<T>, props?: T) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const [ModalComponent, setModalComponent] =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useState<ComponentType<any> | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [modalProps, setModalProps] = useState<any>({});

  const openModal = useCallback(
    <T,>(Component: ComponentType<T>, props?: T) => {
      setModalComponent(() => Component);
      setModalProps(props || {});
      setIsOpen(true);
    },
    []
  );

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setModalComponent(null);
    setModalProps({});
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {isOpen && ModalComponent && (
        <Modal isOpen={isOpen} onClose={closeModal}>
          {/* 전달받은 컴포넌트에 props와 onClose를 주입 */}
          <ModalComponent {...modalProps} onClose={closeModal} />
        </Modal>
      )}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
