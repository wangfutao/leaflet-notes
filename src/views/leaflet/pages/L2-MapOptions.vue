<template>
    <div class="title">地图常用参数</div>
    <div class="content">
        <div id="map-container" class="map-container"></div>
    </div>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";
import * as L from "leaflet"

export default class L2MapOptions extends Vue{
    mounted(){
        let map = new L.Map('map-container',{
            zoom: 6, //默认显示的级别，范围0-18，数值越小，地图可视范围越大
            minZoom: 0,
            maxZoom: 18,
            center: [34.263161, 108.948024], //默认显示的地图中心点位置
        });
        let url = 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}';
        let layer = new L.TileLayer(url);
        map.addLayer(layer);
    }
}
</script>

<style scoped>
.map-container{
    width: 800px;
    height: 600px;
    margin-top: 20px;
    border: 1px solid #ddd;
}
</style>
