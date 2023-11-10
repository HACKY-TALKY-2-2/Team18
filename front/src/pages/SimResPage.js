import './SimResPage.css';
import Title from "../components/Title";
import Couple from "../components/Couple";
import SNS from "../components/SNS";

import Discription from "../components/Discription";

const SimResPage = ({img1,img2,name1,name2}) => {
  return (
    <div className="SimRes">
      <Title></Title>
      <Couple props={{similarity:10, name1:"이름1", name2:"이름2", img1:"",img2:""}}></Couple>
      <Discription props={{similarity:10, name1:"이름1", name2:"이름2"}}></Discription>
      <SNS></SNS>
    </div>
  );
}

export default SimResPage;
