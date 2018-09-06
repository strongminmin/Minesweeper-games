//1、动态生成100个草坪小格 -----》100个div    设置雷数
// 2、鼠标点击，
// 左击时leftClick，分为：未点到雷，出现表示周围八个格雷数的数字 ；
//                      未点到雷，但周围八个格没有雷出现扩散；
//                      点到雷，GameOver。
// 右击时rightClick，没有被标记且没有数字---》进行标记。  有标记----》取消标记----->标记是否正确，
// 10个都正确标记，提示成功。
//                  已经出现数字---->无效果    
var startBtn = document.getElementById("startBtn");
var flagBox = document.getElementById("flagBox");
var box = document.getElementById("box");
var alertBox = document.getElementById("alertBox");
var alertImg = document.getElementById("alertImg");
var closeBtn = document.getElementById("closeBtn");
var score = document.getElementById("score");
var minesNum;
var mineOver;
var QiAndLei;
var block;
var mineMap = [];
var key = true;


bindEvent();
function bindEvent() {
    startBtn.onclick = function () {
        if (key) {
            flagBox.style.display = "block";
            box.style.display = "block";
            init();
            key = false;
        }
    }

    document.oncontextmenu = function () {
        return false;
    }
    document.onmousedown = function (event) {
        var e = event || window.event;
        var target = e.target || e.srcElement;
        console.log(target);
        if(target.classList.contains("block")){
            if (e.which == 1) {
                leftClick(target);
            } else if (event.which == 3) {
                rightClick(target);
            }
        }
        
    }
    
    closeBtn.onclick = function () {
        box.style.display = "none";
        flagBox.style.display = "none";
        alertBox.style.display = "none";
        box.innerHTML = "";
        key = true;
    }


    function init() {
        minesNum = 10;
        mineOver = 10;
        QiAndLei = 10;
        score.innerHTML = mineOver;
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 10; j++) {
                var con = document.createElement("div");
                con.classList.add('block');
                con.setAttribute("id", i + "-" + j);
                box.appendChild(con);
                mineMap.push({ mine: 0 });
            }
        }
        block = document.getElementsByClassName("block");
        while (minesNum) {
            var mineIndex = Math.floor(Math.random() * 100);
            if (mineMap[mineIndex].mine == 0) {
                mineMap[mineIndex] = 1;
                block[mineIndex].classList.add("isLei");
                minesNum--;
            }
        }
    }




    function leftClick(dom) {
        if(dom.classList.contains("flag")){
            return;
        }
        var isLei = document.getElementsByClassName("isLei");
        if (dom && dom.classList.contains("isLei")) {
            for (var i = 0; i < isLei.length; i++) {
                isLei[i].classList.add("show");
            }
            setTimeout(function () {
                alertBox.style.display = "block";
                alertImg.style.backgroundImage = 'url("img/over.jpg")';
                closeBtn.style.backgroundImage = 'url("img/closeBtn.png")';
            }, 800)
        } else {
            var n = 0;
            var posArr = dom && dom.getAttribute("id").split("-");
            console.log(posArr);
            var posX = posArr && +posArr[0];
            var posY = posArr && +posArr[1];
            dom && dom.classList.add('num');
            for (var i = posX - 1; i <= posX + 1; i++) {
                for (var j = posY - 1; j <= posY + 1; j++) {
                    var arroundBox = document.getElementById(i + "-" + j);
                    if (arroundBox && arroundBox.classList.contains('isLei')) {
                        n++;
                    }
                }
            }
            dom && (dom.innerHTML = n);
            if (n == 0) {
                for (var i = posX - 1; i <= posX + 1; i++) {
                    for (var j = posY - 1; j <= posY + 1; j++) {
                        var nearBox = document.getElementById(i + "-" + j);
                        if (nearBox && nearBox.length != 0) {
                            if (!nearBox.classList.contains("check")) {
                                nearBox.classList.add("check");
                                leftClick(nearBox);
                            }
                        }
                    }
                }
            }
        }
        
    }



    function rightClick(dom) {
        if(mineOver == 0 && !dom.classList.contains("flag")){
            if(!dom.classList.contains("flag")){
                return ;
            }
       
        } else {
            if (dom && dom.classList.contains("num")) {
                return;
            }
            if(dom.classList.contains("flag")){
                mineOver ++;    
                dom.classList.remove("flag")
                if (dom.classList.contains("isLei") && !dom.classList.contains("flag")) {
                    QiAndLei++;
                }
            }else {
                mineOver --;  
                dom.classList.add("flag");
                if (dom.classList.contains("isLei") && dom.classList.contains("flag")) {
                    QiAndLei--;
                }
            }

            score.innerHTML = mineOver;
            
            if (QiAndLei == 0) {
                setTimeout(function () {
                    alertBox.style.display = "block";
                    alertImg.style.backgroundImage = 'url("img/success.png")';
                    closeBtn.style.backgroundImage = 'url("img/closeBtn.png")';
                }, 800)
            }
        
        }

    }
}
