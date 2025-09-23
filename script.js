//For adding a link to a section
//getting input fields and submission button
const tabInput = document.getElementById("tab-input")
const tabCategoryInput = document.getElementById("tab-category-input")
const addTabBtn = document.getElementById("add-tab-btn")
let Tabs = []

function loadTabs() {
    const tabList=document.getElementsByClassName("tabList");
    for(let i=0;i<tabList.length;i++){
        if(tabList[i]){
            tabList[i].innerHTML="";
        }
    }
    const savedTabs = JSON.parse(localStorage.getItem("savedTabs") || "[]");
    savedTabs.forEach(tab => {
        if(tab.url && tab.category){
            createTabElement(tab.url,tab.category);
        }
    });
    Tabs=savedTabs;
} 

loadTabs();
//function to save url and category into local storage
function addTab(url,category) {
    if (url && category) {
        let tabObj = {
            url: url,
            category: category,
         //we will later create a id here as we want a unique identifier even if the user stores the same tab in the same category
        };
        Tabs.push(tabObj);
        localStorage.setItem("savedTabs", JSON.stringify(Tabs));
    }
    tabInput.value = "";
    tabCategoryInput.value = "";
}

function createTabElement(url,category){
            const tabListElement = document.createElement("li");
            const removeBtn=document.createElement("button");
            removeBtn.textContent="X";
            const a = document.createElement("a");
            a.href = url;
            a.target = "_blank";
            const iconImg = document.createElement("img")
            iconImg.src = `https://www.google.com/s2/favicons?sz=64&domain_url=${url}`;
            iconImg.alt = "siteIcon";
            //adding icon to a
            a.appendChild(iconImg);

            //adding the a element and remove button to the list element
            tabListElement.appendChild(a);
            tabListElement.appendChild(removeBtn);
            removeBtn.onclick=()=>{
                removeTab(url,category);
            }

            //finding the right category list for the input and adding it to the list
            const tabCategoryList = document.getElementById(category);
            tabCategoryList.appendChild(tabListElement);
}

function removeTab(tabUrl,tabCategory){
    const savedTabs = JSON.parse(localStorage.getItem("savedTabs") || "[]");
    const index = savedTabs.findIndex(Tab => Tab.url === tabUrl && Tab.category=== tabCategory);
    if (index !== -1) {
        savedTabs.splice(index,1);
        localStorage.setItem("savedTabs",JSON.stringify(savedTabs));
        loadTabs();
    }
}


addTabBtn.addEventListener("click",()=>{
    const tabUrl = tabInput.value.trim();
    const tabCategory = tabCategoryInput.value;
    addTab(tabUrl,tabCategory);
    createTabElement(tabUrl,tabCategory);
})

const year = document.getElementById("year");
year.textContent = new Date().getFullYear();