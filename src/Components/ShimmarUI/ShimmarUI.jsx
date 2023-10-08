import React from "react";
import "./ShimarUI.css";

export const ShimmarCard = () => {
  return (
    <div class="card">
      <div class="shimmerBG media"></div>
      <div class="p-32">
        <div class="shimmerBG title-line"></div>
        <div class="shimmerBG title-line end"></div>

        <div class="shimmerBG content-line m-t-24"></div>
        <div class="shimmerBG content-line"></div>
        <div class="shimmerBG content-line"></div>
        <div class="shimmerBG content-line"></div>
        <div class="shimmerBG content-line end"></div>
      </div>
    </div>
  );
};

const ShimmarUI = () => {
  return (
   <div className="shimmer-container">
      {new Array(20).fill(0).map((e , index) => {
      return    <ShimmarCard key={index} />
      })}
    </div>
  );
};

export default ShimmarUI;
