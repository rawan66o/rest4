import { useEffect, useState } from "react";
import "./PopularMeals.css";
import MealCard from "../MealCard/MealCard";
import { API, getArray, getJson } from "../../../api";

function PopularMeals() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      const cached = sessionStorage.getItem("products_cache");
      if (cached) {
        setMeals(JSON.parse(cached));
        setLoading(false);
        return;
      }

      try {
        const result = await getJson(API.products);
        const data = getArray(result).map(p => ({
            id: p.id,
            name: p.name,
            description: p.description,
            price: p.price,
            image: p.image_url,
            currency: "ل.س"
        }));
        sessionStorage.setItem("products_cache", JSON.stringify(data));
        setMeals(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  return (
    <section className="popular-meals" id="popular">
      <div className="popular-meals__grid">
        {loading ? <p>جاري التحميل...</p> : meals.map(m => <MealCard key={m.id} meal={m} />)}
      </div>
    </section>
  );
}
export default PopularMeals;