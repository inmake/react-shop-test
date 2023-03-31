import React from "react";

function ProductCard({ name, colors, handleClick }) {
  return (
    <div
      className="bg-white shadow-lg rounded-lg cursor-pointer"
      onClick={handleClick}
    >
      <img src={colors[0].images[0]} alt="" />

      <p className="text-xl p-4">{name}</p>
    </div>
  );
}

export default ProductCard;
