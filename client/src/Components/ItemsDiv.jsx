import React from "react";

const ItemsDiv = ({ CardComponents, items }) => {
  return (
    <div className="grid grid-cols-1 w-full sm:grid-cols-2 md:grid-cols-4 gap-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4">
      {items.map((cat, index) => (
        <CardComponents key={index} {...cat} />
      ))}
    </div>
  );
};

export default ItemsDiv;
