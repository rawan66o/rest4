import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- إضافة
import "./Categories.css";

import CategoryCard from "../CategoryCard/CategoryCard";
import { API, getArray, getJson } from "../../../api";

const categoriesTitleImg = `${process.env.PUBLIC_URL || ""}/images/categories.png`;

function normalizeCategory(category) {
  return {
    id: category.id || category.uuid || category._id || Math.random(),
    title: category.name || category.title || "صنف غير معروف",
    description: category.description || "",
    count: `${Number(category.products_count || 0)} صنف في المطعم`,
    image: category.image_url || category.image || category.photo || "",
  };
}

function Categories() {
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // <-- إضافة

  useEffect(() => {
    async function loadCategories() {
      try {
        setLoading(true);
        setError("");

        const result = await getJson(API.categories);
        const apiCategories = getArray(result);

        setCategoryList(apiCategories.map(normalizeCategory));
      } catch (err) {
        console.log("Categories API error:", err.message);
        setError("تعذر جلب الأصناف من الخادم. يرجى المحاولة لاحقاً.");
        setCategoryList([]);
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

  return (
    <section className="categories" id="categories">
      <div className="categories__title">
        <img src={categoriesTitleImg} alt="الأصناف" />
      </div>

      {loading && <p className="categories__message">جاري تحميل الأصناف...</p>}

      {error && (
        <p className="categories__message categories__message--error">
          {error}
        </p>
      )}

      {!loading && !error && categoryList.length === 0 && (
        <p className="categories__message">لا توجد أصناف متاحة حالياً.</p>
      )}

      <div className="categories__grid">
        {categoryList.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>

      <button
        type="button"
        className="categories__button"
        onClick={() => navigate("/products")}
      >
        عرض الأصناف
      </button>
    </section>
  );
}

export default Categories;
