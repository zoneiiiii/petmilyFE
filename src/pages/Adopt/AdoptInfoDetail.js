import React from "react";
import { useState, useEffect, useCallback } from "react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Animal from "./Animal";
import axios from "axios";
const AdoptInfoDetail = ({ location, locationcode }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [animalIndex, setAnimalIndex] = useState(0);
  console.log(locationcode);
  const fetchData = async () => {
    try {
      //   const response = await axios.get(
      //     `http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?bgnde=20230101&endde=20230507&upr_cd=6110000&org_cd=${locationcode}&pageNo=1&numOfRows=100&serviceKey=AhrFaZaAefMdQ7n5tWepAOM5tzLw5%2BCiT3stOXtEl3uTyXNtr0xlgtAn6WZppVVYaZdAuyqJvj%2FS65SSV4iapw%3D%3D&_type=json`
      //   );
      const response = await axios.get(
        "http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?bgnde=20230101&endde=20230507&upr_cd=6110000&pageNo=1&numOfRows=50&serviceKey=AhrFaZaAefMdQ7n5tWepAOM5tzLw5%2BCiT3stOXtEl3uTyXNtr0xlgtAn6WZppVVYaZdAuyqJvj%2FS65SSV4iapw%3D%3D&_type=json"
      );

      console.log(response.data.response.body.items.item);
      console.log("a");
      const data2 = response.data.response.body.items.item;
      console.log(data2.kindCd);
      const filteredData = data2.filter(
        (item) => item.processState === "보호중"
      );
      setData(filteredData);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };
  const moveLeft = useCallback(() => {
    setAnimalIndex((animalIndex) => {
      return animalIndex === 0 ? animalIndex + 20 : animalIndex - 5;
    });
  }, []);
  const moveRight = useCallback(() => {
    setAnimalIndex((animalIndex) => {
      return animalIndex === 20 ? animalIndex - 20 : animalIndex + 5;
    });
  }, []);

  const AnimalRender = () => {
    let result = [];

    console.log(data.processState);

    for (let i = animalIndex; i < animalIndex + 5; i++) {
      let data1 = data[i];

      result.push(
        <Grid item xs={2} key={data1.desertionNo}>
          <Animal
            desertionNo={data1.desertionNo}
            profile={data1.popfile}
            kindCd={data1.kindCd}
            age={data1.age}
            careAddr={data1.careAddr}
            processState={data1.processState}
          />
        </Grid>
      );
    }
    return result;
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <h2
        style={{
          marginTop: "0px",
          justifyContent: "center",
          marginLeft: "8.5%",
          color: "white",
          fontSize: "1.5em",
        }}
      >
        위치 : {location}
      </h2>
      <Grid
        container
        spacing={2}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          style={{
            display: "flex",
          }}
          item
          xs={1}
        >
          <IconButton
            onClick={moveLeft}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <ArrowBackIosIcon
              style={{
                width: "30%",
                height: "100%",
                color: "black",
                scale: "2.0",
                marginLeft: "1.5em",
              }}
            />
          </IconButton>
        </Grid>

        {data?.length && AnimalRender()}

        <Grid item xs={1}>
          <IconButton
            onClick={moveRight}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <ArrowForwardIosIcon
              style={{
                width: "30%",
                height: "100%",
                color: "black",
                scale: "2.0",
                marginRight: "1.5em",
              }}
            />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdoptInfoDetail;
