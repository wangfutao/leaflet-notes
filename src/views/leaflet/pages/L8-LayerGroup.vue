<template>
    <div class="title">图层组LayerGroup、FeatureGroup</div>
    <div class="content">
        <div id="map-container" class="map-container"></div>
        <div style="flex: 1">
            <div class="btn-container">
                <div class="title">方法</div>
                <a-button type="link" @click="addLayerGroup">叠加图层组</a-button>
                <a-button type="link" @click="removeLayerGroup">移除图层组</a-button>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";
import * as L from "leaflet"
import {polyline} from "leaflet";
import shaanxiGeojson from '@/assets/json/shaanxi.json';

export default class L8LayerGroup extends Vue {
    map: L.Map | undefined;
    layerGroup: L.LayerGroup | undefined;

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

    addLayerGroup() {
        this.removeLayerGroup();

        //Marker
        let iconUrl = require('@/assets/images/location.png');
        let marker = new L.Marker([34.706966,113.648768], {
            icon: L.icon({
                iconUrl: iconUrl,
                iconSize: [32, 32]
            })
        })
        let html = `这是一个popup`
        marker.bindPopup(html)

        //Polygon
        let coors = [[34.263161, 108.948024], [39.90, 116.38], [30.599699, 114.325787]];
        //@ts-ignore
        let polygon = new L.Polygon(coors, {
            color: '#3293f7',
            weight: 10,
            opacity: 1
        });

        let layers = [marker, polygon];

        this.layerGroup = new L.LayerGroup(layers);
        this.map?.addLayer(this.layerGroup)

    }

    removeLayerGroup() {
        if (this.layerGroup) {
            this.map?.removeLayer(this.layerGroup);
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
