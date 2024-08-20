import "./card-list.scss";
import { Card } from "../card/card.component";

export const CardList = ({data}) => {
  return (
    <div className="card-list">
      {data &&
        data.slice(0, 12).map((item) => (
            <Card key={item?._id} item={item} />
        ))}
    </div>
  );
};
