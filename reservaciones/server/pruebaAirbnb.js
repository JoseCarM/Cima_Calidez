const http = require("http");
const fetch = require("node-fetch");
const util = require("util");
const fs = require("fs");
const streamPopo = util.promisify(require("stream").pipeline);
const ical = require("node-ical");

// const icsToJson = require("ics-to-json").default;

//create a server object:

async function totis() {
  const response = await fetch(
    "https://www.airbnb.mx/calendar/ical/11378940.ics?s=64135998a07eaff8ae24522b646bf161"
  );
  //const file = await response.buffer();
  if (!response.ok){
    throw new Error(`unexpected response ${response.statusText}`);
  }
  const file = await streamPopo(
    response.body,
    fs.createWriteStream("./placeholder.ics")
  );
  const events = ical.sync.parseFile("./placeholder.ics");
  let i = 0
  for(let uid in events){
    if(i !== 0){
      console.log(events[uid]);
    }
    i++;
  }
}

totis()

// http.createServer(async function(req, res) {
//     const response = await fetch(
//       "https://www.airbnb.mx/calendar/ical/11378940.ics?s=64135998a07eaff8ae24522b646bf161"
//     );
//     //const file = await response.buffer();
//     if (!response.ok){
//       throw new Error(`unexpected response ${response.statusText}`);
//     }
//     const file = await streamPopo(
//       response.body,
//       fs.createWriteStream("./placeholder.ics")
//     );
//     const events = ical.sync.parseFile("./placeholder.ics");
//     console.log(events);
//     res.write("Hello World!"); //write a response to the client
//     res.end(); //end the response
//   }).listen(8080); //the server object listens on port 8080