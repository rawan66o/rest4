import "./Header.css";

const logo = `${process.env.PUBLIC_URL || ""}/images/logo.png`;
const cartIcon = `${process.env.PUBLIC_URL || ""}/images/cart.png`;

const navLinks = [
  { id: 1, title: "القائمة", href: "#", active: true },
  { id: 2, title: "الأصناف", href: "#categories" },
  { id: 3, title: "الأكثر طلباً", href: "#popular" },
  { id: 4, title: "تواصل معنا", href: "#contact" },
];

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <button type="button" className="header__menu" aria-label="فتح القائمة">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <a href="/" className="header__logo">
          <img src={logo} alt="مطعم أصلي" />
        </a>

        <nav className="header__nav">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={link.active ? "active" : ""}
            >
              {link.title}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <button type="button" className="header__login">
            تسجيل الدخول
          </button>

          <button type="button" className="header__cart">
            <span>سلة الطلب</span>
            <img src={cartIcon} alt="" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;