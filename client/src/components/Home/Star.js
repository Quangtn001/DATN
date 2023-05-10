import React from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const Star = ({ value }) => {
  return (
    <div className="flex gap-1">
      <span>
        {value >= 1 ? (
          <BsStarFill className="icon" />
        ) : value >= 0.5 ? (
          <BsStarHalf className="icon" />
        ) : (
          <BsStar className="icon" />
        )}
      </span>
      <span>
        <span>
          {value >= 2 ? (
            <BsStarFill className="icon" />
          ) : value >= 1.5 ? (
            <BsStarHalf className="icon" />
          ) : (
            <BsStar className="icon" />
          )}
        </span>
      </span>
      <span>
        <span>
          {value >= 3 ? (
            <BsStarFill className="icon" />
          ) : value >= 2.5 ? (
            <BsStarHalf className="icon" />
          ) : (
            <BsStar className="icon" />
          )}
        </span>
      </span>
      <span>
        <span>
          {value >= 4 ? (
            <BsStarFill className="icon" />
          ) : value >= 3.5 ? (
            <BsStarHalf className="icon" />
          ) : (
            <BsStar className="icon" />
          )}
        </span>
      </span>
      <span>
        <span>
          {value >= 5 ? (
            <BsStarFill className="icon" />
          ) : value >= 4.5 ? (
            <BsStarHalf className="icon" />
          ) : (
            <BsStar className="icon" />
          )}
        </span>
      </span>
    </div>
  );
};

export default Star;
