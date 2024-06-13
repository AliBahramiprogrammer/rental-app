import "../styles/Footer.scss";
import { LinkedIn, GitHub, Email } from "@mui/icons-material";
const Footer = () => {
    return (
        <div className="footer">
            <div className="footer_left">
                <a href="/">
                    <img src="/assets/logo.png" alt="logo" />
                </a>
            </div>

            <div className="footer_center">
                <h3>Useful Links</h3>
                <ul>
                    <li>About Us</li>
                    <li>Terms and Conditions</li>
                    <li>Return and Refund Policy</li>
                </ul>
            </div>

            <div className="footer_right">
                <h3>Contact</h3>
                <div className="footer_right_info">
                    <a href="https://github.com/AliBahramiprogrammer/rental-app">
                        <GitHub />
                        Plese Click Here To Check Repo
                    </a>
                </div>
                <div className="footer_right_info">
                    <Email />
                    <p>abahrami2002.ir@gmail.com</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
