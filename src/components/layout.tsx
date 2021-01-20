import styles from '../styles/Layout.module.css';

const Layout: React.FC = ({ children }) => (
	<div className={styles.layout}>{children}</div>
);

export default Layout;
