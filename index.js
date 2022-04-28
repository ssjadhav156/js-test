const axios = require("axios");
const fs = require("fs");
const base64 = require("base-64");
const crypto = require("crypto");
const utf8 = require("utf8");

// token is getting removed automatically in my github if not working mail me on
// jadhavsaurabh156@gmail.com
// and i will generate new code and send
let token = "TOKEN HERE";

let content = "hello world";

updateFile(token, content);

async function updateFile(token, content) {
  let sha = "";
  let txtdata = "";
  let newData = "";
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
      // var hash = crypto.createHash("sha1");

      // change to 'binary' if you want a binary hash.
      // hash.setEncoding("base64");

      let olddata = base64.decode(res.data.content);
      txtdata = utf8.decode(olddata); //  || JSON.stringify(create_body) || create_file2.body|| 'hello world');

      // the text that you want to hash
      // hash.write(txtdata + " " + content);

      // very important! You cannot read from the stream until you have called end()
      // hash.end();

      // and now you get the resulting hash
      // newData = hash.read();
      newData=base64.encode(txtdata + " " + content);
      console.log(newData);
    })
    .catch((err) => console.log(err.message + ": " +err.response.statusText));

  axios({
    method: "put",
    url: "https://api.github.com/repos/ssjadhav156/js-test/contents/jstest.txt",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },

    data: JSON.stringify({
      message: "Updating file",
      content: `${newData}`,
      sha: sha,
    }),
  })
    .then(function (response) {
      // console.log(response.data);
      console.log("File updated");
    })
    .catch(function (err) {
      console.log(err.message + ": " +err.response.statusText);
    });
}
