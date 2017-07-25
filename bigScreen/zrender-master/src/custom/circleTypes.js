define(function (require) {
    'use strict';

    var zrUtil = require('../core/util');
    var zrender = require('../zrender');
    var color = require('../tool/color');
    var Circle = require('../graphic/shape/Circle');
    var Gradient = require('../graphic/Gradient');
    var RadialGradient = require('../graphic/RadialGradient');
    var LinearGradient = require('../graphic/LinearGradient');
    var Animation = require('../animation/Animation');
    var Text = require('../graphic/Text');
    var Arc = require('../graphic/shape/Arc');

    function circleType1(initObj){
        var myobj1={
            canvasId:'',
            radianWidth:20,//弧度宽度
            crX:150,//主圆的圆心x坐标
            crY:150,//主圆的圆心y坐标
            cxr:100, //主圆半径;
            maxValue:1000, //主圆的最大值
            showValue:643, //主圆要展示的值
            percentVal:'',
            percentFontSize:30,
            colorLG1:'rgba(247,0,96,0.1)', //主圆渐变颜色1
            colorLG0:'#fe0061',//主圆渐变颜色2
            twinkleColor0:"#fff",
            twinkleColor1:"#fa5a89",
            twinkleColor3:"rgba(255,5,250,0.4)",
            h1text:"这是标题哈哈哈",
            h1Fontsize:20
        };
        var obj = {};
        for(var tempi in myobj1){
            var hasExist = false;
             for(var tempj in initObj){
                if(tempi == tempj){
                   obj[tempi] = initObj[tempj];
                   hasExist = true; 
                }
            }
            if(!hasExist){
                obj[tempi] = myobj1[tempi];
            }
        }

        var zr = zrender.init(document.getElementById(obj.canvasId));
        var percentVal = obj.percentVal? obj.percentVal : obj.showValue/obj.maxValue * 100 + '%';
        var showAngle = obj.showValue/obj.maxValue * 360 - 90; //主圆显示的弧度值
        var twinkleX = obj.crX + obj.cxr*Math.cos(showAngle * 3.14/180), //闪烁圆的圆心位置x
            twinkleY = obj.crY + obj.cxr*Math.sin(showAngle * 3.14/180);//闪烁圆的圆心位置y
                
        var colorList = [{offset:0, color:obj.colorLG0}, {offset:0.9, color:obj.colorLG1}];
        var gradient1 = new LinearGradient(0, 1, 1, 0, colorList);
        var txtShadowColor = '#ea3263';
        var circle1 = new Arc({
            shape: {
                cx: obj.crX,
                cy: obj.crY,
                r: obj.cxr,
                startAngle: (Math.PI/180) * -90,
                endAngle: (Math.PI/180) * showAngle,
            },
            style: {
                stroke: gradient1,
                fill: 'transparent',
                lineWidth:obj.radianWidth,
                lineCap: 'round'
            }
        });

        //添加闪烁点
        var circleTwinkle0 = new Circle({
            shape: {
                cx: twinkleX,
                cy: twinkleY,
                r: obj.radianWidth/2
            },
            style: {
                fill: obj.twinkleColor0,
                stroke: 'transparent'
            }
        });
        var circleTwinkle1 = new Circle({
            shape: {
                cx: twinkleX,
                cy: twinkleY,
                r: obj.radianWidth/2 + 5
            },
            style: {
                fill: obj.twinkleColor1,
                stroke: 'transparent'
            }
        });
        var circleAnimate = new Circle({
            shape: {
                cx: twinkleX,
                cy: twinkleY,
                r: obj.radianWidth/2+5
            },
            style: {
                fill: obj.twinkleColor3,
                stroke: 'transparent'
            }
        });

        //渲染主圆和闪烁点
        zr.add(circle1);            
        zr.add(circleAnimate);
        zr.add(circleTwinkle1);
        zr.add(circleTwinkle0);

        //闪烁点的动画
        var cr = obj.radianWidth/2+10;
        circleAnimate.animateShape(true)
            .when(1000, {
                r: cr + 5 > 80 ? 10 : cr + 5
            })
            .start();

        //添加中间百分比文字
        var circleTxtX = obj.crX - percentVal.length * (obj.percentFontSize/2) + obj.percentFontSize+10,
        circleTxtY = obj.crY + obj.percentFontSize/2;

        var pertextcenter0 = new Text({
            position : [circleTxtX, circleTxtY],
            style: {
                x: 0,
                y: 0,
                text: percentVal,
                width: obj.cxr*2,
                fill: '#fff',
                shadowBlur:15,
                shadowColor:txtShadowColor,
                textFont: 'bold '+ obj.percentFontSize + 'px Microsoft Yahei',
                textBaseline: 'left'
            }
        });
        zr.add(pertextcenter0);

        //添加标题
        var h1textX = obj.crX - obj.h1text.length * obj.h1Fontsize / 2,
        h1textY = obj.crY + obj.cxr + obj.h1Fontsize;
        var h1text = new Text({
            position : [h1textX, h1textY],
            style: {
                x: 0,
                y: 0,
                text: obj.h1text,
                width: obj.cxr*4,
                fill: '#fff',
                shadowBlur:15,
                shadowColor:txtShadowColor,
                textFont: obj.h1Fontsize + 'px Microsoft Yahei',
                textBaseline: 'top'
            }
        });
        zr.add(h1text);
    }
    function circleType2(initObj){
        var myobj1={
            canvasId:'',
            crX:250,//主圆的圆心x坐标
            crY:150,//主圆的圆心y坐标
            cxr:100, //主圆半径
            valTxt:'3245',
            valTxtFontSize:30,
            valTxtColor:'#fe0061',
            unitTxt:'单位',
            unitTxtFontSize:10,
            decribeTxt:'标题文字说明',
            decribeTxtColor:'#fff',
            decribeTxtFontSize:15,
            circleLineColor:'#fe0061',//主圆线的颜色
            lineShadowColor:"rgba(255,5,250,0.4)",
            shadowBlur:20
        };
        var obj = {};
        for(var tempi in myobj1){
            var hasExist = false;
             for(var tempj in initObj){
                if(tempi == tempj){
                   obj[tempi] = initObj[tempj];
                   hasExist = true; 
                }
            }
            if(!hasExist){
                obj[tempi] = myobj1[tempi];
            }
        }

        var zr2 = zrender.init(document.getElementById(obj.canvasId));
        var circle1 = new Arc({
            shape: {
                cx: obj.crX,
                cy: obj.crY,
                r: obj.cxr,
                startAngle: (Math.PI/180) * -145,
                endAngle: (Math.PI/180) * 145
            },
            style: {
                stroke: obj.circleLineColor,
                fill: 'transparent',
                lineWidth:3,
                lineCap: 'round',
                shadowBlur:30,
                shadowColor:obj.lineShadowColor
            }
        });
        var colorList = [{offset:0, color:'transparent'}, {offset:1, color:obj.lineShadowColor}];
        var gradient1 = new RadialGradient(0.5, 0.5, 0.8, colorList);
        var circle2 = new Circle({
            shape: {
                cx: obj.crX,
                cy: obj.crY,
                r: obj.cxr - 2
            },
            style: {
                fill: gradient1,
                stroke: 'transparent',
                shadowBlur:15,
                shadowColor:obj.lineShadowColor
            }
        });
        zr2.add(circle1);
        zr2.add(circle2);
        //添加描述文字
        //添加标题
        var h1textX = obj.crX - obj.cxr - obj.decribeTxt.length * obj.decribeTxtFontSize / 2,
        h1textY = obj.crY - obj.decribeTxtFontSize - 9;
        var h1text = new Text({
            position : [h1textX, h1textY],
            style: {
                x: 0,
                y: 0,
                text: obj.decribeTxt,
                width: obj.cxr*4,
                fill: obj.decribeTxtColor,
                textFont: obj.decribeTxtFontSize + 'px Microsoft Yahei',
                textBaseline: 'top'
            }
        });
        zr2.add(h1text);

        //添加数字
        var valX = obj.crX - obj.cxr - (obj.valTxt.length * (obj.valTxtFontSize / 2))/2 - (obj.unitTxt.length * obj.unitTxtFontSize)/2,
        valY = obj.crY - 5;
        var valTxt = new Text({
            position : [valX, valY],
            style: {
                x: 0,
                y: 0,
                text: obj.valTxt,
                width: obj.cxr*4,
                fill: obj.valTxtColor,
                textFont: obj.valTxtFontSize + 'px Microsoft Yahei',
                textBaseline: 'top',
                shadowBlur:15,
                shadowColor:obj.lineShadowColor
            }
        });
        zr2.add(valTxt);

        //添加单位
        var unitX = obj.crX - obj.cxr - (obj.valTxt.length * (obj.valTxtFontSize / 2))/2 + (obj.valTxt.length * obj.valTxtFontSize)/2 + 5;
        var unitY = obj.crY - 8 + (obj.valTxtFontSize - obj.unitTxtFontSize);
        //console.log(unitX +'    '+ unitY + '   '+valX);
        var unitTxt = new Text({
            position : [unitX, unitY],
            style: {
                x: 0,
                y: 0,
                text: obj.unitTxt,
                width: obj.cxr*4,
                fill: obj.valTxtColor,
                textFont: obj.unitTxtFontSize + 'px Microsoft Yahei',
                textBaseline: 'top',
                shadowBlur:15,
                shadowColor:obj.lineShadowColor
            }
        });
        zr2.add(unitTxt);
    }

    var circleTypes = function(type, obj){
        switch(type){
            case 1:
                circleType1(obj);
                break;
            case 2:
                circleType2(obj);
                break;
            default:
                return;
        }
    }

    return circleTypes;
});