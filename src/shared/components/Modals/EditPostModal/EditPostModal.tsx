import ReactDOM from "react-dom";
import styles from "./EditPostModal.module.css";
import { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";


interface EditModalProps {
  onClose: () => void;
}

const EditPostModal = ({ onClose }: EditModalProps) => {
  const modalRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const modalContent = (
    <div className={styles.overlay}>
      <form ref={modalRef} className={styles.modalEdit}>
        <div className={styles.headerEdit}>
          <span className={styles.editName}>Edit post</span>
          <button type="button" className={styles.btnSave}>
            Save
          </button>
        </div>
        <div className={styles.blockEdit}>
          <div className={styles.image}>
            <img className={styles.imageAddress} src="" alt="" />
          </div>
          <div className={styles.addText}>
            <textarea name="" id=""></textarea>
            <div></div>
          </div>
        </div>
      </form>
    </div>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("modal-root")!
  );
};

export default EditPostModal;
