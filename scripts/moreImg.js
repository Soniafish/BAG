// console.log("morelmg.js");
var submenu_option = "";
var submenu_size = "";
var submenu_color = [];
var submenu_colorSrc = "";
var submenu_colorName = "";
var customized_cvs = [];

$(function () {
    drawHTML(imgs);
})

//組canvas的html
function drawHTML(imgAry) {
    var html = "";
    var html2 = "";
    // console.log(imgAry.length);
    for (var i = 0; i < imgAry.length; i++) {
        var w = 0;
        var h = 0;
        if (imgAry[i].size == "xs") {
            w = 1150;
            h = 1150;
        } else {
            w = 1150;
            h = 858;
        }
        var div = "<div id='cvs_" + imgAry[i].size + "' data-size='" + imgAry[i].size + "'>";
        var cvs_main = "<canvas id='cvs_" + imgAry[i].size + "_main' data-part='main' width='" + w + "' height='" + h + "'></canvas>";
        var cvs_flap = "<canvas id='cvs_" + imgAry[i].size + "_flap' data-part='flap' width='" + w + "' height='" + h + "'></canvas>";
        var cvs_strap = "<canvas id='cvs_" + imgAry[i].size + "_strap' data-part='strap' width='" + w + "' height='" + h + "'></canvas>";
        var cvs_ear = "<canvas id='cvs_" + imgAry[i].size + "_ear' data-part='ear' width='" + w + "' height='" + h + "'></canvas>";
        var cvs_button = "<canvas id='cvs_" + imgAry[i].size + "_button' data-part='button' width='" + w + "' height='" + h + "'></canvas>";
        var cvs_zip = "<canvas id='cvs_" + imgAry[i].size + "_zip' data-part='zip' width='" + w + "' height='" + h + "'></canvas>";
        html = html + div + cvs_main + cvs_flap + cvs_strap + cvs_ear + cvs_button + cvs_zip + "</div>";

        //customized_cvs
        var div2 = "<div id='cvs_" + imgAry[i].size + "_mix' data-size='" + imgAry[i].size + "'>";
        var cvs_main2 = "<canvas id='cvs_" + imgAry[i].size + "_mixed' data-part='main' width='" + w + "' height='" + h + "'></canvas>";
        html2 = html2 + div2 + cvs_main2 + "</div>";

        var customized_cvs_sample = {
            "size": imgAry[i].size,
            "src": [{
                "main": "i",
                "flap": "",
                "strap": "",
                "ear": "",
                "button": "",
                "zip": "",
            }]
        };
        customized_cvs.push(customized_cvs_sample);
    }

    $(".pdImg_group").append(html);
    $(".pdImg_mix").append(html2);
    optionClick();
}

//點擊選單
function optionClick() {
    $(".submenu_title").click(function () {
        if ($(this).parent().hasClass("active")) {
            $(this).parent().removeClass("active");
            $(".pdOption").removeClass("open");
        } else {
            submenu_option = $(this).parent().data("option");
            $(".pdOption_box").removeClass("active");
            $(this).parent().addClass("active");
            $(".pdOption").addClass("open");
            // console.log("option:" + submenu_option);
        }
    });

    $(".submenu >div").click(function () {
        $(".submenu >div").removeClass("active");
        $(this).addClass("active");
        if ($(this).parent().parent().data("option") == "size") {
            submenu_size = $(this).data("size");
        } else {
            var color1 = $(this).data("color1");
            var color2 = $(this).data("color2");
            var color3 = $(this).data("color3");
            var change_color = [color1, color2, color3];
            submenu_color = change_color;

        }
        submenu_colorSrc = $(this).find("img").attr("src");
        submenu_colorName = $(this).find("img").attr("title");
        // console.log(submenu_colorName + ", " + submenu_color + ", " + submenu_colorSrc + ", " + submenu_size);

        if (submenu_option == "size") {
            changePdImg();
        } else {
            resetImage(change_color);
        }

        var updata = [];
        updata.push($(this).parents(".pdOption_box").data("option"));
        updata.push($(this).find("img").attr("src"));
        updata.push($(this).find("img").attr("alt"));
        updates(updata);
    });

    init();
}


function init() {
    // console.log("init");
    $(".pdOption_box").each(function () {
        $(this).find(".submenu_title").click();
        $(this).find(".submenu div").eq(0).click();
    });
    $(".pdOption_box").removeClass("active");
    $(".pdOption_box .submenu div").removeClass("active");
    $(".pdOption").removeClass("open");
}

//切換尺寸圖
function changePdImg() {
    $(".pdImg_group >div").removeClass("active");
    $("#cvs_" + submenu_size).addClass("active");

    $(".pdImg_mix >div").removeClass("active");
    // console.log("active: #cvs_" + submenu_size + "_mix");
    $("#cvs_" + submenu_size + "_mix").addClass("active");

    upcanvas();
}

// 載入圖檔
function resetImage(colors) {
    for (var i = 0; i < imgs.length; i++) {
        var id = "cvs_" + imgs[i].size + "_" + submenu_option;
        var src = "";
        if (submenu_option == "main") {
            src = imgs[i].src[0].main;
        } else if (submenu_option == "flap") {
            src = imgs[i].src[0].flap;
        } else if (submenu_option == "strap") {
            src = imgs[i].src[0].strap;
        } else if (submenu_option == "ear") {
            src = imgs[i].src[0].ear;
        } else if (submenu_option == "button") {
            src = imgs[i].src[0].button;
        } else if (submenu_option == "zip") {
            src = imgs[i].src[0].zip;
        }
        // console.log("id:" + id + ", src:" + src);
        canvasLoad(id, src, colors);

    }
}

//canvas載入圖檔
function canvasLoad(id, src, colors) {
    image = new Image();
    image.onload = function () {
        var cvs = document.getElementById(id);
        var ctx = cvs.getContext("2d");
        var w = cvs.width;
        var h = cvs.height;
        ctx.drawImage(this, 0, 0, w, h);

        changeColor(id, colors);
    }
    image.src = src;
    // console.log(src);

}

function customizedCanvasLoad(id, src) {
    image = new Image();
    image.onload = function () {
        var cvs = document.getElementById(id);
        var ctx = cvs.getContext("2d");
        var w = cvs.width;
        var h = cvs.height;
        ctx.drawImage(this, 0, 0, w, h);
    }
    image.src = src;
    // console.log(src);

}

//改顏色
function changeColor(id, colors) {

    // console.log("id:" + id + ", color:" + colors);
    var cvs = document.getElementById(id);
    var ctx = cvs.getContext("2d");

    var w = cvs.width,
        h = cvs.height;

    var imgData = ctx.getImageData(0, 0, w, h);
    var data = imgData.data;
    //取得canvas物件的資訊(需要完整的坐標及範圍)
    // console.log(data);
    //再將資訊轉存出來
    //這時候用console.log(data)，就可以看到RGB的值
    for (var i = 0; i < data.length; i += 4) {
        //利用回圈將顏色全部替換
        if (data[i + 3] !== 0) {
            // red
            data[i] = colors[0] - (255 - data[i]);

            // green
            data[i + 1] = colors[1] - (255 - data[i + 1]);

            // blue
            data[i + 2] = colors[2] - (255 - data[i + 2]);
        }

    }
    // console.log(data);
    ctx.putImageData(imgData, 0, 0);
    ctx.save();
    //重新將新的影像資訊覆蓋上去

    var newImg = cvs.toDataURL("image/png");
    // console.log(id.split("_"));
    for (var j = 0; j < customized_cvs.length; j++) {
        if (customized_cvs[j].size == id.split("_")[1]) {
            // console.log(customized_cvs[j].src[0]);
            switch (id.split("_")[2]) {
                case "main":
                    customized_cvs[j].src[0].main = newImg;
                    break;
                case "flap":
                    customized_cvs[j].src[0].flap = newImg;
                    break;
                case "strap":
                    customized_cvs[j].src[0].strap = newImg;
                    break;
                case "ear":
                    customized_cvs[j].src[0].ear = newImg;
                    break;
                case "button":
                    customized_cvs[j].src[0].button = newImg;
                    break;
                case "zip":
                    customized_cvs[j].src[0].zip = newImg;
                    break;
                default:
                    break;
            }

            break;
        }
    }

    upcanvas();
}

//更新資料
function updates(data) {
    // console.log(data);

    for (var i = 0; i < $(".pdData_info").length; i++) {
        if ($(".pdData_info").eq(i).data("option") == data[0]) {
            $(".pdData_info").eq(i).find("img").attr("src", data[1]);
            $(".pdData_info").eq(i).find("img").attr("alt", data[2]);
            $(".pdData_info").eq(i).find(".pdData_name").text(data[2]);
            break;
        }

    }

}

function upcanvas() {
    for (var k = 0; k < customized_cvs.length; k++) {
        if (customized_cvs[k].size == submenu_size) {
            // console.log($(".pdImg_mix div.active").attr("id") + ", " + submenu_size);
            var customizedCanvasId = "cvs_" + submenu_size + "_mixed";
            var cvs = document.getElementById(customizedCanvasId);
            var ctx = cvs.getContext("2d");
            var w = cvs.width;
            var h = cvs.height;
            ctx.clearRect(0, 0, w, h);

            var customizedCanvasSrc = "";
            customizedCanvasSrc = customized_cvs[k].src[0].main;
            customizedCanvasLoad(customizedCanvasId, customizedCanvasSrc);

            customizedCanvasSrc = customized_cvs[k].src[0].flap;
            customizedCanvasLoad(customizedCanvasId, customizedCanvasSrc);

            customizedCanvasSrc = customized_cvs[k].src[0].strap;
            customizedCanvasLoad(customizedCanvasId, customizedCanvasSrc);

            customizedCanvasSrc = customized_cvs[k].src[0].ear;
            customizedCanvasLoad(customizedCanvasId, customizedCanvasSrc);

            customizedCanvasSrc = customized_cvs[k].src[0].button;
            customizedCanvasLoad(customizedCanvasId, customizedCanvasSrc);

            customizedCanvasSrc = customized_cvs[k].src[0].zip;
            customizedCanvasLoad(customizedCanvasId, customizedCanvasSrc);
            break;
        }
    }
}

function downloadImg() {
    // console.log("downloadImg");
    var id = $(".pdImg_mix .active canvas").attr("id");
    // console.log(id);
    var cvs = document.getElementById(id);
    var newImg = cvs.toDataURL("image/png");
    document.getElementById("downloadBtn").download = "customizedBag2.png";
    document.getElementById("downloadBtn").href = newImg;
    // document.getElementById("downloadBtn").href = cvs.toDataURL("image/jpg"); // it will save locally 
}