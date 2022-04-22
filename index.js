var axios = require("axios");
var fs = require("fs");
var base64 = require("base-64");

let token = "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";

var content = base64.encode("updating txt in file");
console.log(content);

updateFile(token, content);

async function updateFile(token, content) {

  let sha = "";
  await axios({
    method: "get",
    url: "https://api.github.com/repos/ssjadhav156/js-test/contents/jstest.txt",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      // console.log(res.data);
      sha = res.data.sha;
    })
    .catch((err) => console.log(err));

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
      sha: sha
    }),
  })
    .then(function (response) {
      // console.log(response.data);
      console.log("File updated");
    })
    .catch(function (err) {
      console.log(err);
    });
}
