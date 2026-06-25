import "./Hero.css";

const heroImg = `${process.env.PUBLIC_URL || ""}/images/hero.png`;
const logoImg = `${process.env.PUBLIC_URL || ""}/images/logo(1).png`;

function Hero() {
  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(${heroImg})`,
      }}
    >
      <div className="hero__overlay">
        <img src={logoImg} alt="مطعم أصلي" className="hero__logo" />

        <h1>
          نكهة مميزة تبدأ من <span>اختيارك</span>
        </h1>
      </div>
    </section>
  );
}

export default Hero;