// ==UserScript==
// @name         jobBlocking_saramin_ver
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.saramin.co.kr/zf_user/jobs/list/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_listValues
// ==/UserScript==

(function () {

    let buttonMap = new Map();

    const createData = (key, element) => {

        const companyName = element.querySelector('.company_nm > a').innerText.replaceAll(' ', '');
        const jobDescription = element.querySelector('.notification_info > .job_tit > a > span').innerText.replaceAll(' ', '');

        const jobInfo = {
            key: key,
            companyName: companyName,
            jobDescription: jobDescription
        };
        return jobInfo;
    };

    const createButton = (key, element) => {

        let button = document.createElement('button');
        // html
        button.type = 'button';
        button.innerHTML = key;
        button.className = 'btn_del';

        //css
        button.style.marginTop = '2px';
        button.style.marginRight = '8px';

        button.style.display = 'inline-block';
        button.style.marginLeft = '4px';
        button.style.width = '13px';
        button.style.height = '17px';
        button.style.verticalAlign = 'top';
        button.style.fontSize = '0';
        button.style.background = 'url(//www.saraminimage.co.kr/sri/person/search_panel/spr_search_panel.png) no-repeat 2px -186px';

        const divBox = element.querySelector('.company_nm');
        divBox.style.width = '200px';
        const pos = element.querySelector('.company_nm > .interested_corp');

        divBox.insertBefore(button, pos);
        button.addEventListener("click", () => {

            let result = GM_getValue(key, null);

            if (result == null) {
                element.style.display = 'none';
                GM_setValue(key, createData(key, element));
                buttonMap.set(key, false);
                displayAllJobs(false);
            }
        });
    };

    const displayAllJobs = (isInit) => { // Find all job elements

        if(isInit){
            buttonMap = new Map();
        }
        const elements = document.querySelectorAll('[id^="rec-"]');

        elements.forEach(element => {
            const recId = element.getAttribute('id'); // jobKey
            const recValue = GM_getValue(recId, null);

            if (recValue !== null) {
                element.style.display = 'none';

            } else if (isInit) {
                buttonMap.set(recId, true);
                createButton(recId, element);
            }

        });
    }

    const removeBlockingList = ()=>{
        for(let key of GM_listValues()){
            GM_deleteValue(key);
        }
    };

    const createRemoveButton = ()=>{

        let button = document.createElement('button');
        // html
        button.type = 'button';
        button.className = 'sri_btn_md';

        //css
        button.style.display = 'inline-flex';
        button.style.marginLeft = '-34%';

        let buttonText = document.createElement('span');
        buttonText.innerHTML = 'blocking 초기화';
        buttonText.className = 'sri_btn_immediately';

        button.appendChild(buttonText);

        const divBox = document.querySelector('.list_info');
        const pos = document.querySelector('.list_select');

        divBox.insertBefore(button, pos);
        button.addEventListener("click", () => {

            if (!confirm("Blocking List 를 초기화 합니다..")) {
                alert("취소를 누르셨습니다.");
            } else {
                alert("초기화 완료.");
                removeBlockingList();
                location.reload();
            }
        });
    }

    document.querySelector('#page_count').addEventListener("change", () => {
        setTimeout(function(){
            displayAllJobs(true);
        },1000);
    });
    document.querySelector('#sort').addEventListener("change", () => {
        setTimeout(function(){
            displayAllJobs(true);
        },1000);
    });
    document.querySelector('#show_applied_recruit').addEventListener("change", () => {
        setTimeout(function(){
            displayAllJobs(true);
        },1000);
    });
    document.querySelector('#filter_ai_head_hunting').addEventListener("change", () => {
        setTimeout(function(){
            displayAllJobs(true);
        },1000);
    });
    document.querySelector('#filter_quick_apply').addEventListener("change", () => {
        setTimeout(function(){
            displayAllJobs(true);
        },1000);
    });
        'use strict';
        createRemoveButton();
        displayAllJobs(true);

})();
