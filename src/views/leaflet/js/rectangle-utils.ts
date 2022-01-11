
class Point{
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}


export class RectangleUtils {
   static getRectangleArea(lat: number, lon: number, theta: number, width: number, areaCoors: number[][], time: any = null){
        let d = width;
        let coor1 = this.calcLatlon(lat, lon, theta - 90, d);
        let coor2 = this.calcLatlon(lat, lon, theta + 90, d);

        let coors = areaCoors;

        let maxDis = 0;
        let maxDisCoor = coors[0];
        for (let coor of coors){
            let dis = this.getNearestDistance(coor1[1], coor1[0], coor2[1], coor2[0], coor[0], coor[1]);
            if (dis > maxDis){
                let vec_23 = new Point(coor2[1] - coor1[1], coor2[0] - coor1[0]);
                let vec_3M = new Point(coor[0] - coor2[1], coor[1] - coor2[0]);
                let cross = this.cross(vec_23, vec_3M);
                if (cross < 0){
                    continue;
                }
                maxDis = dis;
                maxDisCoor = coor;
            }
        }
        if (maxDis == 0){
            return null;
        }

        let coor3 = this.calcLatlon(coor2[0], coor2[1], theta, maxDis);
        let coor4 = this.calcLatlon(coor1[0], coor1[1], theta, maxDis);

        return [coor1, coor2, coor3, coor4];

    }

    //筛选矩形区域内的站点
   static filterStaObject(p1: Point, p2: Point, p3: Point, p4: Point, stations: any[], getLatFn: Function, getLonFn: Function) {
        let vec_12 = this.getVector(p1, p2);
        let vec_34 = this.getVector(p3, p4);

        let vec_23 = this.getVector(p2, p3);
        let vec_41 = this.getVector(p4, p1);

        let filteredObjects: any[] = [];
        for (let staObj of stations) {
            let lat = getLatFn(staObj);
            let lon = getLonFn(staObj);
            let p = new Point(lon, lat);
            let vec_2p = this.getVector(p2, p);
            let vec_4p = this.getVector(p4, p);
            let cross1 = this.cross(vec_12, vec_2p);
            let cross2 = this.cross(vec_34, vec_4p);
            if (cross1 * cross2 < 0) {
                continue;
            }

            let vec_3p = this.getVector(p3, p);
            let vec_1p = this.getVector(p1, p);
            let cross3 = this.cross(vec_23, vec_3p);
            let cross4 = this.cross(vec_41, vec_1p);
            if (cross3 * cross4 < 0) {
                continue;
            }
            filteredObjects.push(staObj);
        }

        return filteredObjects;
    }


    /**
     * 根据一个经纬度及距离角度，算出另外一个经纬度
     * @param {*} lon 经度 113.3960698
     * @param {*} lat 纬度 22.941386
     * @param {*} direction 方位角 45 ---- 正北方：000°或360° 正东方：090° 正南方：180° 正西方：270°
     * @param {*} distance 90000距离(米)
     */
    static  calcLatlon(lat: number, lon: number, direction: number, distance: number) {
        //大地坐标系资料WGS-84 长半径a=6378137 短半径b=6356752.3142 扁率f=1/298.2572236
        let a = 6378137;
        let b = 6356752.3142;
        let f = 1 / 298.257223563;

        let lon1 = lon * 1;
        let lat1 = lat * 1;
        let s = distance;
        let alpha1 = direction * (Math.PI / 180)
        let sinAlpha1 = Math.sin(alpha1);
        let cosAlpha1 = Math.cos(alpha1);

        let tanU1 = (1 - f) * Math.tan(lat1 * (Math.PI / 180));
        let cosU1 = 1 / Math.sqrt((1 + tanU1 * tanU1)), sinU1 = tanU1 * cosU1;
        let sigma1 = Math.atan2(tanU1, cosAlpha1);
        let sinAlpha = cosU1 * sinAlpha1;
        let cosSqAlpha = 1 - sinAlpha * sinAlpha;
        let uSq = cosSqAlpha * (a * a - b * b) / (b * b);
        let A = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
        let B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));

        let sigma = s / (b * A), sigmaP = 2 * Math.PI;
        let sinSigma = Math.sin(sigma);
        let cosSigma = Math.cos(sigma);
        let cos2SigmaM = Math.cos(2 * sigma1 + sigma);
        while (Math.abs(sigma - sigmaP) > 1e-12) {
            let cos2SigmaM = Math.cos(2 * sigma1 + sigma);
            let sinSigma = Math.sin(sigma);
            let cosSigma = Math.cos(sigma);
            let deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) -
                B / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)));
            sigmaP = sigma;
            sigma = s / (b * A) + deltaSigma;
        }

        let tmp = sinU1 * sinSigma - cosU1 * cosSigma * cosAlpha1;
        let lat2 = Math.atan2(sinU1 * cosSigma + cosU1 * sinSigma * cosAlpha1,
            (1 - f) * Math.sqrt(sinAlpha * sinAlpha + tmp * tmp));
        let lambda = Math.atan2(sinSigma * sinAlpha1, cosU1 * cosSigma - sinU1 * sinSigma * cosAlpha1);
        let C = f / 16 * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
        let L = lambda - (1 - C) * f * sinAlpha *
            (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));

        let revAz = Math.atan2(sinAlpha, -tmp); // final bearing

        let newLon = lon1 + L * (180 / Math.PI);
        let newLat = lat2 * (180 / Math.PI);

        return [newLat, newLon];
    }

    //角度转弧度
    static degToRad(deg: number) {
        return deg * (Math.PI / 180);
    }

    //弧度转角度
    static radToDeg(rad: number) {
        return rad * (180 / Math.PI);
    }

    //两点组成一个向量
    static getVector(p1: Point, p2: Point){
        return new Point(p2.x - p1.x, p2.y - p1.y);
    }

    //计算向量的叉乘
    static  cross(v1: Point, v2: Point){
        return v1.x * v2.y - v1.y * v2.x;
    }

    //点(x,y)到线段(x1, y1), (x2, y2)的距离
    static getNearestDistance(x1: number, y1: number, x2: number, y2: number, x: number, y: number) {
        let a, b, c;
        a = this.getDistanceBtwP(y1, x1, y2, x2);//经纬坐标系中求两点的距离公式
        b = this.getDistanceBtwP(y2, x2, y, x);//经纬坐标系中求两点的距离公式
        c = this.getDistanceBtwP(y1, x1, y, x);//经纬坐标系中求两点的距离公式
        if (b * b >= c * c + a * a) return 0;
        if (c * c >= b * b + a * a) return 0;
        let l = (a + b + c) / 2;     //周长的一半
        let s = Math.sqrt(l * (l - a) * (l - b) * (l - c));  //海伦公式求面积
        return 2 * s / a;
    }

    //根据两点经纬度计算距离  单位:m
    static getDistanceBtwP(lat1: number, lon1: number, lat2: number, lon2: number) {
        let radLng1 = lat1 * Math.PI / 180.0;
        let radLng2 = lat2 * Math.PI / 180.0;
        let a = radLng1 - radLng2;
        let b = (lon1 - lon2) * Math.PI / 180.0;
        let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLng1) * Math.cos(radLng2) * Math.pow(Math.sin(b / 2), 2))) * 6378.137;	//返回单位为公里
        return s * 1000;
    }
}