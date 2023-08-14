import { useParams } from "react-router-dom";

const ActivityDetail = () => {
  const { id } = useParams();
  return <div>activitydetail {id}</div>;
};

export default ActivityDetail;
