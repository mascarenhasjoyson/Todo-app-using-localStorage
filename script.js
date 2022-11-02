function getCrudData() {
  let arr = JSON.parse(localStorage.getItem("crud"));
  return arr;
}

function setCrudData(arr) {
  localStorage.setItem("crud", JSON.stringify(arr));
}

let id = "no";

selectData();

submit.addEventListener("click", (e) => {
  e.preventDefault();
  let title = document.getElementById("task-name").value;
  let details = document.getElementById("task-detail").value;
  if (title == "" || details == "") {
    document.getElementById("alert1").innerHTML =
      "Please enter valid information";
    const toast = new bootstrap.Toast(toastLiveExample);
    toast.show();
  } else {
    console.log(id);
    if (id == "no") {
      let arr = getCrudData();
      if (arr == null) {
        let data = [title, details];
        setCrudData(data);
      } else {
        arr.push(title, details);
        setCrudData(arr);
      }
      document.getElementById("alert1").innerHTML = "Record added";
      const toast = new bootstrap.Toast(toastLiveExample);
      toast.show();
    } else {
      let arr = getCrudData();
      arr[id] = title;
      arr[id + 1] = details;
      setCrudData(arr);
      document.getElementById("alert1").innerHTML = "Record updated";
      const toast = new bootstrap.Toast(toastLiveExample);
      toast.show();
      id = "no";
    }
    document.getElementById("task-name").value = "";
    document.getElementById("task-detail").value = "";
    selectData();
  }
});

function selectData() {
  let arr = getCrudData();
  if (arr != null) {
    let srno = 1;
    let tablebody = "";
    let k = 0;
    for (i = 0; i < arr.length / 2; i++) {
      tablebody =
        tablebody +
        `
                  <tr>
                  <td class="text-center">${srno}</td>
                  <td>${arr[k]}</td>
                  <td>${arr[k + 1]}</td>
                  <td class="text-center"><ion-icon style="cursor:pointer; text-align:center" name="create-outline" onclick="editData(${k})"></ion-icon></td>
                  <td class="text-center"><ion-icon name="trash-outline" style="cursor:pointer;" onclick="deleteData(${k})"></ion-icon></td>
                  </tr>
                  `;
      srno++;
      k = k + 2;
    }
    document.getElementById("jstask").innerHTML = tablebody;
  }
}

function editData(rid) {
  id = rid;
  let arr = getCrudData();
  document.getElementById("task-name").value = arr[rid];
  document.getElementById("task-detail").value = arr[rid + 1];
}

function deleteData(rid) {
  let arr = getCrudData();
  arr.splice(rid, 2);
  setCrudData(arr);
  selectData();
  document.getElementById("alert1").innerHTML = "Record deleted successfully";
  const toast = new bootstrap.Toast(toastLiveExample);
  toast.show();
}

function getCrudData() {
  let arr = JSON.parse(localStorage.getItem("crud"));
  return arr;
}

function setCrudData(arr) {
  localStorage.setItem("crud", JSON.stringify(arr));
}

function clearAll() {
  localStorage.clear();
  document.getElementById("jstask").innerHTML = "";
  document.getElementById("alert1").innerHTML =
    "All records deleted successfully";
}

const toastTrigger = document.getElementById("liveToastBtn");
const toastLiveExample = document.getElementById("liveToast");
if (toastTrigger) {
  toastTrigger.addEventListener("click", () => {
    const toast = new bootstrap.Toast(toastLiveExample);
    toast.show();
  });
}
