"use strict";

//task 1

// let list = document.querySelector('#goodsList');
// let input = document.querySelector('#addGoodsInput');
// let btn = document.querySelector('#btn-add');

// function createElement(elem, content) {
//     let element = document.createElement(elem);
//     element.textContent = content;
//     return element;
// }
// function addGoods() {
//     if (input.value !== '') {
//         list.append(createElement('li', input.value));
//         input.value = '';
//     }
// }

// btn.addEventListener('click', addGoods)

// task 3

// 3. Створіть інпут для пошуку погоди за містом. Виведіть на екран погоду на даний момент. Приклад запиту:
// https://api.openweathermap.org/data/2.5/forecast?appid={api_key}&lang=ua&units=metric&q=Маріуполь
// Для того щоб відправити запит, зареєструйтеся на платформі openweathermap.org та створіть собі ключ, або скористайтеся цим:
// $api_key = 35b4e8effcc623676e7574df04d98811;

const root = document.querySelector("body");
let forecastSearchInput = document.querySelector("#forecast-search");
let searchBtn = document.querySelector("#search-btn");
const weatherInfoContainer = document.createElement("div");

searchBtn.addEventListener("click", getForecast);

async function getForecast() {
  const url = "https://api.openweathermap.org/data/2.5/forecast";
  const apiKey = "35b4e8effcc623676e7574df04d98811";


  if (forecastSearchInput.value !== "") {
    let city = forecastSearchInput.value;

   
    // weatherInfoContainer.textContent = "";

    try {
      let request = await fetch(
        `${url}?appid=${apiKey}&lang=ua&units=metric&q=${city}`
      );

      if (request.ok) {
        const data = await request.json();
        const temp = Math.round(data.list[0]["main"]["temp"]);
        const weather = data.list[0]["weather"][0]["main"];

        weatherInfoContainer.textContent = `City: ${city}. Temperature: ${temp} C. Weather: ${weather}`;
       
      } else {
        throw new Error(request.status);
      }
    } catch (error) {
      if (error.message === "404") {
        weatherInfoContainer.textContent = "City had not found";
      }
    }
    forecastSearchInput.value = "";
    root.append(weatherInfoContainer);
  }

}
