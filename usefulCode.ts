import axios from "axios";
import FormData from "form-data";

var formData = new FormData();
formData.append(
  "operations",
  '{ "query": "mutation ($file: Upload!) { RemoveBG(file: $file) { imageFile } }", "variables": { "file": null } }'
);
formData.append("map", '{ "file": ["variables.file"] }');
formData.append("file", selectedFiles[0]);

console.log(formData);

await axios
  .post("http://127.0.0.1:8000/graphql", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  .then((res) => console.log(res.data.data.RemoveBG.imageFile))
  .catch((err) => console.log(err));

// Converting file to base65 and sending it

let reader = new FileReader();
reader.readAsDataURL(file);
reader.onload = (e) => {
  console.log(e.target?.result);
  file = e.target?.result;
  mutate({ variables: { file } });
};

// Delay code

function delay(ms: any) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
delay(2000);
