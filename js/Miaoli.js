// create any div     P.S  變數請加上自己的識別碼 全域變數會影響到其他的js檔案

let item=document.createElement("div");      
item.className="test";                       
item.textContent="User Number";              

// fetch or ajax api   and  get data insert div


console.log("data test ")



// finally div append box  
document.getElementById("Miaoli").appendChild(item);
