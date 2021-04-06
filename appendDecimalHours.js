
function addDecimalTime() {
  function timeStringToFloat(time) {
    var hoursMinutes = time.split(/[.:]/);
    var hours = parseInt(hoursMinutes[0], 10);
    var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
    return hours + minutes / 60;
  }

  const time_table = document.getElementsByClassName("cl-main-horizontal-chart-container")[0];
  if (time_table !== undefined) {
    // console.log(time_table);
  
    for (tr of time_table.getElementsByTagName("tr")) { 
      const time_cell = tr.getElementsByTagName("td")[1];
      let time_string = time_cell.firstChild.innerHTML;
      
      const new_decimal_time_cell = tr.insertCell(2);
      new_decimal_time_cell.innerHTML = '<td><span>' + timeStringToFloat(time_string).toFixed(2) + 'h' + '</span></td>';
    };
  }
  
  const weekly_time_table = document.getElementsByClassName("cl-table cl-table-weekly-report")[0];
  if (weekly_time_table !== undefined) {
    console.log(weekly_time_table);
    const weekly_times = document.querySelectorAll("[weekly-group]");
    for (tr of weekly_times) {
      console.log(tr);
      const cols = tr.getElementsByTagName("td");
      for (let i = 1; i < cols.length; i++) {
        const td = cols[i];
        
        let t_string = "";
        if (td.childElementCount > 0) {
          t_string = cols[i].firstChild.innerHTML;
        } else {
          t_string = cols[i].innerHTML;
        }
        if (! t_string.includes("—")) {
          t_string = t_string.trim().substring(0, 8);
          console.log(td, t_string, timeStringToFloat(t_string).toFixed(2));
          if (td.childElementCount > 0) {
            cols[i].firstChild.append(' ' + timeStringToFloat(t_string).toFixed(2) + 'h');
          } else {
            t_string = cols[i].append(' ' + timeStringToFloat(t_string).toFixed(2) + 'h');
          }
        }
      }
    }
}

}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: addDecimalTime
  });
});