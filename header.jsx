import styles from'./header.module.css';
import {
  FaRegComment,
  FaRegHeart,
  FaRegBell,
  FaRegUser,
  FaUser,
  FaLock,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import CustomModal from '../Modal/modal-component';

import '../../Pages/Notifications-icon/notificari.module.css';
import '../../Pages/MyAccount-icon/account.module.css';
import Api from '../../../api';

const Header = () => {
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const toggleNotificationModal = () => {
    setIsNotificationModalOpen(!isNotificationModalOpen);
  };

  const toggleAccountModal = () => {
    setIsAccountModalOpen(!isAccountModalOpen);
  };

  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
  
    // Pregătim datele pentru login
    const payload = {
      email: username,
      password: password,
    };
  
    // Apelarea API-ul pentru autentificare
    const response = await Api.user.signIn(payload);
  
    if (response.success) {
      console.log('User logged in:', response.data);
  
      // Salvarea token-ul în localStorage (pentru menținerea sesiunii)
      localStorage.setItem('token', response.data.idToken);
      alert('Login successful!');
  
      // Închiderea modalul
      toggleLoginModal();
    } else {
      console.error('Login failed:', response.message);
      alert('Login failed: ' + response.message);
    }
  
    // Curatare inputurilor 
    setUserName('');
    setPassword('');
  };
  

  return (
    <>
      <div className={styles.headerContainer}>
        <header className={styles.header}>
          <div className={styles.logoContainer}>
            <img
              className={styles.logoImg}
              src="./foto-icons/logo-5-app-bard.png"
              alt="Logo"
            />
          </div>

          <div className={styles.headerIcons}>
            <Link to="/chat" className={styles.chatIcon} aria-label="Chat">
              <FaRegComment className={styles.chatIconSvg} />
              <span className={styles.chatSpan}>Chat</span>
            </Link>

            <Link
              to="/favorite"
              className={styles.favoriteIcon}
              aria-label="Favorite"
            >
              <FaRegHeart className={styles.heartIcon} />
            </Link>

            <button
              onClick={toggleNotificationModal}
              className={styles.notificationIcon}
              aria-label="Notificări"
            >
              <FaRegBell className={styles.bellIcon} />
            </button>

            <button
              className={styles.myAccountIcon}
              aria-label="account"
              onClick={toggleAccountModal}
            >
              <FaRegUser className={styles.userNameIcon} />
              <span className={styles.accountSpan}>Contul meu</span>
            </button>
          </div>

          <button
            className={styles.headerBtn}
            aria-label="Login"
            onClick={toggleLoginModal}
          >
            Inregistrare
          </button>
        </header>
      </div>

      {/* Modal Notificări */}
      <CustomModal
        title="Notificări"
        isOpen={isNotificationModalOpen}
        onClose={toggleNotificationModal}
        className={styles.notificariHeaderModal}
      />

      {/* Modal Contul meu */}
      <CustomModal
        title="Contul meu"
        isOpen={isAccountModalOpen}
        onClose={toggleAccountModal}
        className={styles.accountHeaderModal}
        position="top-right"
      />

      {/* Modal Login */}
      <CustomModal
        title="Autentificare"
        isOpen={isLoginModalOpen}
        onClose={toggleLoginModal}
        className={styles.loginHeaderModal}
      >
        <form className={`${styles.loginForm} ${styles.loginModal}`} onSubmit={handleLoginSubmit}>
          <h1>🫣 WELCOME </h1>
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder=" Username"
              required
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            <FaUser className={styles.icon} />
          </div>
          <div className={styles.inputContainer}>
            <input
              type="password"
              placeholder="Parola"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className={styles.icon} />
          </div>
          <div className={styles.rememberForgot}>
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#">Forgot password</a>
          </div>
          
          <button type="submit" className={styles.loginBtn}>
            Autentificare
          </button>

          <div className={styles.registerLink}>
            <p>
              Don&apos;t have an account ? <a href="#">Register</a>
            </p>
          </div>
        </form>
      </CustomModal>
    </>
  );
};

export default Header;