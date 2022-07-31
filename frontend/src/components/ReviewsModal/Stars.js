import React, { useMemo } from "react";
import "./Stars.css";

function StarIcon(props) {
  const { fill = "none" } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill={fill}
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  );
}

function RatingIcon(props) {
  const {
    index,
    rating,
    hoverRating,
    onMouseEnter,
    onMouseLeave,
    onSaveRating,
  } = props;

  const fill = useMemo(() => {
    if (hoverRating >= index) {
      return "gold";
    } else if (!hoverRating && rating >= index) {
      return "gold";
    }
    return "none";
  }, [rating, hoverRating, index]);

  return (
    <div
      className="cursor__pointer"
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={() => onMouseLeave()}
      onClick={() => onSaveRating(index)}
    >
      <StarIcon fill={fill} />
    </div>
  );
}

function Stars({setStars, setFocus, stars, focus}) {
  const onMouseEnter=(index)=>{
    setFocus(index)
  }
  const onMouseLeave=()=>{
    setFocus(0)
  }
  const onSaveRating=(index)=>{
    setStars(index)
  }
  return (
    <div className="star__container">
      {[1, 2, 3, 4, 5].map((index, i) => {
        return (
          <RatingIcon
            key={'stars' + i}
            index={index}
            rating={stars}
            hoverRating={focus}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onSaveRating={onSaveRating}
          />
        );
      })}
    </div>
  );
}

export default Stars;
