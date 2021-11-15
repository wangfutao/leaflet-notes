## 1. npm引入依赖
`npm install leaflet`



## 2. 在VUE种使用Leaflet

在main.js中引入leaflet全局样式

```javascript
import "leaflet/dist/leaflet.css"
```

在vue组件中引入leaflet

```javascript
import * as L from "leaflet"
```

创建div

```html
<div id="map-container" class="map-container"></div>
```

定义Leaflet的Map对象

```javascript
let map = new L.Map('map-container',{
    zoom: 6,
    center: [34.263161, 108.948024]
});
```

定义一个地图图层对象

```javascript
let url = 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}';
let layer = new L.TileLayer(url);
```

将地图图层添加到地图上

```javascript
map.addLayer(layer);
```

