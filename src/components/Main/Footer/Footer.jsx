import "./Footer.css";

const footerLogo = `${process.env.PUBLIC_URL}/images/logo(1).png`;

const navLinks = [
  { id: 1, title: "القائمة", href: "#" },
  { id: 2, title: "الأصناف", href: "#categories" },
  { id: 3, title: "الأكثر طلباً", href: "#popular" },
  { id: 4, title: "تواصل معنا", href: "#contact" },
];

const socialLinks = [
  { name: "Facebook", href: "https://www.facebook.com/YOUR_PAGE", label: "f" },
  { name: "Instagram", href: "https://www.instagram.com/YOUR_PAGE", label: "◎" },
  { name: "YouTube", href: "https://www.youtube.com/@YOUR_CHANNEL", label: "▶" },
  { name: "WhatsApp", href: "https://wa.me/963999999999", label: "☏" },
];

function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer__content">
        <img src={footerLogo} alt="مطعم أصلي" className="footer__logo" />

        <p className="footer__text">نقدم لك تجربة طعام مميزة بنكهات دافئة وجودة عالية.</p>

        <div className="footer__social">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="footer__social-link"
            >
              {link.label}
            </a>
          ))}
        </div>

        <nav className="footer__nav">
          {navLinks.map((link) => (
            <a key={link.id} href={link.href}>
              {link.title}
            </a>
          ))}
        </nav>

        <div className="footer__line"></div>

        <p className="footer__copy">© 2025 اسم المطعم - جميع الحقوق محفوظة</p>
      </div>
      <br />
    </footer>
  );
}

export default Footer;
