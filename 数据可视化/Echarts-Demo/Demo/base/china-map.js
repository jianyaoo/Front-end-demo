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
            var myChart = echarts.init(document.getElementById('map_china'));
            myChart.setOption(option);
        } else {
            alert('无法加载该地图');
        }
    });
}