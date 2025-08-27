import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__name">Developed by P.R. Neider-Ball</h2>
      <h2 className="footer__year">{new Date().getFullYear()}</h2>
    </footer>
  );
}

export default Footer;