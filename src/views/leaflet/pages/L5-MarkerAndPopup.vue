<template>
    <div class="title">Marker和Popup</div>
    <div class="content">
        <div id="map-container" class="map-container"></div>
        <div style="flex: 1">
            <div class="btn-container">
                <div class="title">方法</div>
                <a-button type="link" @click="addMarker">叠加一个marker</a-button>
                <a-button type="link" @click="removeMarker">移除marker</a-button>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";
import * as L from "leaflet"

export default class L5MarkerAndPopup extends Vue {
    map: L.Map | undefined;
    marker: L.Marker | undefined;

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

    addMarker() {
        this.removeMarker();

        let iconUrl = require('@/assets/images/location.png');
        this.marker = new L.Marker([34.263161, 108.948024], {
            icon: L.icon({
                iconUrl: iconUrl,
                iconSize: [32, 32]
            })
        })

        let html = `这是一个popup`
        this.marker.bindPopup(html)

        this.map?.addLayer(this.marker)

    }

    removeMarker() {
        if (this.marker){
            this.map?.removeLayer(this.marker);
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
