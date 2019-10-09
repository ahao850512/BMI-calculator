// DOM
var userHeight = document.querySelector('.userHeight');
var userWeight = document.querySelector('.userWeight');
var list = document.querySelector('.list');

// 按鈕
var sendBmibtn = document.querySelector('.sendBmibtn');
var toggle = document.querySelector('.toggle');

// 按鈕素質切換
var userBmi = document.querySelector('.userBmi');
var bmiTag = document.querySelector('.bmiTag');
var resetBtn = document.querySelector('.resetBtn');

// 監聽
sendBmibtn.addEventListener('click', sendData, false)
list.addEventListener('click', delData, false);

// 將資料轉成物件
var data = JSON.parse(localStorage.getItem('info')) || [];

// 初始渲染
update(data);

// 將資料存進 localStrage
function sendData() {
    var height = userHeight.value;
    var weight = userWeight.value;
    if (height === '' || weight === '') { return alert('請填寫身高和體重!') }
    if (height <= 0 || weight <= 0) { return alert('請填寫正確的身高和體重!') }
    content = {
        userHeight: height,
        userWeight: weight
    };
    data.push(content);
    update(data);
    localStorage.setItem('info', JSON.stringify(data));
    userHeight.value = " ";
    userWeight.value = " ";

    // 切換按鈕
    sendBmibtn.style.display = 'none';
    toggle.style.display = 'block';
}

// 更新清單
function update() {
    var str = '';
    for (var i = 0; i < data.length; i++) {
        // 身高單位轉成公尺
        var userHeight = (data[i].userHeight / 100);
        // 體位狀態
        var status = '';
        // 框線顏色
        var borderColor = '';
        // BMI 計算公式  BMI = 體重(公斤) / 身高*身高(公尺)
        var bmiVal = data[i].userWeight / (userHeight * userHeight)
        //  toFixed(2) 只取小數點後兩位
        var bmi = (bmiVal.toFixed(2));

        // 紀錄日期
        var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth() + 1;
        var date = today.getDate();


        // 體位判斷
        if (bmi <= 15) { status = '非常嚴重的體重不足', borderColor = '#6f2fff' }
        else if (bmi > 15 && bmi <= 16) { status = '嚴重體重不足', borderColor = '#2f96ff' }
        else if (bmi > 16 && bmi <= 18.5) { status = '體重過輕', borderColor = '#2fffd5' }
        else if (bmi > 18.5 && bmi <= 25) { status = '理想', borderColor = '#2fff39' }
        else if (bmi > 25 && bmi <= 30) { status = '體重過重', borderColor = '#ff982d' }
        else if (bmi > 30 && bmi <= 35) { status = '中等肥胖', borderColor = '#ff6c03' }
        else if (bmi > 35 && bmi <= 40) { status = '嚴重肥胖', borderColor = '#ff6c03' }
        else { status = '非常嚴重肥胖', borderColor = '#ff1200' }

        // 按鈕判定
        toggle.style.border = "4px solid " + borderColor;
        userBmi.textContent = bmi;
        userBmi.style.color = borderColor;
        bmiTag.style.color = borderColor;
        resetBtn.style.backgroundColor = borderColor;

        // 組合 html
        content = '<li class="datalist" style="border-left: 4px solid ' + borderColor + '">'
            + '<p class="status">' + status + '</p>'
            + '<p class="listText">BMI<span class="content"> ' + bmi + '</span></p>'
            + '<p class="listText">身高<span class="content"> ' + data[i].userHeight + '</span></p>'
            + '<p class="listText">體重<span class="content"> ' + data[i].userWeight + '</span></p>'
            + '<p class="listText">' + year + '-' + month + '-' + date + '</p>'
            + '<input data-num="' + i + '" type="button" class="del" value="刪除">'
            + '</li>';

        str += content;
    }
    list.innerHTML = str;

}


// 刪除
function delData(e) {
    var el = e.target.nodeName;
    // console.log(e.target.nodeName);
    if (el !== 'INPUT') { return };
    var num = e.target.dataset.num;
    data.splice(num, 1);
    localStorage.setItem('info', JSON.stringify(data));
    update(data);

}

// reset 按鈕

resetBtn.addEventListener('click', switchInitial, false)


function switchInitial() {
    sendBmibtn.style.display = 'block';
    toggle.style.display = 'none';
}