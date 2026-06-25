import "./SectionTitle.css";

function SectionTitle({ title }) {
  return (
    <div className="section-title">
      <img src={title} alt="" />
    </div>
  );
}

export default SectionTitle;
