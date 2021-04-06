
function addDecimalTime() {
  let jsInitChecktimer = setInterval(checkForContent, 200);

  function checkForContent() {
    console.log("checking for content");
    const dashboard_table = document.getElementsByClassName("cl-main-horizontal-chart-container");
    if (dashboard_table !== undefined && dashboard_table.length > 0) {
      if (dashboard_table[0].getElementsByTagName("tr").length > 0) {
        console.log("Content found!", dashboard_table.length, dashboard_table, dashboard_table[0]);
        clearInterval(jsInitChecktimer);
  
        for (tr of dashboard_table[0].getElementsByTagName("tr")) {
          const time_cell = tr.getElementsByTagName("td")[1];
          let time_string = time_cell.firstChild.innerHTML;
  
          const new_decimal_time_cell = tr.insertCell(2);
          new_decimal_time_cell.innerHTML = '<td><span>' + timeStringToFloat(time_string).toFixed(2) + 'h' + '</span></td>';
        };
      }
    } else {
      console.log("Content not found. Trying again shortly...");
    }
  }

  function timeStringToFloat(time) {
    const hoursMinutes = time.split(/[.:]/);
    const hours = parseInt(hoursMinutes[0], 10);
    const minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
    return hours + minutes / 60;
  }
}

window.addEventListener("load", addDecimalTime, false);