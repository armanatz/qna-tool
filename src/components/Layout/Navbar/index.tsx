import styles from './Navbar.module.scss';

export default function NavBar() {
  return (
    <header className={styles.container}>
      <div>
        <div className={styles.logo}>
          <h1>Company</h1>
          <p>Question and Answer Tool</p>
        </div>
      </div>
    </header>
  );
}
