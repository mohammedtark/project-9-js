document.getElementById("submitBtn").addEventListener("click", function () {
  var urlInput = document.getElementById("bookmarkURL").value;
  if (isValidURL(urlInput)) {
    alert("URL is valid. You can proceed with submission.");
  } else {
    showErrorBox();
  }
});

function isValidURL(url) {
  var urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-zA-Z]{2,6})([/\w.-]*)*\/?$/;
  return urlPattern.test(url);
}

function showErrorBox() {
  var errorBox = document.querySelector(".box-info");
  errorBox.classList.remove("d-none");
}

document.getElementById("closeBtn").addEventListener("click", function () {
  document.querySelector(".box-info").classList.add("d-none");
});
/////////////////////////////////////
var boomarkName = document.getElementById("boomarkName");
var bookmarkURL = document.getElementById("bookmarkURL");
var searchInput = document.getElementById("searchInput");
var textContainer;

if (localStorage.getItem("myBookmarks") != null) {
  textContainer = JSON.parse(localStorage.getItem("myBookmarks"));
  displayData();
} else {
  textContainer = [];
}

document.getElementById("submitBtn").addEventListener("click", function () {
  var bookmarkNameValue = boomarkName.value;
  var bookmarkURLValue = bookmarkURL.value;
  if (bookmarkNameValue && bookmarkURLValue) {
    var bookmark = {
      boomarkName: bookmarkNameValue,
      bookmarkURL: bookmarkURLValue,
    };
    textContainer.push(bookmark);
    localStorage.setItem("myBookmarks", JSON.stringify(textContainer));
    displayData();
    boomarkName.value = "";
    bookmarkURL.value = "";
  } else {
    alert("Please fill in both fields");
  }
});

function displayData() {
  var cartona = "";
  for (var i = 0; i < textContainer.length; i++) {
    var index = i + 1;
    cartona += `<tr>
        <td>${index}</td>
        <td>${textContainer[i].boomarkName}</td>
        <td><a href="${textContainer[i].bookmarkURL}" class="btn btn-warning btn-sm sada" target="_blank"><i class="fa-solid fa-eye pe-2"></i>Visit</a></td>
        <td><button onclick="deleteItem(${i})" class="btn btn-danger btn-sm"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
      </tr>`;
  }
  document.getElementById("tableContent").innerHTML = cartona;
}

function deleteItem(index) {
  textContainer.splice(index, 1);
  localStorage.setItem("myBookmarks", JSON.stringify(textContainer));
  displayData();
}

function search() {
  var term = searchInput.value.toLowerCase();
  var cartona = "";
  for (var i = 0; i < textContainer.length; i++) {
    if (textContainer[i].boomarkName.toLowerCase().includes(term)) {
      var index = i + 1;
      cartona += `<tr>
          <td>${index}</td>
          <td>${textContainer[i].boomarkName}</td>
          <td><a href="${textContainer[i].bookmarkURL}" class="btn btn-warning btn-sm sada" target="_blank"><i class="fa-solid fa-eye pe-2"></i>Visit</a></td>
          <td><button onclick="deleteItem(${i})" class="btn btn-danger btn-sm"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
        </tr>`;
    }
  }
  document.getElementById("tableContent").innerHTML = cartona;
}
