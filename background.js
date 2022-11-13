const getTabId = async () => {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab.id;
}

const _blockProsellers = () => {
    images = document.querySelector("iframe#cafe_main").contentWindow.document.querySelectorAll("table img")

    for (let image of images) {
        if (image.getAttribute("src") !== "https://cafe.pstatic.net/levelicon/1/1_150.gif") 
            continue;
        const row = image.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
        row.remove();
    }
}

const blockProsellers = async () => {

    const tabId = await getTabId();
    chrome.scripting.executeScript(
        {
            target: {tabId: tabId},
            func: _blockProsellers,
        },
        () => { console.log("done") });
}

chrome.action.onClicked.addListener(tab => { blockProsellers() });