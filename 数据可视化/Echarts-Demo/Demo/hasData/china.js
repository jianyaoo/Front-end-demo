window.demoData = [
    {name: "澳门", value: 10},
    {name: "香港", value: 114},
    {name: "台湾", value: 45},
    {name: "新疆", value: 76},
    {name: "宁夏", value: 75},
    {name: "青海", value: 18},
    {name: "甘肃", value: 124},
    {name: "陕西", value: 245},
    {name: "西藏", value: 1},
    {name: "云南", value: 174},
    {name: "贵州", value: 146},
    {name: "四川", value: 539},
    {name: "重庆", value: 576},
    {name: "海南", value: 168},
    {name: "广西", value: 252},
    {name: "广东", value: 1352},
    {name: "湖南", value: 1018},
    {name: "湖北", value: 67743},
    {name: "河南", value: 1272},
    {name: "山东", value: 758},
    {name: "江西", value: 935},
    {name: "福建", value: 296},
    {name: "安徽", value: 990},
    {name: "浙江", value: 1215},
    {name: "江苏", value: 631},
    {name: "上海", value: 342},
    {name: "黑龙江", value: 481},
    {name: "吉林", value: 93},
    {name: "辽宁", value: 125},
    {name: "内蒙古", value: 75},
    {name: "山西", value: 133},
    {name: "河北", value: 318},
    {name: "天津", value: 136},
    {name: "北京", value: 428}
];
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
                visualMap: {//左边的图标
                    min: 0,
                    max: 100000,
                    left: 26,
                    bottom: 30,
                    showLabel: !0,
                    text: ["高", "低"],
                    pieces: [{
                        gt: 10000,
                        label: "> 10000人",
                        color: "#7f1100"
                    }, {
                        gte: 1000,
                        lte: 10000,
                        label: "1000 - 10000人",
                        color: "#ff5428"
                    }, {
                        gte: 100,
                        lt: 1000,
                        label: "100 - 1000人",
                        color: "#ff8c71"
                    }, {
                        gt: 1,
                        lt: 100,
                        label: "1 - 100人",
                        color: "#ffd768"
                    }, {
                        value: 0,
                        color: "#ffffff"
                    }],
                    show: !0
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
                    data: demoData
                }]
            };
            var myChart = echarts.init(document.getElementById('map_china'));
            myChart.setOption(option);
        } else {
            alert('无法加载该地图');
        }
    });
}