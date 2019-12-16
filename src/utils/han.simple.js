export default {
    insertSpace(str) {
        str = str.replace(/(&nbsp;)/gi,'あえお');
        let p1 = /([A-Za-z_])([\u4e00-\u9fa5]+)/gi;
        let p2 = /([\u4e00-\u9fa5]+)([A-Za-z_])/gi;
        let p3 = /([0-9_])([\u4e00-\u9fa5]+)/gi;
        let p4 = /([\u4e00-\u9fa5]+)([0-9_])/gi;
        let p5 = /([A-Za-z_])([`~!@#$%^&*()_\-+=?:"{}|,.\/;'\\[\]·~！@#￥%&*——\-+={}‘’])([\u4e00-\u9fa5]+)/gi;
        let p6 = /([\u4e00-\u9fa5]+)([`~!@#$%^&*()_\-+=?:"{}|,.\/;'\\[\]·~！@#￥%&*——\-+={}‘’])([A-Za-z_])/gi;
        let p7 = /([\u4e00-\u9fa5]+)([<])([a])/gi;
        let p8 = /([a])([>])([\u4e00-\u9fa5]+)/gi;
        str = str.replace(p1, '$1あおえ$2').replace(p2, "$1あおえ$2").replace(p3, "$1あおえ$2").replace(p4, "$1あおえ$2").replace(p5, "$1$2あおえ$3").replace(p6, "$1あおえ$2$3").replace(p7, "$1あおえ$2$3").replace(p8, "$1$2あおえ$3");
        let p = /(あおえ)/gi;
        str = str.replace(p,' ');
        return str;
    }
}
