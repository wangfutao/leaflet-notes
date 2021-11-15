<template>
    <div>
        <div class="content">
            <div class="md-content markdown-body" v-html="mdContent"> </div>
<!--            <div id="map-container" class="map-container"></div>-->
        </div>
    </div>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";
// @ts-ignore
import showdown from "showdown"
// @ts-ignore
import L1Text from "../mds/L9-Plugins.md";
import * as L from "leaflet";
export default class L9Plugins extends Vue{
    mdContent = "";

    mounted(){
        let convert = new showdown.Converter();
        let html = convert.makeHtml(L1Text);
        this.mdContent = html;

        // //创建地图对象
        // let map = new L.Map('map-container',{
        //     zoom: 6,
        //     center: [34.263161, 108.948024]
        // });
        //
        // //创建图层
        // let url = 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}';
        // let layer = new L.TileLayer(url);
        //
        // //将图层添加到地图上
        // map.addLayer(layer);
    }
}
</script>

<style scoped>
.map-container{
    width: 800px;
    height: 350px;
    margin: 20px 0 20px 0;
    border: 1px solid #ddd;
}
</style>
