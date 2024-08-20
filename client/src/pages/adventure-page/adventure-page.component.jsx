import { useState } from "react";
import { useParams } from "react-router-dom";
import "./adventure-page.scss";
import { CustomButton } from "../../components/custom-button/custom-button.component";
import { LayoutComponent } from "../../components/layout-component/layout-component";

export const AdventurePage = ({ data }) => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("brainquest");

  const item = data.find((item) => item._id === id);

  if (!item) {
    return <p>Item not found</p>;
  }

  const renderBrainquest = () => {
    return (
      <div className="brain-quest">
        {item?.Brainquest.map((quest) => (
          <div key={quest._id} className="single-quest">
            <h3>{quest.Question}</h3>
            {/* <ul>
              {quest.Option.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
            <p>
              <strong>Answer:</strong> {quest.Answer}
            </p> */}
          </div>
        ))}
      </div>
    );
  };

  const renderWordexplore = () => {
    return (
      <div className="word-explore">
        {item?.Wordexplore.length > 0 ? (
          item?.Wordexplore.map((explore, index) => (
            <div key={index}>
              <h4>{explore.Storytitle}</h4>
              {/* <p>{explore.Storyttext}</p>
              <p>
                <strong>Synonyms:</strong> {explore.Synonyms}
              </p>
              <p>
                <strong>Antonyms:</strong> {explore.Antonyms}
              </p> */}
            </div>
          ))
        ) : (
          <p>No Wordexplore content available</p>
        )}
      </div>
    );
  };

  const renderStoryadventure = () => {
    return (
      <div className="story-adventure">
        <h3>{item.Storyadvenure?.Storytitle}</h3>
        {/* {item.Storyadvenure?.content.map((story, index) => (
          <div key={index} className="story--paragraph">
            {story.Paragraph.map((paragraph, pIndex) => (
              <p key={pIndex}>{paragraph}</p>
            ))}
          </div>
        ))} */}
      </div>
    );
  };

  return (
    <div className="adventure-page">
      <div className="adventure__id--heading">
        <h2>{item?.Title}</h2>
      </div>

      <div className="item__tabs">
        <CustomButton
          bgdark
          onClick={() => setActiveTab("brainquest")}
          className={activeTab === "brainquest" ? "active" : ""}
        >
          Brain Quest
        </CustomButton>
        <CustomButton
          bgdark
          onClick={() => setActiveTab("storyadventure")}
          className={activeTab === "storyadventure" ? "active" : ""}
        >
          Story Adventure
        </CustomButton>
        <CustomButton
          bgdark
          onClick={() => setActiveTab("wordexplore")}
          className={activeTab === "wordexplore" ? "active" : ""}
        >
          Word Explore
        </CustomButton>
      </div>

      <div className="item__tab--content">
        {activeTab === "brainquest" && renderBrainquest()}
        {activeTab === "storyadventure" && renderStoryadventure()}
        {activeTab === "wordexplore" && renderWordexplore()}
      </div>

      <LayoutComponent />
    </div>
  );
};
