import React from "react";
import "../css/CategoryProduct.css";

import menShirt from "../assets/ms3.jpg";
import menpant from "../assets/menpant.jpg";
import menass from "../assets/menass.jpg";
import top from "../assets/wotop.jpg";
import saree from "../assets/saree3.jpg";
import womass from "../assets/wonass.jpg";
import latestfashion from "../assets/latestfashion3.jpg";
import newelecto from "../assets/newelectronic3.jpg";
import trending from "../assets/trending3.jpg";
import mobile from "../assets/mobile.jpg";
import laptop from "../assets/laptop.jpg";
import audio from "../assets/Audio.jpg";

function CategoryProduct({ category }) {
  if (!category) return null;

  return (
    <section className="sub-category category-mobile">
      {category === "NEW" && (
        <>
          <div className="sub-card">
            <img src={latestfashion} alt="New Fashion" />
            <h3>New Fashion</h3>
          </div>
          <div className="sub-card">
            <img src={newelecto} alt="New Electronics" />
            <h3>Latest Electronics</h3>
          </div>
          <div className="sub-card">
            <img src={trending} alt="Trending Accessories" />
            <h3>Trending Accessories</h3>
          </div>
        </>
      )}

      {category === "MEN" && (
        <>
          <div className="sub-card">
            <img src={menShirt} alt="Shirts" />
            <h3>Shirts</h3>
          </div>
          <div className="sub-card">
            <img src={menpant} alt="Pants" />
            <h3>Pants</h3>
          </div>
          <div className="sub-card">
            <img src={menass} alt="Accessories" />
            <h3>Accessories</h3>
          </div>
        </>
      )}

      {category === "WOMEN" && (
        <>
          <div className="sub-card">
            <img src={top} alt="Everyday" />
            <h3>Everyday</h3>
          </div>
          <div className="sub-card">
            <img src={saree} alt="Traditional" />
            <h3>Traditional</h3>
          </div>
          <div className="sub-card">
            <img src={womass} alt="Accessories" />
            <h3>Accessories</h3>
          </div>
        </>
      )}

      {category === "ELECTRONICS" && (
        <>
          <div className="sub-card">
            <img src={mobile} alt="Mobiles" />
            <h3>Mobiles</h3>
          </div>
          <div className="sub-card">
            <img src={laptop} alt="Laptops" />
            <h3>Laptops</h3>
          </div>
          <div className="sub-card">
            <img src={audio} alt="Audio" />
            <h3>Audio & Accessories</h3>
          </div>
        </>
      )}
    </section>
  );
}

export default CategoryProduct;