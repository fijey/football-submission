const noResult = () => {
    let html = "";
    let noResult = document.getElementById("nothing-result");
    if (data.count == 0) {
        html += `
      <img src="../images/no_result.gif" class="responsive-img">
      `;
        $('.progress').hide();
    }
    noResult.innerHTML = html;
}

export default noResult;