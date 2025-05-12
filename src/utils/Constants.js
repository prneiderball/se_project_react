const shortsImg = new URL("../assets/shorts.svg", import.meta.url).href;

export const weatherConditions = [
  {
    day: true,
    condition: "clear",
    url: new URL("../assets/daytime/clear.svg", import.meta.url),
    gradient: "linear-gradient(to top, #a1c4fd, #c2e9fb)", 
  },
  {
    day: true,
    condition: "clouds",
    url: new URL("../assets/daytime/clouds.svg", import.meta.url).href,
    gradient: "linear-gradient(to top, #d7d2cc, #304352)",
  },
  {
    day: true,
    condition: "rain",
    url: new URL("../assets/daytime/rain.svg", import.meta.url).href,
    gradient: "linear-gradient(to top, #4b6cb7, #182848)", 
  },
  {
    day: true,
    condition: "thunderstorm",
    url: new URL("../assets/daytime/thunderstorm.svg", import.meta.url).href,
    gradient: "linear-gradient(to top, #0f2027, #203a43, #2c5364)",
  },
  {
    day: false,
    condition: "clear",
    url: new URL("../assets/nighttime/clear.svg", import.meta.url),
    gradient: "linear-gradient(to top,rgb(44, 49, 80), #4ca1af)",
  },
  {
    day: false,
    condition: "clouds",
    url: new URL("../assets/nighttime/clouds.svg", import.meta.url).href,
    gradient: "linear-gradient(to top, #485563, #29323c)",
  },
  {
    day: false,
    condition: "rain",
    url: new URL("../assets/nighttime/rain.svg", import.meta.url).href,
    gradient: "linear-gradient(to top, #000c40, #607d8b)",
  },
  {
    day: false,
    condition: "thunderstorm",
    url: new URL("../assets/nighttime/thunderstorm.svg", import.meta.url).href,
    gradient: "linear-gradient(to top, #232526, #414345)",
  },
];

export const defaultClothingItems = [
  {
    _id: 0,
    name: "Cap",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
  },
  {
    _id: 1,
    name: "Hoodie",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
  },
  {
    _id: 3,
    name: "Sneakers",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
  },
  {
    _id: 4,
    name: "T-Shirt",
    weather: ["warm", "hot"],
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
  },
  {
    _id: 5,
    name: "Coat",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
  },

  {
    _id: 6,
    name: "shorts",
    weather: ["warm", "hot"],
    link: shortsImg,
  },
];

export const coordinates = {
  latitude: 30.40957,
  longitude: -89.04899,
};

export const APIkey = "edf001a891705a04a94d4d1022a16ab2";
