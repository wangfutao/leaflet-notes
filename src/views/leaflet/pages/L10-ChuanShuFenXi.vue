<template>
  <div class="title">污染传输分析</div>
  <div class="content">
    <div id="map-container" class="map-container"></div>
  </div>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";
import * as L from "leaflet"
import beijing from "../jsons/beijing.json"
import {GeoJSON, latLng, LatLngExpression, LayerGroup} from "leaflet";
import {FeatureCollection} from "geojson";
import StaData from '../jsons/L10-stadata.json'
import {RectangleUtils} from "@/views/leaflet/js/rectangle-utils";

class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export default class L10ChuanShuFenXi extends Vue {

  map: L.Map | undefined;


  markersLayerGroup: L.LayerGroup = new L.LayerGroup();

  ploygonLayerGroup: L.LayerGroup = new L.LayerGroup();

  flagMarkers: L.LayerGroup = new L.LayerGroup<any>();
  filteredMarkers: L.LayerGroup = new L.LayerGroup<any>();

  windData = null;

  mounted() {
    let map = new L.Map('map-container', {
      zoom: 6, //默认显示的级别，范围0-18，数值越小，地图可视范围越大
      minZoom: 0,
      maxZoom: 18,
      center: [34.263161, 108.948024], //默认显示的地图中心点位置
    });
    this.map = map;

    let url = 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}';
    let layer = new L.TileLayer(url);
    map.addLayer(layer);

    let beijingLayer = new L.GeoJSON(beijing as FeatureCollection)
    map.addLayer(beijingLayer);


    let beijingCoor = new L.LatLng(39.90, 116.38);
    map.flyToBounds(beijingLayer.getBounds());

    this.map?.addLayer(this.markersLayerGroup);
    this.map?.addLayer(this.ploygonLayerGroup);
    this.map?.addLayer(this.flagMarkers);
    this.map?.addLayer(this.filteredMarkers);


    this.loadMarkers();


  }

  //绘制矩形区域
  loadArea(lat: number, lon: number, theta: number) {
    this.ploygonLayerGroup.clearLayers();
    this.flagMarkers.clearLayers();
    this.filteredMarkers.clearLayers();

    let d = 50000;
    let coors = beijing.features[0].geometry.coordinates[0][0];

    let rectangleCoors = RectangleUtils.getRectangleArea(lat, lon, theta, d, coors);
    if (rectangleCoors == null){
      return;
    }
    this.drawPloygon(rectangleCoors);

    let p1 = new Point(rectangleCoors[0][1], rectangleCoors[0][0]);
    let p2 = new Point(rectangleCoors[1][1], rectangleCoors[1][0]);
    let p3 = new Point(rectangleCoors[2][1], rectangleCoors[2][0]);
    let p4 = new Point(rectangleCoors[3][1], rectangleCoors[3][0]);

    let icon = require('@/assets/images/sta4.png');

    let getLatFn = (marker: L.Marker)=>{
      //@ts-ignore
      return marker._latlng.lat;
    }
    let getLonFn = (marker: L.Marker)=>{
      //@ts-ignore
      return marker._latlng.lng;
    }
    let filteredMarkers = RectangleUtils.filterStaObject(p1, p2, p3, p4, this.markersLayerGroup.getLayers(), getLatFn, getLonFn);

    console.log({filteredMarkers})
    if (filteredMarkers == null){
      return;
    }
    for (let marker of filteredMarkers) {
      let lat = marker.getLatLng().lat;
      let lon = marker.getLatLng().lng;
      let newMarker = this.getMarker(lat, lon, icon);
      this.filteredMarkers.addLayer(newMarker);
    }

  }

  //绘制矩形区域
  drawPloygon(coors: number[][]) {
    let latlngs = [];
    for (let coor of coors) {
      latlngs.push(L.latLng(coor[0], coor[1]));
    }
    let polygon = new L.Polygon(latlngs);
    this.ploygonLayerGroup.addLayer(polygon);
  }

  //加载点位
  loadMarkers() {
    this.markersLayerGroup.clearLayers();
    let markerIcon = require('@/assets/images/sta2.png')
    for (let sta of StaData) {
      let lat = sta.latitude;
      let lon = sta.longitude;
      let marker = this.getMarker(lat, lon, markerIcon);
      this.markersLayerGroup.addLayer(marker)
    }
  }

  //获取marker
  getMarker(lat: number, lon: number, icon: string) {
    let marker = new L.Marker(L.latLng(lat, lon), {
      icon: new L.Icon({
        iconUrl: icon,
        iconSize: [26, 26]
      })
    });
    marker.on('click', () => {
      // this.loadArea(lat, lon, 310);
      let theta = 75;
      let timer = setInterval(() => {
        this.loadArea(lat, lon, theta++);
        if (theta > 180) {
          clearInterval(timer);
        }
      }, 100)

    });
    return marker;
  }

}
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 600px;
  margin-top: 20px;
  border: 1px solid #ddd;
}
</style>
