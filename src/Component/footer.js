import React from 'react'
import Youtube from "../img/youtube.svg"
import Facebook from "../img/facebook.svg"
import X from "../img/X.svg"
import Instagram from "../img/instagram.svg"
import '../css/footer.css'
 function Footer() {
    return (
        <footer>
            <ul>
                <li>
                    <a href='https://www.youtube.com' target="_blank" rel="noopener noreferrer">
                        <img src={Youtube} alt="YouTube" />
                     </a>
                </li>
                <li>
                    <a href='https://www.facebook.com' target="_blank" rel="noopener noreferrer">
                        <img src={Facebook} alt="Facebook" />
                    </a>
                </li>
                <li>
                    <a href='https://www.instagram.com' target="_blank" rel="noopener noreferrer">
                        <img src={Instagram} alt="Instagram" />
                    </a>
                </li>
                <li>
                    <a href='https://twitter.com' target="_blank" rel="noopener noreferrer">
                        <img src={X} alt="Twitter" />
                    </a>
                </li>
            </ul>              
        </footer>
    );
 }
 export default Footer