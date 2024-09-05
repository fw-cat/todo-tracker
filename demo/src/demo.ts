document.addEventListener("DOMContentLoaded", () => {
  const newTasksDiv = document.querySelector('.new-tracker') as HTMLDivElement;

  if (newTasksDiv) {
      newTasksDiv.onclick = () => {
          location.href = '/create.html'; // ここに遷移先のURLを設定
      };
  }
});
