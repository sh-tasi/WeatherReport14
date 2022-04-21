get_miaoli_data();

function get_miaoli_data(){

    // 創建苗栗標題
    let miaoli_header = document.createElement("div");
    miaoli_header.className = "m_title";

    // 創建 Table
    let miaoli_country=document.createElement("table");      
    miaoli_country.className="m_table";


    // 取得明天、後天日期
    let today = new Date();
    let tomorrow = new Date();
    let after_tomorrow = new Date();
    tomorrow.setDate(today.getDate()+1);
    after_tomorrow.setDate(today.getDate()+2);


    // 取得明天、後天星期
    let day_list = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    let tomorrow_day = day_list[tomorrow.getDay()];
    let after_tomorrow_day = day_list[after_tomorrow.getDay()];

    // 取得 ISO 8601 日期格式
    tomorrow = tomorrow.toISOString().substring(0,10);
    after_tomorrow = after_tomorrow.toISOString().substring(0,10);


    // 表格標題
    miaoli_country.innerHTML = `
    <tr class="m_header">
        <th id="m_header_country">地區</th>
        <th id="m_header_time">時間</th>
        <th class="m_header_date">${tomorrow.substring(5,7)}/${tomorrow.substring(8,10)}<br/>${tomorrow_day}</th>
        <th class="m_header_date">${after_tomorrow.substring(5,7)}/${after_tomorrow.substring(8,10)}<br/>${after_tomorrow_day}</th>
    </tr>
    `

    // 抓取明後天天氣描述資料
    let miaoli_url = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-013?Authorization=CWB-29E9DAC9-A82A-4479-BABA-2C7184BFD5BA&elementName=WeatherDescription&startTime=${tomorrow}T06:00:00,${tomorrow}T18:00:00,${after_tomorrow}T06:00:00,${after_tomorrow}T18:00:00`
    fetch(miaoli_url)
    .then(function(response){
        return response.json();
    }).then(function(res){
        let data = res["records"]["locations"][0]["location"];

        for (let i = 0 ; i < data.length ; i++){
            let location_name = data[i]["locationName"];
            let weather_description = [];
            for (let j = 0 ; j < 4 ; j++){
                weather_description.push(data[i]["weatherElement"][0]["time"][j]["elementValue"][0]["value"]);
            }

        miaoli_country.innerHTML += `
        <tr>
                <td rowspan="2" class="m_country_name">${location_name}</td>
                <td>早上</td>
                <td class="m_description">${weather_description[0]}</td>
                <td class="m_description">${weather_description[2]}</td>
            </tr>
            <tr>
                <td>晚上</td>
                <td class="m_description">${weather_description[1]}</td>
                <td class="m_description">${weather_description[3]}</td>
            </tr>
        `
        }
    })


    document.getElementById("Miaoli").appendChild(miaoli_header);
    document.getElementById("Miaoli").appendChild(miaoli_country);
}


