//=======================================================
//
// CLASS -> BOT
//
export class Bot {
  private name: string;
  constructor(n: string) {
    this.name = n;
  }
  sayHello() {
    const appDiv: HTMLElement = document.getElementById('messages');
    appDiv.innerHTML = `<p>${this.name}: Hello</p>`;
  }
  say(msg:string) {
    const appDiv: HTMLElement = document.getElementById('messages');
    appDiv.innerHTML = appDiv.innerHTML + `<p>${this.name}: ${msg}</p>`;
  }
}
//
// CLASS -> BOT
//
//=======================================================


//=======================================================
//
// FUNCTION -> UUID
//
var UUID_COUNTER = 0
export function UUID() {
  UUID_COUNTER++;
  let days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  let date = new Date();
  return (
    
    date.getFullYear() +
    "_" +
    ("0" + (date.getMonth()+1)).slice(-2) + //BUG? Months start at 0
    "_" +
    ("0" + date.getDate()).slice(-2) +
    "_" +
    ("0" + date.getHours()).slice(-2) +
    ":" +
    ("0" + date.getMinutes()).slice(-2) +
    ":" +
    ("0" + date.getSeconds()).slice(-2) +
    "," +
    ("000" + date.getMilliseconds()).slice(-3) +
    "_" +
    ("000000" + UUID_COUNTER).slice(-6)
  );
}
//
// FUNCTION -> UUID
//
//=======================================================

