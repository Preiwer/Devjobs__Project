const card_box = document.querySelector(".card_box");
const check = document.querySelector(".check");
const btn = document.querySelector("#btn");
const filterByTitle = document.querySelector("#fByTit");
const filterByLocation = document.querySelector("#fByLocation");
const switcher_dot = document.querySelector(".dot");
const switcher = document.querySelector(".thumb");
const more = document.querySelector(".cont");
const API = "https://db-json-one.vercel.app/db.json";

switcher.addEventListener("click", (e) => {
  switcher_dot.classList.toggle("swactive");
});

async function main() {
  const fetch_api = await fetch(API);
  const res = await fetch_api.json();
  let more_count = 6;
  let data = res
  let arr = []

  async function data_echo() {
    await data.slice(0, more_count).forEach((elem) => {
      console.log(elem);
      card_box.innerHTML += `
        <div class="card">
          <div class="header">
            <img src="${elem.logo}" alt="">
          </div>
          <div class="main_cont">
            <div class="main">
              <div class="header_bottom">
                <p class="ago">${elem.whenPlaced}</p>●<p class="tme">${elem.workTime}</p>
              </div>
              <div class="content" style="color:#19202D">
                <h1>${elem.title}</h1>
              </div>
              <div class="type">${elem.companyName}</div>
             </div>
            <div class="footer">
              <div class="location">${elem.companyCountry}</div>
            </div>
          </div>
        </div> `;
    });
  }

  data_echo()

  await btn.addEventListener("click", async (e) => {
    card_box.innerHTML = "";
    more_count = 6
    more.style.bottom = "0%";

    const somethingIncludes = (something, param) => something.includes(param);

    data = await res.filter((e) => {
      return (
        somethingIncludes(e.title, filterByTitle.value) &&
        somethingIncludes(e.companyCountry, filterByLocation.value) &&
        (check.checked ? somethingIncludes(e.workTime, "Full time") : true)
      );
    });
    data_echo();
    window.scrollBy(0, 100000);

  });

  await more.addEventListener("click", (e) => {
    e.preventDefault();
    card_box.innerHTML = "";
    more_count += 6;
    data_echo();
    window.scrollBy(0, 100000);
  });

  setInterval(() => {
    if (more_count >= data.length) {
      more.style.bottom = "-100%";
    }
  }, 100);
}

main();
