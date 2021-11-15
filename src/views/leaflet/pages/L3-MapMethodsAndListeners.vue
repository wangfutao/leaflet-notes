<template>
    <div class="title">地图常用方法和事件</div>
    <div class="content">
        <div id="map-container" class="map-container"></div>
        <div style="flex: 1">
            <div class="btn-container">
                <div class="title">方法</div>
                <a-button type="link" @click="setZoom">放大地图(setZoom)</a-button>
                <a-button type="link" @click="flyTo">移动地图(flyTo)</a-button>
                <a-button type="link" @click="fitBounds">缩放到指定范围(fitBounds / flyToBounds)</a-button>
                <a-button type="link" @click="latLngToLayerPoint">获取经纬度坐标在屏幕的位置(latLngToLayerPoint)  {{testCoor}}</a-button>
            </div>
            <div class="btn-container">
                <div class="title">事件</div>
                <a-button type="link" @click="listenZoom">监听zoom改变:放大/缩小(zoomstart、zoom、zoomEnd)</a-button>
                <a-button type="link" @click="listenMove">监听地图移动(movestart、move、moveend)</a-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";
import * as L from "leaflet"

export default class L3MapMethodsAndListeners extends Vue {
    map: L.Map | undefined;
    testCoor: string = '';

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

    setZoom() {
        let zoom = this.map?.getZoom();
        if (zoom == undefined){
            return;
        }
        this.map?.setZoom(zoom + 1)
    }
    flyTo() {
        let beijing = new L.LatLng(39.90, 116.38);
        this.map?.flyTo(beijing)
    }
    fitBounds() {
        let shaanxiBounds = new L.LatLngBounds([[31.594087940328876, 104.74804848432542], [39.75124204146942, 111.29590004682542]])
        this.map?.flyToBounds(shaanxiBounds)
    }
    latLngToLayerPoint() {
        if (this.map == undefined){
            return
        }
        let latlon = new L.LatLng(39.90, 116.38);
        let coor = this.map.latLngToContainerPoint(latlon);
        let x = Math.round(coor.x)
        let y = Math.round(coor.y)
        this.testCoor = '(' +x + ', ' + y + ')';
    }

    listenZoom(){
        this.map?.on('zoomstart', e=>{
            console.log('zoomstart   zoom: ', this.map?.getZoom())
        })
        this.map?.on('zoom', e=>{
            console.log('zoom   zoom: ', this.map?.getZoom())
        })
        this.map?.on('zoomend', e=>{
            console.log('zoomend   zoom: ', this.map?.getZoom())
        })
    }
    listenMove(){
        this.map?.on('movestart', e=>{
            console.log('movestart center: ', this.map?.getCenter())
        })
        this.map?.on('move', e=>{
            // console.log('move center: ', this.map?.getCenter())
        })
        this.map?.on('moveend', e=>{
            console.log('moveend center: ', this.map?.getCenter())
        })
    }
}
</script>

<style scoped>
.content {
    display: flex;
}

.map-container {
    width: 600px;
    height: 400px;
    margin-top: 20px;
    /*border: 1px solid #ddd;*/
}

.btn-container {
    margin-top: 10px;
}
.btn-container .title{
    margin-left: 20px;
}
</style>
