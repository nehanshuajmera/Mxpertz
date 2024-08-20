import "./homepage.scss";
import { CardList } from "../../components/card-list/card-list.component";

export const HomePage = ({data}) => {
  return (
    <div className="homepage">
      <CardList data={data} />
    </div>
  );
};
