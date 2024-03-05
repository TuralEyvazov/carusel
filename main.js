$(document).ready(() => {
  const base = {
    URL: "http://localhost:3002",
  };

  const getData = async () => {
    const res = await fetch(`${base.URL}/data`);
    const data = await res.json();
    showData(data);
    return data;
  };

  const showData = (data) => {
    let container = document.querySelector(".container");
    container.innerHTML = "";
    data.forEach((element) => {
      container.innerHTML += `
        <div class="item hover ">
            <img src=${element.url} alt="">
            <span class="pop-up" id=${element.id}>
            <i class="fa-solid fa-magnifying-glass-plus"></i>
            </span>
        </div>
        `;
    });
    $(".pop-up").on("click", function () {
      let clickedItem = $(this)[0].id;
      carusel(clickedItem);
    });
  };

  const carusel = (dataID) => {
    let counter = +dataID;
    getData().then((data) => {
      const chekImg = data.find((item) => item.id == dataID);
      let carusels = $("#carusel img");
      $("#carusel").css("display", "flex");
      carusels[0].src = chekImg.url;
      $(".carusel-btn-left").on("click", () => {
        counter--;
        if (counter < 1) {
          counter = 4;
        }
        let getItem = data.find((item) => item.id == counter);
        carusels[0].src = getItem.url;
        console.log(getItem);
      });

      $(".carusel-btn-right").on("click", () => {
        counter++;
        if (counter > 4) {
          counter = 1;
        }
        carusels[0].src = "";
        let getItem = data.find((item) => item.id == counter);
        carusels[0].src = getItem.url;
        console.log(getItem);
      });
    });
  };

  getData();
});
