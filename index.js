var axios = require("axios");
var base64 = require("base-64");

let token = "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";

var content = base64.encode("Hello there!");
console.log(content);

updateFile(token, content);

function updateFile(token, content) {
  axios({
    method: "put",
    url: "https://api.github.com/repos/ssjadhav156/js-test/contents/jstest.txt",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },

    data: JSON.stringify({
      message: "js test",
      content: `${content}`,
    }),
  })
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}
