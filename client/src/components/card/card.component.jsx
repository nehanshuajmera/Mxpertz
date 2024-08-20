import "./card.scss";
import { CustomButton } from "../custom-button/custom-button.component";
import { useNavigate } from "react-router-dom";

export const Card = ({ item }) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/adventure/${item?._id}`);
  };

  return (
    <div className="card">
      <div className="card__image--container">
        {/* <img src={`https://ik.imagekit.io/dev24/${data?.Image}`} alt="card" /> */}
      </div>
      <h2 className="heading-secondary">{item?.Title}</h2>
      <CustomButton onClick={() => handleClick(item?._id)}>{item?.Status}</CustomButton>
    </div>
  );
};
