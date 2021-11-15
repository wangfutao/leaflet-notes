<template>
    <div class="title">Geojson</div>
    <div class="content">
        <div id="map-container" class="map-container"></div>
        <div style="flex: 1">
            <div class="btn-container">
                <div class="title">方法</div>
                <a-button type="link" @click="addGeojson">叠加一个Geojson</a-button>
                <a-button type="link" @click="removeGeojson">移除Geojson</a-button>
                <br>
                <a-button type="link" @click="linkTo">地图下载器：https://datav.aliyun.com/tools/atlas</a-button>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";
import * as L from "leaflet"
import {polyline} from "leaflet";
import shaanxiGeojson from '@/assets/json/shaanxi.json';

export default class L7Geojson extends Vue {
    map: L.Map | undefined;
    geojson: L.GeoJSON | undefined;

    mounted() {
        this.map = new L.Map('map-container', {
            zoom: 6, //默认显示的级别，范围0-18，数值越小，地图可视范围越大
            minZoom: 0,
            maxZoom: 18,
            center: [34.263161, 108.948024], //默认显示的地图中心点位置
        });
        let url = 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}';
        let layer = new L.TileLayer(url);
        this.map.addLayer(layer);
    }

    addGeojson() {
        this.removeGeojson();

        let coors = [[34.263161, 108.948024], [39.90, 116.38], [30.599699, 114.325787]];

        //@ts-ignore
        this.geojson = new L.GeoJSON(shaanxiGeojson, {
            style: ()=>{
                return{
                    color: '#3293f7',
                    opacity: 1,  //线条的透明度
                    fillOpacity: 0.2, //背景色的透明度
                }
            }
        });
        this.map?.addLayer(this.geojson);

    }

    removeGeojson() {
        if (this.geojson) {
            this.map?.removeLayer(this.geojson);
        }
    }

    linkTo(){
        window.location.href = 'https://datav.aliyun.com/tools/atlas/index.html';
    }

}
</script>

<style scoped>
.content {
    display: flex;
}

.map-container {
    width: 800px;
    height: 600px;
    margin-top: 20px;
    /*border: 1px solid #ddd;*/
}

.btn-container {
    margin-top: 10px;
}

.btn-container .title {
    margin-left: 20px;
}
</style>
