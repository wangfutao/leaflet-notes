<template>
    <div class="title">ImageOverlay</div>
    <div class="content">
        <div id="map-container" class="map-container"></div>
        <div style="flex: 1">
            <div class="btn-container">
                <div class="title">方法</div>
                <a-button type="link" @click="addImg">叠加图片</a-button>
                <a-button type="link" @click="removeImg">移除图片</a-button>
                <a-button type="link" @click="setImg">修改图片</a-button>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";
import * as L from "leaflet"

export default class L4Image extends Vue {
    map: L.Map | undefined;
    imgLayer: L.ImageOverlay | undefined;

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

    addImg() {
        this.removeImg();

        let img = require('@/assets/images/radar1.png');
        let bounds = new L.LatLngBounds([[34.22861206223228, 108.06654193114689], [34.282579937767714, 108.13183606885309]]);
        this.imgLayer = new L.ImageOverlay(img, bounds, {
            opacity: 0.7
        });
        this.map?.addLayer(this.imgLayer);
        this.map?.flyToBounds(bounds)
    }

    removeImg() {
        if (this.imgLayer) {
            this.map?.removeLayer(this.imgLayer)
        }
    }

    setImg(){
        if (this.imgLayer) {
            let img = require('@/assets/images/radar2.png');
            this.imgLayer?.setUrl(img)
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
