import "./footer.sass";

const Footer = () => {
  return (
    <div className="footer-basic">
      <footer>
        <div className="social">
          <a href="https://www.instagram.com/">
            <i className="icon-instagram"></i>
          </a>
          <a href="https://www.youtube.com">
            <i className="icon-youtube"></i>
          </a>
          <a href="https://twitter.com">
            <i className="icon-twitter"></i>
          </a>
          <a href="https://www.facebook.com/">
            <i className="icon-facebook"></i>
          </a>
        </div>
        <ul className="list-inline">
          <li className="list-inline-item">
            <a href="/">Home</a>
          </li>
          <li className="list-inline-item">
            <a href="/">Services</a>
          </li>
          <li className="list-inline-item">
            <a href="/">About</a>
          </li>
          <li className="list-inline-item">
            <a href="/">Terms</a>
          </li>
          <li className="list-inline-item">
            <a href="/">Privacy Policy</a>
          </li>
        </ul>
        <p className="copyright">BTRFOOTWEAR © 2023</p>
      </footer>
    </div>
  );
};

export default Footer;
