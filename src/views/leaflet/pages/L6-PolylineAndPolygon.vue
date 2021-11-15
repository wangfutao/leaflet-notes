<template>
    <div class="title">Marker和Popup</div>
    <div class="content">
        <div id="map-container" class="map-container"></div>
        <div style="flex: 1">
            <div class="btn-container">
                <div class="title">方法</div>
                <a-button type="link" @click="addPolyline">叠加一个Polyline</a-button>
                <a-button type="link" @click="removePolyline">移除Polyline</a-button>
                <br>
                <a-button type="link" @click="addPolygon">叠加一个Polygon</a-button>
                <a-button type="link" @click="removePolygon">移除Polygon</a-button>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";
import * as L from "leaflet"
import {polyline} from "leaflet";

export default class L6PolylineAndPolygon extends Vue {
    map: L.Map | undefined;
    polyline: L.Polyline | undefined;
    polygon: L.Polygon | undefined;

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

    addPolyline() {
        this.removePolyline();

        let coors = [[34.263161, 108.948024], [39.90, 116.38], [30.599699, 114.325787]];

        //@ts-ignore
        this.polyline = new L.Polyline(coors, {
            color: '#3293f7',
            weight: 10,
            opacity: 1
        });
        this.map?.addLayer(this.polyline);

    }

    removePolyline() {
        if (this.polyline) {
            this.map?.removeLayer(this.polyline);
        }
    }

    addPolygon() {
        this.removePolygon();

        let coors = [[34.263161, 108.948024], [39.90, 116.38], [30.599699, 114.325787]];

        //@ts-ignore
        this.polygon = new L.Polygon(coors, {
            color: '#3293f7',
            weight: 10,
            opacity: 1
        });
        this.map?.addLayer(this.polygon);

    }

    removePolygon() {
        if (this.polygon) {
            this.map?.removeLayer(this.polygon);
        }
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
