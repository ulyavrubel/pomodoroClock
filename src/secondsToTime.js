export function secondsToTime(seconds) {
  if (seconds === 3600) {
    return {
      minutes: 60,
      seconds: "00"
    };
  }
  let divisor_for_minutes = seconds % (60 * 60);
  let mm = Math.floor(divisor_for_minutes / 60);

  let divisor_for_seconds = divisor_for_minutes % 60;
  let ss = Math.ceil(divisor_for_seconds);
  if (mm < 10) {
    mm = "0" + mm;
  }
  if (ss < 10) {
    ss = "0" + ss;
  }
  let time = {
    minutes: mm,
    seconds: ss
  };
  return time;
}
