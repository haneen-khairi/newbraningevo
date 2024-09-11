import { createContext, useState } from "react";
import ResultModal from "@/components/ResultModal.jsx";
import ConfirmModal from "@/components/ConfirmModal.jsx";

export function ResultContextProvider({ children }) {
  const [confirmOptions, setConfirmOptions] = useState({
    title: null,
    subtitle: null,
    onOk: null,
    onCancel: null,
  });
  const [modalOptions, setModalOptions] = useState({
    status: null,
    title: null,
    subtitle: null,
    content: null,
    closable: true,
  });

  function success({
    title,
    subtitle,
    content = null,
    timeout = 3000,
    closable = true,
  }) {
    setModalOptions({
      status: "success",
      title,
      subtitle,
      content,
      closable,
    });
    setTimeout(() => {
      close();
    }, timeout);
  }
  function error(title, subtitle, content = null, timeout = 3000) {
    setModalOptions({
      status: "error",
      title,
      subtitle,
      content,
    });
    setTimeout(() => {
      close();
    }, timeout);
  }
  function close() {
    setModalOptions({
      status: null,
      title: null,
      subtitle: null,
      content: null,
    });
  }
  async function confirm({ title, subtitle }) {
    return new Promise((res, rej) => {
      setConfirmOptions({
        open: true,
        title: title,
        subtitle: subtitle,
        onOk: () => {
          res(true);
          setConfirmOptions({
            title: null,
            subtitle: null,
            onOk: null,
            onCancel: null,
          });
        },
        onCancel: () => {
          rej(false);
          setConfirmOptions({
            title: null,
            subtitle: null,
            onOk: null,
            onCancel: null,
          });
        },
      });
    });
  }
  return (
    <ResultContext.Provider value={{ success, error, confirm }}>
      {children}
      <ResultModal
        status={modalOptions.status}
        title={modalOptions.title}
        subtitle={modalOptions.subtitle}
        content={modalOptions.content}
        close={close}
        closable={modalOptions.closable}
      />
      <ConfirmModal
        onOk={confirmOptions.onOk}
        onCancel={confirmOptions.onCancel}
        title={confirmOptions.title}
        subtitle={confirmOptions.subtitle}
      />
    </ResultContext.Provider>
  );
}
const ResultContext = createContext(null);
export default ResultContext;
