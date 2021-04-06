function addDecimalTime() {
  let jsInitChecktimer = setInterval(checkForContent, 200);

  function checkForContent() {
    console.log("checking for content");
    const weekly_time_table = document.getElementsByClassName("cl-table cl-table-weekly-report");
    if (weekly_time_table !== undefined && weekly_time_table.length > 0) {
      if (weekly_time_table[0].querySelectorAll("[weekly-group]").length > 0) {
        // console.log("Content found!", weekly_time_table.length, weekly_time_table, weekly_time_table[0]);
        clearInterval(jsInitChecktimer);

        const weekly_times = weekly_time_table[0].querySelectorAll("[weekly-group]")
        for (tr of weekly_times) {
          const cols = tr.getElementsByTagName("td");
          for (let i = 1; i < cols.length; i++) {
            const td = cols[i];

            let t_string = "";
            if (td.childElementCount > 0) {
              t_string = cols[i].firstChild.innerHTML;
            } else {
              t_string = cols[i].innerHTML;
            }
            if (!t_string.includes("—")) {
              t_string = t_string.trim().substring(0, 8);
              if (td.childElementCount > 0) {
                cols[i].firstChild.append(' ' + timeStringToFloat(t_string).toFixed(2) + 'h');
              } else {
                t_string = cols[i].append(' ' + timeStringToFloat(t_string).toFixed(2) + 'h');
              }
            }
          }
        }
      };
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