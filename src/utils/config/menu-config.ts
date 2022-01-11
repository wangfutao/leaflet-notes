import {Menu} from "@/utils/entity/menu";
import {RouteRecordRaw} from "vue-router";

export class MenuConfig {
    private static _menus: Menu[] = [
        Menu.createComponentMenu("1. 引入和使用", "/L1-Install", () => import('@/views/leaflet/pages/L1-Install.vue')),
        Menu.createComponentMenu("2. 地图初始参数", "/L2-MapOptions", () => import('@/views/leaflet/pages/L2-MapOptions.vue')),
        Menu.createComponentMenu("3. 地图常用方法和事件", "/L3-MapMethodsAndListeners", () => import('@/views/leaflet/pages/L3-MapMethodsAndListeners.vue')),
        Menu.createComponentMenu("4. 常用图层-图片ImageOverlay", "/L4-Image", () => import('@/views/leaflet/pages/L4-Image.vue')),
        Menu.createComponentMenu("5. 常用图层-点位Marker和Popup", "/L5-Marker", () => import('@/views/leaflet/pages/L5-MarkerAndPopup.vue')),
        Menu.createComponentMenu("6. 常用图层-多边形Polyline和Polygon", "/L6-Polyline", () => import('@/views/leaflet/pages/L6-PolylineAndPolygon.vue')),
        Menu.createComponentMenu("7. 常用图层-Geojson", "/L7-Geojson", () => import('@/views/leaflet/pages/L7-Geojson.vue')),
        Menu.createComponentMenu("8. 图层组", "/L8-LayerGroup", () => import('@/views/leaflet/pages/L8-LayerGroup.vue')),
        Menu.createComponentMenu("9. 第三方插件推荐", "/L9-Plugins", () => import('@/views/leaflet/pages/L9-Plugins.vue')),
        Menu.createComponentMenu("10. 北京污染传输分析", "/L10-ChuanShuFenXi", () => import('@/views/leaflet/pages/L10-ChuanShuFenXi.vue')),
        ];

    static toRouteRecordRawArray(): RouteRecordRaw[] {
        let array: RouteRecordRaw[] = [];
        for (let menu of this._menus) {
            if (menu.path == undefined || menu.component == undefined) continue;
            array.push({
                path: menu.path,
                name: menu.name,
                component: menu.component
            })
        }
        return array;
    }


    static get menus(): Menu[] {
        return this._menus;
    }

    static set menus(value: Menu[]) {
        this._menus = value;
    }
}
