import './SimResPage.css';
import Title from "../components/Title";
import Couple from "../components/Couple";
import SNS from "../components/SNS";

import Discription from "../components/Discription";

const SimResPage = ({img1,img2,name1,name2}) => {
  return (
    <div className="SimRes">
      <Title></Title>
      <Couple></Couple>
      <Discription></Discription>
      <SNS></SNS>
    </div>
  );
}

export default SimResPage;
