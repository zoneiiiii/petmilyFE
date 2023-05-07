import react, { useEffect, useLayoutEffect, useState, useRef } from "react";
import axios from "axios";
const AnimalList = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const URL =
    "http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?bgnde=20230101&endde=20230507&pageNo=1&numOfRows=10&serviceKey=AhrFaZaAefMdQ7n5tWepAOM5tzLw5%2BCiT3stOXtEl3uTyXNtr0xlgtAn6WZppVVYaZdAuyqJvj%2FS65SSV4iapw%3D%3D";
  const fetchData = async () => {
    console.log("a");
    try {
      setError(null);
      setData(null);
      setLoading(true);

      // const response = await axios.get(URL, {
      //   // params: {
      //   //   serviceKey: process.env.REACT_APP_API_KEY,
      //   // },
      // });
      const response = await axios.get(
        "http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?bgnde=20230101&endde=20230507&pageNo=1&numOfRows=1&serviceKey=AhrFaZaAefMdQ7n5tWepAOM5tzLw5%2BCiT3stOXtEl3uTyXNtr0xlgtAn6WZppVVYaZdAuyqJvj%2FS65SSV4iapw%3D%3D"
      );
      setData(response.data);
      console.log("1 " + response.data);
      console.log("2" + response.data.body.items.item);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <ul>
        {/* {users.map((user) => (
          <li key={user.id}>
            {user.username} ({user.name})
          </li>
        ))} */}
      </ul>
    </div>
  );
};

export default AnimalList;
