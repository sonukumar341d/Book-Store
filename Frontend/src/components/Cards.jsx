import React from "react";

function Cards({ item }) {
  return (
    <div className="mt-4">
      <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">

        <figure>
          <img
            src={item.image}
            alt="Book"
            className="h-48 w-full object-cover"
          />
        </figure>

        <div className="card-body">

          <h2 className="card-title">
            {item.name}

            <div className="badge badge-secondary">
              {item.category}
            </div>
          </h2>

          <p>{item.title}</p>

          <div className="card-actions justify-between items-center mt-4">

            <div className="badge badge-outline">
              ${item.price}
            </div>

            <button className="px-3 py-1 border rounded-full hover:bg-pink-500 hover:text-white duration-200">
              Buy Now
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;