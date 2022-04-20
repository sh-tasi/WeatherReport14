getTaipeiData()

// 取得明天、後天的日期與指定時間
function getTaipeiDate(){
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let tmrDay = today.getDate()+1;

    let dateArr = [year, month+1, tmrDay, tmrDay+1]
    // 處理月份跟日期為單數時，在前面補零
    dateArr.forEach((num)=>{
        let index = dateArr.indexOf(num);
        if(String(num).length < 2){
            num = "0" + num;
        }else{
            num = String(num)
        }
        dateArr.splice(index, 1, num)
    })

    // 明天、後天日期
    tmr = dateArr[0] + "-" + dateArr[1] + "-" + dateArr[2];
    afterTmr = dateArr[0] + "-" + dateArr[1] + "-" + dateArr[3];
    // 取得星期幾
    let weekArr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    let tmrWeek = weekArr[new Date(year, month, tmrDay).getDay()];
    let afterTmrWeek = weekArr[new Date(year, month, tmrDay+1).getDay()];
    let dateObj = {
        "tmr": tmr, 
        "afterTmr": afterTmr, 
        "tmrWeek": tmrWeek, 
        "afterTmrWeek": afterTmrWeek
    }
    return dateObj
}

// 取得 台北市未來一周天氣預報 資料
function getTaipeiData(){
    let dateResult = getTaipeiDate();
    const url = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-061?Authorization=CWB-128F473D-B2BF-4B83-A58E-9D6B67F3212E&elementName=WeatherDescription&startTime=${dateResult.tmr}T06%3A00%3A00%2C${dateResult.tmr}T18%3A00%3A00%2C${dateResult.afterTmr}T06%3A00%3A00%2C${dateResult.afterTmr}T18%3A00%3A00`;
    fetch(url)
    .then(response => response.json())
    .then(data => sortData(data))
    .catch(error => console.error(error))
}

// 整理要放進 table 的資料
function sortData(data){
    let datas = data.records.locations[0].location;
    let wantedData = [];
    datas.forEach((taipeiDistrict) => {
        let tempObj = {}
        tempObj.district = taipeiDistrict.locationName;
        tempObj.tmrDayDesc = taipeiDistrict.weatherElement[0].time[0].elementValue[0].value;
        tempObj.tmrNightDesc = taipeiDistrict.weatherElement[0].time[1].elementValue[0].value;
        tempObj.afterTmrDayDesc = taipeiDistrict.weatherElement[0].time[2].elementValue[0].value;
        tempObj.afterTmrNightDesc = taipeiDistrict.weatherElement[0].time[3].elementValue[0].value;
        wantedData.push(tempObj)
    })
    renderTaipeiWeather(wantedData) 
}

// 渲染台北市各地區
function renderTaipeiWeather(wantedData){
    let dateResult = getTaipeiDate();
    let tmr = dateResult["tmr"].split("-");
    let afterTmr = dateResult["afterTmr"].split("-");

    let taipei = document.querySelector("#Taipei");

    let taipeiSection = document.createElement("table");
    taipeiSection.setAttribute("class", "weather-report");

    // tHead
    let thead = taipeiSection.appendChild(document.createElement("thead"));

    let titleTop = thead.appendChild(document.createElement("tr"));
    titleTop.setAttribute("class", "title-top");

    let titleDistrict = titleTop.appendChild(document.createElement("th"));
    titleDistrict.setAttribute("class", "title-district");
    titleDistrict.appendChild(document.createTextNode("地區"));

    let titleTime = titleTop.appendChild(document.createElement("th"));
    titleTime.setAttribute("class", "title-time");
    titleTime.appendChild(document.createTextNode("時間"));

    let titleTmrDate = titleTop.appendChild(document.createElement("th"));
    titleTmrDate.setAttribute("class", "title-date");
    let dateTmrTxt = titleTmrDate.appendChild(document.createElement("p"));
    dateTmrTxt.setAttribute("class", "date-txt");
    dateTmrTxt.appendChild(document.createTextNode(`${tmr[1]} / ${tmr[2]}`));
    let weekTmrTxt = titleTmrDate.appendChild(document.createElement("p"));
    weekTmrTxt.setAttribute("class", "week-txt");
    weekTmrTxt.appendChild(document.createTextNode(dateResult["tmrWeek"]));

    let titleAfterTmrDate = titleTop.appendChild(document.createElement("th"));
    titleAfterTmrDate.setAttribute("class", "title-date");
    let dateAfterTmrTxt = titleAfterTmrDate.appendChild(document.createElement("p"));
    dateAfterTmrTxt.setAttribute("class", "date-txt");
    dateAfterTmrTxt.appendChild(document.createTextNode(`${afterTmr[1]} / ${afterTmr[2]}`));
    let weekAfterTmrTxt = titleAfterTmrDate.appendChild(document.createElement("p"));
    weekAfterTmrTxt.setAttribute("class", "week-txt");
    weekAfterTmrTxt.appendChild(document.createTextNode(dateResult["afterTmrWeek"]));

    // tBody
    let tbody = document.createElement("tbody");
    wantedData.forEach((eachDistrict) => {
        // 白天
        let dayWeather = tbody.appendChild(document.createElement("tr"));
        dayWeather.setAttribute("class", "day");

        let district = dayWeather.appendChild(document.createElement("th"));
        district.setAttribute("rowspan", "2");
        district.setAttribute("class", "taipei-district");
        district.appendChild(document.createTextNode(eachDistrict["district"]));

        let dayLabel = dayWeather.appendChild(document.createElement("td"));
        dayLabel.appendChild(document.createTextNode("白天"));

        let tmrDayDesc = dayWeather.appendChild(document.createElement("td"));
        let tmrDayTxt = tmrDayDesc.appendChild(document.createElement("p"));
        tmrDayTxt.appendChild(document.createTextNode(eachDistrict["tmrDayDesc"]));
        tmrDayTxt.setAttribute("class", "description");

        let afterTmrDayDesc = dayWeather.appendChild(document.createElement("td"));
        let afterTmrDayTxt = afterTmrDayDesc.appendChild(document.createElement("p"));
        afterTmrDayTxt.appendChild(document.createTextNode(eachDistrict["afterTmrDayDesc"]));
        afterTmrDayTxt.setAttribute("class", "description");

        // 晚上
        let nightWeather = tbody.appendChild(document.createElement("tr"));
        nightWeather.setAttribute("class", "night");

        let nightLabel = nightWeather.appendChild(document.createElement("td"));
        nightLabel.appendChild(document.createTextNode("晚上"));

        let tmrNightDesc = nightWeather.appendChild(document.createElement("td"));
        let tmrNightTxt = tmrNightDesc.appendChild(document.createElement("p"));
        tmrNightTxt.appendChild(document.createTextNode(eachDistrict["tmrNightDesc"]));
        tmrNightTxt.setAttribute("class", "description");

        let afterTmrNightDesc = nightWeather.appendChild(document.createElement("td"));
        let afterTmrNightTxt = afterTmrNightDesc.appendChild(document.createElement("p"));
        afterTmrNightTxt.appendChild(document.createTextNode(eachDistrict["afterTmrNightDesc"]));
        afterTmrNightTxt.setAttribute("class", "description");

        tbody.appendChild(dayWeather);
        tbody.appendChild(nightWeather);
    })

    taipeiSection.appendChild(thead);
    taipeiSection.appendChild(tbody);
    taipei.appendChild(taipeiSection);
}
