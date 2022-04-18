// create any div           P.S  變數請加上自己的識別碼 全域變數會影響到其他的js檔案

let test3=document.createElement("div");
test3.className="test3";
test3.textContent="User Number";

// fetch or ajax api   and  get data insert div

console.log("data test ")

// finally div append box  
document.getElementById("Taipei").appendChild(test3);