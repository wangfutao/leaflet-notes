import {Component} from "vue";
import {MenuType} from "@/utils/entity/menu-type";
import {RouteComponent} from "vue-router";

export class Menu {
    private _name: string | undefined;
    private _path: string | undefined;
    private _type: MenuType | undefined;
    private _component: Component | undefined;

    static createComponentMenu(name: string, path: string, component: Component) {
        let menu = new Menu();
        menu.name = name;
        menu.path = path;
        menu.component = component;

        return menu;
    }


    get name(): string | undefined {
        return this._name;
    }

    set name(value: string | undefined) {
        this._name = value;
    }

    get path(): string | undefined {
        return this._path;
    }

    set path(value: string | undefined) {
        this._path = value;
    }

    get type(): MenuType | undefined {
        return this._type;
    }

    set type(value: MenuType | undefined) {
        this._type = value;
    }

    get component(): Component | undefined {
        return this._component;
    }

    set component(value: Component | undefined) {
        this._component = value;
    }
}
