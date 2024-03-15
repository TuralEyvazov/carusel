import { base } from "./db.js";

$(document).ready(() => {
  const cancel = $(".cancel");
  const carusel = $("#carusel");

  const showData = () => {
    let container = document.querySelector(".container");
    container.innerHTML = "";

    base.forEach((element) => {
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
      let clickedItemid = +$(this)[0].id;
      createCarusel(clickedItemid);
    });
  };

  const createCarusel = (dataID) => {
    let counter = dataID;
    let caruselImg = $("#carusel img")[0];
    const prev = $(".carusel-btn-prev");
    const next = $(".carusel-btn-next");
    carusel.css("display", "flex");

    const checkedImg = base.find((item) => item.id == dataID);
    caruselImg.src = checkedImg.url;
    next.on("click", () => {
      counter++;
      if (counter > +base.length) {
        counter = 1;
      }
      let getItem = base.find((item) => item.id == counter);
      caruselImg.src = getItem.url;
    });
    prev.on("click", () => {
      counter--;
      if (counter < 1) {
        counter = +base.length;
      }
      let getItem = base.find((item) => item.id == counter);
      caruselImg.src = getItem.url;
    });
  };

  cancel.on("click", () => {
    carusel.css("display", "none");
  });

  showData();
});
