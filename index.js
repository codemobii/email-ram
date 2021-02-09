var all = document.querySelectorAll("*");

// Create a regex to match emails
let matchEmail = /[-.\w]+@([\w-]+\.)+[\w-]{2,20}$/g;

// Create an array
const emails = [];

// Loop through all the html tag and check matchEmail (then add to email array where true)
all.forEach(function (tag) {
  if (tag.innerHTML.match(matchEmail)) {
    emails.push({ email: tag.innerHTML });
    console.log(emails);
  }
});

// Create a function to convert json to cvs then download

const button = document.querySelector(".downloader_btn");

button.addEventListener("click", () => {
  var json = emails;
  var csv = json
    .map(function (d) {
      return JSON.stringify(Object.values(d));
    })
    .join("\n")
    .replace(/(^\[)|(\]$)/gm, "");
  // download link
  var a = document.createElement("a");
  a.style = "display: none";
  // Data URI
  var bom = decodeURIComponent("%EF%BB%BF"); // "\uFEFF\n";
  var byteArray = [];
  csv = bom + csv;
  let csvA = new Uint16Array(
    csv.split("").map(function (k, v) {
      return k.charCodeAt(0);
    })
  );
  var blob = new Blob([csvA], { type: "text/csv;charset=UTF-16LE;" });
  var blobUrl = URL.createObjectURL(blob);
  a.href = blobUrl;
  a.download = "report.csv";
  document.body.appendChild(a);
  a.click();
});
