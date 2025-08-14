document.addEventListener("DOMContentLoaded", function () {
    // 所有初始化都放在這裡
    initHomePageAnimations();       // index 一進來的互動
    initSearch();       // 搜尋功能
    initAsideButtons();         // 至頂上面那三個點與下拉選單
    initDropdown();     //下拉選單
    initGoTop();            // 至頂按鈕
    initPage2for2();        // page2-2的工作指標
    initBanner();   //Banner 初始化放這
    initCareer();       // 職涯探索
    initFuture();        // 模擬選擇
    initQuestion();     // 人格測驗
    initNextPage();     // 漫畫
    initNow();        // 即時回答

});

function initHomePageAnimations() {
    const choose0 = document.getElementById("ch0");
    if (!choose0) return;  // 這頁不是首頁，跳出
    const prefect = document.querySelector(".prefect");
    const backgroundLayer = document.querySelector(".backgroundLayer");
    const title = choose0.querySelector(".title");

    // 初始化：隱藏全部選項，只顯示ch0
    document.querySelectorAll(".choose").forEach(el => {
        el.style.display = "none";
        el.classList.remove("active");
    });
    choose0.style.display = "flex";

    // 第一階段:過1秒 → prefect移動到右下角
    setTimeout(() => {
        prefect.classList.add("toCorner");
    }, 1000);

    // 第二階段:再過 0.8秒 → 背景產生半透明遮罩
    setTimeout(() => {
        backgroundLayer.classList.add("dim");
    }, 1800);

    // 第三階段:再過0.5秒 → 顯示title
    setTimeout(() => {
        title.classList.add("show");
    }, 2300);

    // 第四階端:再過1秒 → title往上移並顯示ch0按鈕
    setTimeout(() => {
        title.classList.add("moveUp");
        choose0.classList.add("active");
    }, 3300);

    let currentChooseId = "ch0";
    function showChoose(newId) {
        if (newId === currentChooseId) return;

        const oldEl = document.getElementById(currentChooseId);
        const newEl = document.getElementById(newId);

        if (!oldEl || !newEl) return;

        // 移除舊選項 active 並隱藏
        oldEl.classList.remove("active");
        oldEl.style.display = "none";

        // 顯示新選項並加 active
        newEl.style.display = "flex";
        newEl.classList.add("active");
        currentChooseId = newId;
        const newTitle = newEl.querySelector(".title");
        if (newTitle) {
            newTitle.classList.add("show");     // 後續題目繼續顯示
        }
    }

    // ch0 → 切換至ch1
    document.querySelector('#ch0 .word').addEventListener('click', () => {
        showChoose('ch1');
    });

    // ch1 → 切換至ch2或ch3
    const ch1Buttons = document.querySelectorAll('#ch1 .word');
    ch1Buttons.forEach((button, i) => {
        button.addEventListener('click', () => {
            if (i === 0) showChoose('ch2');
            else if (i === 1) showChoose('ch3');
        });
    });

    // 返回按鈕事件
    document.getElementById('back2').addEventListener('click', () => {
        showChoose('ch1');
    });
    document.getElementById('back3').addEventListener('click', () => {
        showChoose('ch1');
    });

    // ch2 跳轉頁面
    const ch2Buttons = document.querySelectorAll('#ch2 .word');
    ch2Buttons.forEach((button, i) => {
        if (i < 4) {
            button.addEventListener('click', () => {
                const pages = [
                    'page1-1.html',
                    'page1-2.html',
                    'page1-3.html',
                    'answerNow.html'
                ];
                window.location.href = pages[i];
            });
        }
    });

    // ch3 跳轉頁面
    const ch3Buttons = document.querySelectorAll('#ch3 .word');
    ch3Buttons.forEach((button, i) => {
        if (i < 4) {
            button.addEventListener('click', () => {
                const pages = [
                    'page2-1.html',
                    'page2-2.html',
                    'page2-3.html',
                    'answerNow.html'
                ];
                window.location.href = pages[i];
            });
        }
    });
}


// 搜尋按鈕
function initSearch() {
    const searchContainer = document.querySelector(".searchContainer");
    if (!searchContainer) return;
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.querySelector(".searchButton");
    let isInputVisible = false;
    const keywordAll = {
        "文章": "./writing.html",
        "影片": "./video.html",
        "漫畫": "./caricature.html",
        "分享": "./conversation.html",
        "問答": "./answerNow.html",
        "模擬選擇": "./futureChoose.html",
        "人格測驗": "./personality.html",
        "職涯": "./career.html"
    };
    // 點擊搜尋 icon
    searchButton.addEventListener("click", (ent) => {
        ent.stopPropagation(); // 阻止冒泡，避免被全域點擊事件關掉
        const isMobile = window.innerWidth < 768;
        if (!isInputVisible) {
            // 第一次點擊 → 顯示 input 並 focus
            searchContainer.classList.add("active");
            searchInput.focus();
            isInputVisible = true;
        } else {
            if (isMobile) {
                // 手機：第二次點擊觸發搜尋
                performSearch();
            } else {
                // 桌機：第二次點擊關閉 input
                searchContainer.classList.remove("active");
                isInputVisible = false;
                searchInput.value = ""; // 清空輸入框（可選）
            }
        }
    });

    // 監聽 Enter 按鍵
    searchInput.addEventListener("keydown", function (ent) {
        if (ent.key === "Enter") {
            ent.preventDefault();
            performSearch();
        }
    });

    // 搜尋邏輯抽出來
    function performSearch() {
        const keyword = searchInput.value.trim().toLowerCase();
        if (keyword) {
            if (keywordAll[keyword]) {
                window.location.href = keywordAll[keyword];
            } else {
                window.location.href = "./page1-1.html";
            }
        }
    }

    // 點擊輸入框不要關閉
    searchInput.addEventListener("click", (ent) => {
        ent.stopPropagation();
    });

    // 點擊任意非搜尋區域 → 關閉 input（無論裝置）
    document.addEventListener("click", () => {
        if (isInputVisible) {
            searchContainer.classList.remove("active");
            isInputVisible = false;
            searchInput.value = "";
        }
    });

    // RWD：視窗改變時同步更新狀態（避免行為錯亂）
    window.addEventListener("resize", () => {
        // 若輸入框已開啟，但裝置模式變化，重置狀態
        if (isInputVisible) {
            searchContainer.classList.remove("active");
            isInputVisible = false;
            searchInput.value = "";
        }
    });
}


// 模擬選擇
function initFuture() {
    const q1 = document.getElementById("q1");
    if (!q1) return;
    const question = document.querySelector(".question");
    const answer = document.querySelector(".answer");
    // 初始化：隱藏全部選項，只顯示q1
    document.querySelectorAll(".step").forEach(fu => {
        fu.style.display = "none";
        fu.classList.remove("active")
    });
    q1.style.display = "flex";

    setTimeout(() => { question.classList.add("show"); }, 1000)
    setTimeout(() => { question.classList.add("moveUp"); }, 1500);
    setTimeout(() => { q1.classList.add("active"); }, 2000)
    setTimeout(() => {
        document.querySelectorAll("button.answer").forEach(btn => {
            btn.classList.add("show-answer");
        });
    }, 2500);

    let currentStepId = "q1";
    function showStep(newId) {
        if (newId === currentStepId) return;
        const oldFu = document.getElementById(currentStepId);
        const newFu = document.getElementById(newId);
        if (!oldFu || !newFu) return;
        oldFu.classList.remove("active");
        oldFu.style.display = "none";
        newFu.style.display = "flex";
        newFu.classList.add("active");
        currentStepId = newId;
        const newTitle = newFu.querySelector(".question");
        if (newTitle) {
            newTitle.classList.add("show");
        }
    }

    function showResult(id) {
        document.querySelectorAll(".result").forEach(r => r.classList.remove("active"));
        const result = document.getElementById(id);
        if (result) result.classList.add("active");

        const currentStep = document.getElementById(currentStepId);
        if (currentStep) {
            currentStep.classList.remove("active");
            currentStep.style.display = "none";
        }
    }

    // q1切換至q2或q3
    const q1Buttons = document.querySelectorAll("#q1 .answer");
    q1Buttons.forEach((button, j) => {
        button.addEventListener("click", () => {
            if (j === 0) showStep("q2");
            else if (j === 1) showStep("q3");
        });
    });
    // 返回按鈕
    document.getElementById("back4").addEventListener("click", () => { showStep("q1") });
    document.getElementById("back5").addEventListener("click", () => { showStep("q1") });
    // 退出按鈕
    const out1 = document.getElementById("out1");
    const out2 = document.getElementById("out2");
    const out3 = document.getElementById("out3");
    const out4 = document.getElementById("out4");
    const out5 = document.getElementById("out5");
    const out6 = document.getElementById("out6");
    const out7 = document.getElementById("out7");
    const out8 = document.getElementById("out8");
    const out9 = document.getElementById("out9");

    out1.addEventListener("click", () => { window.location.href = "reset.html"; })
    out2.addEventListener("click", () => { window.location.href = "reset.html"; })
    out3.addEventListener("click", () => { window.location.href = "reset.html"; })
    out4.addEventListener("click", () => { window.location.href = "reset.html"; })
    out5.addEventListener("click", () => { window.location.href = "reset.html"; })
    out6.addEventListener("click", () => { window.location.href = "reset.html"; })
    out7.addEventListener("click", () => { window.location.href = "reset.html"; })
    out8.addEventListener("click", () => { window.location.href = "reset.html"; })
    out9.addEventListener("click", () => { window.location.href = "reset.html"; })


    // q2 → 顯示結果 r1 或 r2
    const q2Buttons = document.querySelectorAll("#q2 .answer");
    q2Buttons.forEach((button, j) => {
        button.addEventListener("click", () => {
            if (j === 0) showResult("r1");
            else if (j === 1) showResult("r2");
        });
    });

    // q3 → 顯示結果 r3~r6
    const q3Buttons = document.querySelectorAll("#q3 .answer");
    q3Buttons.forEach((button, j) => {
        if (j < 4) {
            button.addEventListener("click", () => showResult("r" + (j + 3)));
        }
    });
}

// 至頂上面那個按鈕
function initAsideButtons() {
    const asideButton = document.querySelector(".asideButton");
    const asideButtons = document.querySelector(".asideButtons");
    if (!asideButton || !asideButtons) return;
    asideButton.addEventListener("click", () => {
        asideButton.classList.toggle('rotate');
        asideButtons.classList.toggle('show');
    });
}

// 至頂按鈕
function initGoTop() {
    const goTop = document.getElementsByClassName("goTop")[0];
    if (!goTop) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 150) {
            goTop.classList.add("show");
        } else {
            goTop.classList.remove("show");
        }
    });
    goTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"       // 平滑移動
        });
    });
}

// 下拉選單
function initDropdown() {
    const asideButton = document.querySelector(".asideButton");
    const asideButtons = document.querySelector(".asideButtons");
    const dropdowns = document.querySelectorAll(".dropdown");
    if (!asideButton || !asideButtons) return;
    // 1. 點擊右下角按鈕 → 展開/收合 asideButtons
    asideButton.addEventListener("click", function () {
        asideButtons.classList.toggle("active");
    });

    // 2. 裝置寬度 < 768px 判讀為click，其餘是hover
    function setupMenuEvents() {
        const isMobile = window.innerWidth < 768;

        dropdowns.forEach(dropdown => {
            const menu = dropdown.querySelector(".dropdownMenu");
            const trigger = dropdown.querySelector("a");

            // 先移除舊事件（避免多次綁定）
            dropdown.replaceWith(dropdown.cloneNode(true));
        });

        // 重新抓取克隆後的元素（因為上面清事件）
        const newDropdowns = document.querySelectorAll(".dropdown");
        newDropdowns.forEach(dropdown => {
            const menu = dropdown.querySelector(".dropdownMenu");
            const trigger = dropdown.querySelector("a");
            if (isMobile) {
                // 行動裝置 → 點擊開合
                trigger.addEventListener("click", function (e) {
                    e.preventDefault(); // 阻止連結跳轉
                    menu.classList.toggle("show");
                });
            } else {
                // Web版 → hover進去出來來控制開闔
                dropdown.addEventListener("mouseenter", function () {
                    menu.classList.add("show");
                });
                dropdown.addEventListener("mouseleave", function () {
                    menu.classList.remove("show");
                });
            }
        });
    }
    // 初始化 & 視窗大小變化時重新設定
    setupMenuEvents();
    window.addEventListener("resize", setupMenuEvents);
}

// page2-2的轉職量表
function initPage2for2() {
    const sentButton = document.querySelector(".sent");
    if (!sentButton) return;

    sentButton.addEventListener("click", function (){
        const score1 = parseInt(document.getElementById('score1').value, 10);
        const score2 = parseInt(document.getElementById('score2').value, 10);
        const learn = document.querySelector('input[name="learn"]:checked');
        const apply = document.querySelector('input[name="apply"]:checked');

        // 驗證輸入是否正確
        if (isNaN(score1) || score1 < -5 || score1 > 5) {
            alert('請輸入 -5 到 5 之間的整數（投入程度）');
            return;
        }
        if (isNaN(score2) || score2 < -5 || score2 > 5) {
            alert('請輸入 -5 到 5 之間的整數（能量消耗）');
            return;
        }
        if (!learn) {
            alert('請選擇「主動學習」的選項');
            return;
        }
        if (!apply) {
            alert('請選擇「跨領域應用」的選項');
            return;
        }
        // 計算總分
        const total = score1 + score2 + parseInt(learn.value, 10) + parseInt(apply.value, 10);
        // 顯示結果
        let comment = "";
        if (total >= 8) {
            comment = "你對這份工作整體滿意度還算不錯，可以繼續深耕！";
        } else {
            comment = "或許是時候思考是否該往下一個目標邁進了。";
        }
        document.getElementById("result").innerHTML = `總分：${total} 分<br>${comment}`;
    });
}

function initBanner(){
    document.addEventListener("DOMContentLoaded", function () {
        const slides = document.querySelector(".slides");
        if (!slides) return;
        const images = document.querySelectorAll(".slides img");
        const prevButton = document.querySelector(".prev");
        const nextButton = document.querySelector(".next");
        const dots = document.querySelectorAll(".dot");

        let index = 0;
        let slideInterval;
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        function showSlide(i) {
            if (i < 0) i = images.length - 1;
            if (i >= images.length) i = 0;
            index = i;
            slides.style.transform = `translateX(-${index * 100}%)`;
            updateDots();
        }

        function updateDots() {
            dots.forEach(dot => dot.classList.remove("active"));
            dots[index].classList.add("active");
        }

        function startAutoSlide() {
            slideInterval = setInterval(() => showSlide(index + 1), 3000);
        }

        function stopAutoSlide() {
            clearInterval(slideInterval);
        }

        prevButton.addEventListener("click", () => { showSlide(index - 1); stopAutoSlide(); startAutoSlide(); });
        nextButton.addEventListener("click", () => { showSlide(index + 1); stopAutoSlide(); startAutoSlide(); });

        dots.forEach(dot => {
            dot.addEventListener("click", () => {
                showSlide(parseInt(dot.dataset.index));
                stopAutoSlide();
                startAutoSlide();
            });
        });

        //手機觸控滑動
        slides.addEventListener("touchstart", e => { startX = e.touches[0].clientX; }, { passive: true });
        slides.addEventListener("touchend", e => {
            const diff = e.changedTouches[0].clientX - startX;
            if (diff > 50) showSlide(index - 1);
            else if (diff < -50) showSlide(index + 1);
        });

        // 電腦滑鼠拖曳
        slides.addEventListener("mousedown", e => {
            isDragging = true;
            startX = e.clientX;
            slides.style.cursor = "grabbing";
        });
        slides.addEventListener("mouseup", e => {
            if (!isDragging) return;
            isDragging = false;
            slides.style.cursor = "grab";
            const diff = e.clientX - startX;
            if (diff > 50) showSlide(index - 1);
            else if (diff < -50) showSlide(index + 1);
        });
        slides.addEventListener("mouseleave", () => { isDragging = false; slides.style.cursor = "grab"; });

        // 初始化
        showSlide(0);
        startAutoSlide();
    });
}


// 人格測驗
function initQuestion() {
    const resultPerson = document.getElementById("resultPerson");
    if (!resultPerson) return;
    document.querySelector('.allright').addEventListener('click', () => {
        const totalQuestions = 10;
        let totalScore = 0;

        for (let i = 1; i <= totalQuestions; i++) {
            // 找出該題被選的 radio
            const selected = document.querySelector(`input[name="no${i}"]:checked`);
            if (!selected) {
                alert(`請完成第 ${i} 題的選擇`);
                return;  // 跳出函式，不繼續計算
            }
            totalScore += parseInt(selected.value);
        }

        // 根據分數給出職涯建議和評語
        let careerType = "";
        let careerComment = "";

        if (totalScore <= 20) {
            careerType = "技術職 / 工程領域";
            careerComment = "你邏輯清晰，實作能力強，適合在技術與工程方面深耕發展。";
        } else if (totalScore <= 30) {
            careerType = "創意產業 / 設計 / 媒體";
            careerComment = "你富有想像力，重視表達與美感，適合發展創意相關職涯。";
        } else if (totalScore <= 35) {
            careerType = "社會服務 / 教育 / 輔導";
            careerComment = "你具有良好的人際敏感度，喜歡助人，是個優秀的溝通者與協調者。";
        } else {
            careerType = "管理 / 領導 / 創業";
            careerComment = "你有領導潛力與決策力，適合走向管理層或創業之路。";
        }
        document.getElementById('resultPreson').textContent = `適合職涯方向：${careerType}  ${careerComment}`;
    });

}


//職涯探索的時間軸
function initCareer() {
    const items = document.querySelectorAll(".lifeline-item");
    if (!items) return;
    items.forEach(item => {
        const icon = item.querySelector(".icon");
        const title = item.querySelector(".title");
        [icon, title].forEach(life => {
            life.addEventListener("click", () => {
                if (window.innerWidth <= 768) {
                    item.classList.toggle("active");
                }
            });
        });
    });
};


// 漫畫caricature
function initNextPage() {
    let psychology = document.querySelectorAll(".psychology");
    if (!psychology) return;
    document.querySelectorAll('.psychology').forEach(section => {
        const change = section.querySelector('.change');
        const images = change.querySelectorAll('img');
        const totalImages = images.length;
        let currentIndex = 0;

        const updateTransform = () => {
            change.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        // 左右按鈕功能
        section.querySelector('.moveLeft').addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateTransform();
            }
        });

        section.querySelector('.moveRight').addEventListener('click', () => {
            if (currentIndex < totalImages - 1) {
                currentIndex++;
                updateTransform();
            }
        });

        // 手指滑動功能（RWD）
        let startX = 0;
        let endX = 0;

        change.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        change.addEventListener('touchmove', (e) => {
            endX = e.touches[0].clientX;
        });

        change.addEventListener('touchend', () => {
            const diff = startX - endX;
            if (diff > 50 && currentIndex < totalImages - 1) {
                currentIndex++;
            } else if (diff < -50 && currentIndex > 0) {
                currentIndex--;
            }
            updateTransform();
        });
    });
}


// 即時回答
function initNow() {
    const inputField = document.getElementById("userInput");
    const chatArea = document.getElementById("chatArea");
    const sendButton = document.getElementById("sentMessage");

    if (!inputField || !chatArea || !sendButton) return;

    // 綁定送出按鈕
    sendButton.addEventListener("click", function () {
        sendMessage();
    });

    // 綁定 Enter 鍵
    inputField.addEventListener("keydown", function (k) {
        if (k.key === "Enter") {
            k.preventDefault(); // 避免跳行
            sendMessage();
        }
    });

    function getCurrentTime() {
        const now = new Date();
        return (
            now.getHours().toString().padStart(2, "0") +
            ":" +
            now.getMinutes().toString().padStart(2, "0")
        );
    }

    document.getElementById("userInput").addEventListener("keydown", function (k) {
        if (k.key === "Enter") {
            sendMessage();
        }
    });

    function sendMessage() {
        console.log('Sending message from inside initNow().');
        const input = document.getElementById("userInput");
        const message = input.value.trim();
        if (message === "") return;

        appendMessage("user", message, getCurrentTime(), "已讀");

        handleReply(message);

        input.value = "";
    }

    function appendMessage(sender, text, time, status) {
        const chatArea = document.getElementById("chatArea");

        const container = document.createElement("div");
        container.classList.add("message", sender);

        if (text.startsWith("http")) {
            container.innerHTML = `<a href="${text}" target="_blank">${text}</a>`;
        } else if (text.includes("<a") || text.includes("<")) {
            container.innerHTML = text;
        } else {
            container.textContent = text;
        }

        const wrapper = document.createElement("div");
        wrapper.style.display = "flex";
        wrapper.style.flexDirection = "column";
        wrapper.style.alignItems = sender === "user" ? "flex-end" : "flex-start";

        const timeElem = document.createElement("div");
        timeElem.className = "timestamp";
        timeElem.textContent = time;

        container.appendChild(timeElem);

        if (sender === "user" && status) {
            const statusElem = document.createElement("div");
            statusElem.className = "status";
            statusElem.textContent = status;
            container.appendChild(statusElem);
        }

        wrapper.appendChild(container);
        chatArea.appendChild(wrapper);
        chatArea.scrollTop = chatArea.scrollHeight;
    }

    function handleReply(message) {
        const replyTime = getCurrentTime();

        if (message.includes("你好")) {
            setTimeout(() => appendMessage("bot", "哈囉，你好！", replyTime), 1000);
        } else if (message.includes("你是誰")) {
            setTimeout(() => appendMessage("bot", "我是你的聊天機器人。", replyTime), 1000);
        } else if (message.includes("謝謝")) {
            setTimeout(() => appendMessage("bot", "不客氣喔！幫助到你是我的榮幸", replyTime), 1000);
        } else if (message.includes("什麼是冒牌者症候群?")) {
            const replies = [
                "冒牌者症候群通常有以下幾個特徵",
                "1.被誇獎的恐懼：當被讚美或者獲得他人肯定時感到羞愧、尷尬。2.自我懷疑：低估自己的成就及表現，認為所擁有的成就皆是靠運氣得來。3.完美主義：為自己訂下難以達成的高標準，以高標準審視自己是否出錯，需要取得心中的一百分。4.保持距離：與他人保持疏離狀態及避免暴露自己的實力，以免被發現自己名不符實。",
                "我們這邊有一則關於冒牌者症候群的文章你看一下",
                "<a href='writing1.html'>冒牌者症候群(文章)</a>"
            ];
            replies.forEach((text, index) => {
                setTimeout(() => appendMessage("bot", text, replyTime), 1000 + index * 1000);
            });
        } else if (message.includes("什麼是心理韌性?")) {
            const replies = [
                "心理韌性(Psychological Resilience)講的不是心靈雞湯，而是一套能透過訓練建立的內在技能。心理韌性就像一片草原，平時隨風擺盪，四處拓展，但卻能在你跌倒時接住你，減緩正面著地的傷害，甚至化作草藥成為你復原的力量。",
                "這邊有一則關於心理韌性的文章可點擊下方連結",
                "<a href='writing3.html'>心理韌性(文章)</a>"
            ];
            replies.forEach((text, index) => {
                setTimeout(() => appendMessage("bot", text, replyTime), 1000 + index * 1000);
            });
        } else if (message.includes("我要幫助")) {
            const replies = [
                "了解，你需要幫助。",
                "但我不知道該如何幫助你",
                "請你自己保重"
            ];
            replies.forEach((text, index) => {
                setTimeout(() => appendMessage("bot", text, replyTime), 1000 + index * 1000);
            });
        } else {
            setTimeout(() => appendMessage("bot", "我不太懂你的意思喔~", replyTime), 2000);
        }
    }
}



