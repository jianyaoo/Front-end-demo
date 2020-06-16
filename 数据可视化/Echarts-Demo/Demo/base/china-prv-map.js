var provinces = {
    '上海': './lib/map/json/province/shanghai.json',
    '河北': './lib/map/json/province/hebei.json',
    '山西': './lib/map/json/province/shanxi.json',
    '内蒙古': './lib/map/json/province/neimenggu.json',
    '辽宁': './lib/map/json/province/liaoning.json',
    '吉林': './lib/map/json/province/jilin.json',
    '黑龙江': './lib/map/json/province/heilongjiang.json',
    '江苏': './lib/map/json/province/jiangsu.json',
    '浙江': './lib/map/json/province/zhejiang.json',
    '安徽': './lib/map/json/province/anhui.json',
    '福建': './lib/map/json/province/fujian.json',
    '江西': './lib/map/json/province/jiangxi.json',
    '山东': './lib/map/json/province/shandong.json',
    '河南': './lib/map/json/province/hainan.json',
    '湖北': './lib/map/json/province/hubei.json',
    '湖南': './lib/map/json/province/hunan.json',
    '广东': './lib/map/json/province/guangdong.json',
    '广西': './lib/map/json/province/guangxi.json',
    '海南': './lib/map/json/province/hainan.json',
    '四川': './lib/map/json/province/sichuan.json',
    '贵州': './lib/map/json/province/guizhou.json',
    '云南': './lib/map/json/province/yunnan.json',
    '西藏': './lib/map/json/province/xizang.json',
    '陕西': './lib/map/json/province/shanxi.json',
    '甘肃': './lib/map/json/province/gansu.json',
    '青海': './lib/map/json/province/qinghai.json',
    '宁夏': './lib/map/json/province/ningxia.json',
    '新疆': './lib/map/json/province/xinjiang.json',
    '北京': './lib/map/json/province/beijing.json',
    '天津': './lib/map/json/province/tianjin.json',
    '重庆': './lib/map/json/province/chongqing.json',
    '香港': './lib/map/json/province/xiangang.json',
    '澳门': './lib/map/json/province/aomen.json'
};
var myChart = echarts.init(document.getElementById('map_china'));

loadMap('./lib/map/json/china.json', 'china');

function loadMap(mapCode, name) {
    $.get(mapCode, function(data) {
        if (data) {
            echarts.registerMap(name, data);
            var option = {
                title: {
                    text: name,
                    left: 'center',
                },
                toolbox: {
                    show: true,
                    feature: {
                        saveAsImage: {
                            pixelRatio: 4
                        }
                    }
                },
                series: [{
                    type: 'map',
                    mapType: name,
                    selectedMode: 'false', //是否允许选中多个区域
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data: []
                }]
            };
            myChart.setOption(option);
        } else {
            alert('无法加载该地图');
        }
    });
}

myChart.on('click', function(params) {
    let name = params.name;         //地区name
    let mapCode = provinces[name];  //地区的json数据
    loadMap(mapCode, name);
});

$(".back").click(function () {
    loadMap('./lib/map/json/china.json', 'china');
})