$(document).ready(() => {
  const base = {
    URL: "./db.json",
  };

  const cancel = $(".cancel");
  const carusel = $("#carusel");

  const getData = async () => {
    const res = await fetch(`${base.URL}`);
    const data = await res.json();
    showData(data);
    return data;
  };

  const showData = (data) => {
    let container = document.querySelector(".container");
    container.innerHTML = "";
    console.log(data);

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

    getData().then((data) => {
      const checkedImg = data.find((item) => item.id == dataID);
      caruselImg.src = checkedImg.url;
      prev.on("click", () => {
        counter--;
        if (counter < 1) {
          counter = +data.length;
        }
        let getItem = data.find((item) => item.id == counter);
        caruselImg.src = getItem.url;
      });

      next.on("click", () => {
        counter++;
        if (counter > +data.length) {
          counter = 1;
        }
        let getItem = data.find((item) => item.id == counter);
        caruselImg.src = getItem.url;
      });
    });
  };

  cancel.on("click", () => {
    carusel.css("display", "none");
  });

  getData();
});
