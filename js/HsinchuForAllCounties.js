// // // This flag is to prevent the condition of disorder fetching data via API.
// // let isLoading = false;
// // function detectLoading(signal) {
// //     isLoading = signal;
// // }



// // let HsinchuDateResult = getHsinchuDate();
// // // This function is to display the counties by order but there is no animation at the bottom when fetching data by API.
// // // We can add a loading animation.
// // const urlList = ["061", "005", "009", "013"]
// // const region = ["台北市", "桃園市", "新竹縣", "苗栗縣"]
// // let count = 0
// // const url = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-${urlList[count]}?Authorization=CWB-128F473D-B2BF-4B83-A58E-9D6B67F3212E&elementName=WeatherDescription&startTime=${HsinchuDateResult.tmr}T06%3A00%3A00%2C${HsinchuDateResult.tmr}T18%3A00%3A00%2C${HsinchuDateResult.afterTmr}T06%3A00%3A00%2C${HsinchuDateResult.afterTmr}T18%3A00%3A00`;
// // getHsinchuData(url, region[count])
// // window.addEventListener("scroll", () => {
// //     const scrollable = document.documentElement.scrollHeight - window.innerHeight;
// //     const scrlled = window.scrollY;

// //     if (Math.ceil(scrlled) === scrollable) {
// //         if (count < 4 && isLoading === false) {
// //             count += 1
// //             const url = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-${urlList[count]}?Authorization=CWB-128F473D-B2BF-4B83-A58E-9D6B67F3212E&elementName=WeatherDescription&startTime=${HsinchuDateResult.tmr}T06%3A00%3A00%2C${HsinchuDateResult.tmr}T18%3A00%3A00%2C${HsinchuDateResult.afterTmr}T06%3A00%3A00%2C${HsinchuDateResult.afterTmr}T18%3A00%3A00`;
// //             getHsinchuData(url, region[count])
// //         };
// //     }
// // });

// let HsinchuDateResult = getHsinchuDate();
// const urlList = ["061", "005", "009", "013"]
// const region = ["台北市", "桃園市", "新竹縣", "苗栗縣"]
// const url = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-${urlList[2]}?Authorization=CWB-29C680B9-7774-4061-8C58-7BB71F2805C8&elementName=WeatherDescription&startTime=${HsinchuDateResult.tmr}T06%3A00%3A00%2C${HsinchuDateResult.tmr}T18%3A00%3A00%2C${HsinchuDateResult.afterTmr}T06%3A00%3A00%2C${HsinchuDateResult.afterTmr}T18%3A00%3A00`;
// getHsinchuData(url, region[2])



// //  The code, below, refers from my teammate Kailun.
// // 取得明天、後天的日期與指定時間
// // OK

// function getHsinchuDate() {
//     let today = new Date();
//     let year = today.getFullYear();
//     let month = today.getMonth();
//     let tmrDay = today.getDate() + 1;

//     let dateArr = [year, month + 1, tmrDay, tmrDay + 1]
//     // 處理月份跟日期為單數時，在前面補零
//     dateArr.forEach((num) => {
//         let index = dateArr.indexOf(num);
//         if (String(num).length < 2) {
//             num = "0" + num;
//         } else {
//             num = String(num)
//         }
//         dateArr.splice(index, 1, num)
//     })

//     // 明天、後天日期
//     tmr = dateArr[0] + "-" + dateArr[1] + "-" + dateArr[2];
//     afterTmr = dateArr[0] + "-" + dateArr[1] + "-" + dateArr[3];
//     // 取得星期幾
//     let weekArr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
//     let tmrWeek = weekArr[new Date(year, month, tmrDay).getDay()];
//     let afterTmrWeek = weekArr[new Date(year, month, tmrDay + 1).getDay()];
//     let dateObj = {
//         "tmr": tmr,
//         "afterTmr": afterTmr,
//         "tmrWeek": tmrWeek,
//         "afterTmrWeek": afterTmrWeek
//     }
//     return dateObj
// }

// // 取得 台北市未來一周天氣預報 資料
// function getHsinchuData(url, region) {
//     // detectLoading(true)
//     fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             sortData(data, region)
//             // detectLoading(false)
//         })
//         .catch(error => console.error(error))
// }


// // 整理要放進 table 的資料
// function sortData(data, region) {
//     let datas = data.records.locations[0].location;
//     let wantedData = [];
//     datas.forEach((HsinchuDistrict) => {
//         let tempObj = {}
//         tempObj.district = HsinchuDistrict.locationName;
//         tempObj.tmrDayDesc = HsinchuDistrict.weatherElement[0].time[0].elementValue[0].value;
//         tempObj.tmrNightDesc = HsinchuDistrict.weatherElement[0].time[1].elementValue[0].value;
//         tempObj.afterTmrDayDesc = HsinchuDistrict.weatherElement[0].time[2].elementValue[0].value;
//         tempObj.afterTmrNightDesc = HsinchuDistrict.weatherElement[0].time[3].elementValue[0].value;
//         wantedData.push(tempObj)
//     })

//     renderHsinchuWeather(wantedData, region)
// }

// // parentNode=>titleTop
// // tagName=> "th"
// // tagName=> "title-district"
// // content=>("地區" or null
// // childNodeTag=>"p"
// // childClassName=> ("date-txt", "week-txt")
// //contentType=> 1=> `${tmr[1]} / ${tmr[2]}`,  2=>
// // childtext1=> `${tmr[1]} / ${tmr[2]}` or `${afterTmr[1]} / ${afterTmr[2]}`)
// // childtext2=> "tmrWeek" or "afterTmrWeek"

// // This function's variable name is a bit weird cuz I use a common name for all situations, so I don't change it.
// function createThTage(parentNode, tagName, className, content, rowspan, childNodeTag, childClassName, childtext1, childtext2) {
//     let titleDistrict = parentNode.appendChild(document.createElement(tagName));

//     titleDistrict.className = className
//     if (rowspan !== null) {
//         titleDistrict.setAttribute("rowspan", "2");
//     }
//     if (content !== null) {
//         titleDistrict.appendChild(document.createTextNode(content));
//     }
//     if (childNodeTag !== null) {
//         let dateTmrTxt = titleDistrict.appendChild(document.createElement(childNodeTag));
//         dateTmrTxt.className = childClassName[0];
//         dateTmrTxt.appendChild(document.createTextNode(`${childtext1[1]} / ${childtext1[2]}`));

//         let weekTmrTxt = titleDistrict.appendChild(document.createElement(childNodeTag));
//         weekTmrTxt.className = childClassName[1];
//         weekTmrTxt.appendChild(document.createTextNode(childtext2));
//     }
// }

// // parentNode=> dayWeather or nightWeather
// // tagName=> ("td") or ("td", "p")
// // content=> "白天" or "晚上"
// // className=> "description"
// // childtext=> eachDistrict["tmrDayDesc"] or eachDistrict["afterTmrDayDesc"]
// // This function's logic is the same as the one above.
// function createTdTage(parentNode, tagName, content, className, childtext) {

//     let tmrDayDesc = parentNode.appendChild(document.createElement(tagName[0]));
//     if (content !== null) {
//         tmrDayDesc.appendChild(document.createTextNode(content));
//     }
//     if (tagName.length > 1) {
//         let tmrDayTxt = tmrDayDesc.appendChild(document.createElement(tagName[1]));
//         tmrDayTxt.className = className;
//         tmrDayTxt.appendChild(document.createTextNode(childtext));
//     }

// }

// // 渲染台北市各地區
// function renderHsinchuWeather(wantedData, region) {
//     let HsinchuDateResult = getHsinchuDate();
//     let tmr = HsinchuDateResult["tmr"].split("-");
//     let afterTmr = HsinchuDateResult["afterTmr"].split("-");

//     let Hsinchu = document.querySelector("#Hsinchu");
//     console.log(Hsinchu)

//     let HsinchuSection = document.createElement("table");
//     HsinchuSection.setAttribute("class", "weather-report");

//     // tHead

//     let thead = HsinchuSection.appendChild(document.createElement("thead"));

//     let titleTop = thead.appendChild(document.createElement("tr"));
//     titleTop.setAttribute("class", "title-top");

//     // ============================================================
//     createThTage(titleTop, "th", "title-district", `地區: ${region}`, null, null)

//     createThTage(titleTop, "th", "title-time", "時間", null, null)
//     // ============================================================
//     createThTage(titleTop, "th", "title-date", null, null, "p", ("date-txt", "week-txt"), tmr, HsinchuDateResult["tmrWeek"])
//     createThTage(titleTop, "th", "title-date", null, null, "p", ("date-txt", "week-txt"), afterTmr, HsinchuDateResult["afterTmrWeek"])
//     HsinchuSection.appendChild(thead);

//     // tBody
//     let tbody = document.createElement("tbody");
//     wantedData.forEach((eachDistrict) => {
//         // 白天
//         let dayWeather = tbody.appendChild(document.createElement("tr"));
//         dayWeather.setAttribute("class", "day");

//         createThTage(dayWeather, "th", "Hsinchu-district", eachDistrict["district"], "2", null)

//         createTdTage(dayWeather, ["td"], "白天")

//         createTdTage(dayWeather, ["td", "p"], null, "description", eachDistrict["tmrDayDesc"])

//         createTdTage(dayWeather, ["td", "p"], null, "description", eachDistrict["afterTmrDayDesc"])

//         // 晚上
//         let nightWeather = tbody.appendChild(document.createElement("tr"));
//         nightWeather.setAttribute("class", "night");
//         createTdTage(nightWeather, ["td"], "晚上")

//         createTdTage(nightWeather, ["td", "p"], null, "description", eachDistrict["tmrNightDesc"])

//         createTdTage(nightWeather, ["td", "p"], null, "description", eachDistrict["afterTmrNightDesc"])

//         tbody.appendChild(dayWeather);
//         tbody.appendChild(nightWeather);
//     })

//     // HsinchuSection.appendChild(thead);
//     HsinchuSection.appendChild(tbody);
//     Hsinchu.appendChild(HsinchuSection);
// }
