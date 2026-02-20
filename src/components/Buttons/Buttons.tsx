import styles from "./Buttons.module.css";

interface Props {
  children: string;
  onClick: () => void;
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark";
}

const Buttons = ({ children, onClick, color = "primary" }: Props) => {
  return (
    <button
      className={[styles.btn, styles['btn-' + color]].join(" ")}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Buttons;
