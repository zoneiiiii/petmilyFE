import React, { useEffect, useState } from 'react';
import * as S from './MapModal.styled';


const MapModal = ({ address, onClose }) => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=1bc52dae173cc7cba900916b3a31df23&libraries=services&autoload=false`;
    document.head.appendChild(script);
    script.onload = () => {
      window.kakao.maps.load(() => {
        setIsMapLoaded(true);
      });
    };
  }, []);

  useEffect(() => {
    if (isMapLoaded && window.kakao.maps) {
      const geocoder = new window.kakao.maps.services.Geocoder(); //주소 -> 좌표 변환 객체
      geocoder.addressSearch(address, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          const container = document.getElementById('map');
          const options = {
            center: coords,
            level: 3,
          };
          const map = new window.kakao.maps.Map(container, options);
          const marker = new window.kakao.maps.Marker({
            map: map,
            position: coords,
          });
          const infowindow = new window.kakao.maps.InfoWindow({
            content: `<div style="width:150px;text-align:center;padding:6px 0;">${address}</div>`,
          });
          infowindow.open(map, marker);
        }
      });
    }
  }, [address, isMapLoaded]);

  return (
    <S.Container>
      <S.Close>
        <S.CloseButton onClick={onClose}>✖</S.CloseButton>
      </S.Close>
      <div id="map" style={{ width: '30vw', height: '30vh' }}></div>
    </S.Container>
  );
};

export default MapModal;