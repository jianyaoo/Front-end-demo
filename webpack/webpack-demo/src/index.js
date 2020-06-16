import _ from 'lodash'
import './index.css'
import Icon from './icon.png'
import printMe from './print'


function component() {
    var element = document.createElement('div');
    element.innerHTML = _.join(['Hello', 'webpack','server'], ' ');
    element.classList.add('hello');


    // 添加点击按钮
    var btn = document.createElement('button');
    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;

    // 将图像添加到我们现有的 div。
    // var myIcon = new Image();
    //     // myIcon.src = Icon;
    //     // element.appendChild(myIcon);

    element.appendChild(btn);
    return element;
}
document.body.appendChild(component());