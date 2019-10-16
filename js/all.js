// DOM
const userHeight = document.querySelector('.userHeight');
const userWeight = document.querySelector('.userWeight');
const list = document.querySelector('.list');

// 按鈕
const sendBmibtn = document.querySelector('.sendBmibtn');
const toggle = document.querySelector('.toggle');

// 按鈕素質切換
const userBmi = document.querySelector('.userBmi');
const bmiTag = document.querySelector('.bmiTag');
const resetBtn = document.querySelector('.resetBtn');

// 監聽
sendBmibtn.addEventListener('click', sendData, false)
list.addEventListener('click', delData, false);

// 將資料轉成物件
const data = JSON.parse(localStorage.getItem('info')) || [];

// 初始渲染
update(data);

// 將資料存進 localStrage
function sendData() {
    let height = userHeight.value;
    let weight = userWeight.value;
    if (height === '' || weight === '') { return alert('請填寫身高和體重!') }
    if (height <= 0 || weight <= 0) { return alert('請填寫正確的身高和體重!') }
    content = {
        userHeight: height,
        userWeight: weight
    };
    data.push(content);
    update(data);
    localStorage.setItem('info', JSON.stringify(data));
    // 查詢後清空欄位
    userHeight.value = null;
    userWeight.value = null;

    // 切換按鈕
    sendBmibtn.style.display = 'none';
    toggle.style.display = 'block';
}

// 更新清單
function update() {
    let str = '';
    for (let i = 0; i < data.length; i++) {
        // 身高單位轉成公尺
        let userHeight = (data[i].userHeight / 100);
        // 體位狀態
        let status = '';
        // 框線顏色
        let borderColor = '';
        // BMI 計算公式  BMI = 體重(公斤) / 身高*身高(公尺)
        let bmiVal = data[i].userWeight / (userHeight * userHeight)
        //  toFixed(2) 只取小數點後兩位
        let bmi = (bmiVal.toFixed(2));

        // 紀錄日期
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth() + 1;
        let date = today.getDate();


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
        content = `<li class="datalist" style="border-left: 4px solid   ${borderColor}  ">
                        <p class="status">  ${status}  </p>
                        <p class="listText">BMI<span class="content">   ${bmi}  </span></p>
                        <p class="listText">身高<span class="content">   ${data[i].userHeight}  </span></p>
                        <p class="listText">體重<span class="content">   ${data[i].userWeight}  </span></p>
                        <p class="listText">  ${year}  - ${month}  -  ${date}  </p>
                        <input data-num="  ${i}  " type="button" class="del" value="刪除">
                    </li>`;


        str += content;
    }
    list.innerHTML = str;

}


// 刪除
function delData(e) {
    let el = e.target.nodeName;
    // console.log(e.target.nodeName);
    if (el !== 'INPUT') { return };
    let num = e.target.dataset.num;
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