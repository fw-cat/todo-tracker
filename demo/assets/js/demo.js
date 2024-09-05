"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var newTasksDiv = document.querySelector('.new-tracker');
  if (newTasksDiv) {
    newTasksDiv.onclick = function () {
      location.href = '/create.html'; // ここに遷移先のURLを設定
    };
  }
});