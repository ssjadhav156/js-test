var axios = require("axios");
var fs = require("fs");
var base64 = require("base-64");

let token = "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";

let file = fs.readFileSync("jstest.txt").toString();
console.log(file);
var content = base64.encode(file);
console.log(content);

updateFile(token, content);

async function updateFile(token, content) {
  // const res = await axios.get("https://api.github.com/repos/ssjadhav156/js-test/contents/jstest.txt");

 let sha = ""
 await axios({
    method: "get",
    url: "https://api.github.com/repos/ssjadhav156/js-test/contents/jstest.txt",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }
  }).then(res => console.log(res.data))


  // await axios({
  //   method: "put",
  //   url: "https://api.github.com/repos/ssjadhav156/js-test/contents/jstest.txt",
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //     "Content-Type": "application/json",
  //   },

  //   data: JSON.stringify({
  //     message: "js test",
  //     content: `${content}`,
  //   }),
  // })
  //   .then(function (response) {
  //     console.log(JSON.stringify(response.data));
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
}
