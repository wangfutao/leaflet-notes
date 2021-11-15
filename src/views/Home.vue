<template>
    <div class="home">
        <div class="nav">
            <a-menu style="height: 100%" mode="inline" v-model:selectedKeys="selectedMenu">
                    <a-menu-item-group>
                        <a-menu-item :key="menu.path" v-for="menu of menus">{{menu.name}}</a-menu-item>
                    </a-menu-item-group>
            </a-menu>
        </div>
        <div class="main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {Watch} from "vue-property-decorator";
import {MenuConfig} from "@/utils/config/menu-config";
import {Menu} from "@/utils/entity/menu";

export default class Home extends Vue {
    menus: Menu[] = [];
    selectedMenu: string[] = [];

    beforeMount(){
        let menus = MenuConfig.menus;
        this.menus = menus;
        if (menus.length > 0) {
            // this.selectedMenu = [menus[0].path + '']
        }
    }

    @Watch("selectedMenu")
    watchSelectMenu(){
        this.linkTo();
    }

    linkTo(){
        let path = this.selectedMenu[0];

        this.$nextTick(()=>{
            this.$router.push(path)
        })

    }
}
</script>

<style>
.home {
    width: 100%;
    height: 100%;
    display: flex;
}

.nav {
    width: 250px;
    height: 100%;
    overflow-y: auto;
}
.main{
    margin: 5px;
    flex: 1;
    padding: 5px;
}
</style>
