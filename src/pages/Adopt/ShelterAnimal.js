import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
const ShelterAnimal = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  var para = document.location.href.split("?");
  console.log(para);
  const fetchData = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await axios.get(
        "http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?bgnde=20230101&endde=20230507&pageNo=1&numOfRows=2&serviceKey=AhrFaZaAefMdQ7n5tWepAOM5tzLw5%2BCiT3stOXtEl3uTyXNtr0xlgtAn6WZppVVYaZdAuyqJvj%2FS65SSV4iapw%3D%3D&_type=json"
      );
      console.log("a");
      console.log(response.data.response.body.items.item);

      const data2 = response.data.response.body.items.item;
      console.log(data2.kindCd);

      setData(data2);
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
      <h1>경기도</h1>
      <h1>유기동물 관리페이지</h1>
      <h1>유기동물 관리페이지</h1>
      <h1>유기동물 관리페이지</h1>
      <h1>유기동물 관리페이지</h1>
      <h1>유기동물 관리페이지</h1>
      <h1>유기동물 관리페이지</h1>

      <h1>유기동물 관리페이지</h1>
    </div>
  );
};
export default ShelterAnimal;
