import React from 'react';
import styles from './Footer.module.css'; // Import the corresponding CSS module
import github from '../../assets/github.png';

function Footer({className}) {
    return (
        <div className={`${styles.footer} ${className}`}>
            <div className={styles['footer-container']}>
                <div className={styles['website-summary']}>
                    <h5>M.Mohsin Assignment 3</h5>
                    <p>My Assignment 3 for web development class 2024</p>
                </div>
                <div className={styles['contact-grid']}>
                    <div className={styles['contact-item']}>
                        <a href="" target="_blank">
                            <img src={github } alt="github" />
                            <p>GitHub</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
