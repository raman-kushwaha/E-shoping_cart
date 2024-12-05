import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={`container py-3 my-4 ${styles.footer}`}>
      <hr />
      <p className="text-center text-body-secondary">© 2024 Company, Inc</p>
    </footer>
  );
};

export default Footer;
