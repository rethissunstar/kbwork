import keyboardsImage from "./images/keyboards.jpg";
import keycapsImage from "./images/keycaps.jpg";
import switchesImage from "./images/switches.webp";
import deskmatsImage from "./images/deskmats.jpg";
// import accessoriesImage from "./images/accessories.jpg";

const categories = [
  {
    name: "Keyboards",
    url: "/keyboards",
    image: keyboardsImage,
    className: "keyboardsCard",
  },
  {
    name: "Keycaps",
    url: "/keycaps",
    image: keycapsImage,
    className: "keycapsCard",
  },
  {
    name: "Switches",
    url: "/switches",
    image: switchesImage,
  },
  {
    name: "Deskmats",
    url: "/deskmats",
    image: deskmatsImage,
  },
  // {
  //   name: "Accessories",
  //   url: "/accessories",
  //   image: accessoriesImage,
  // },
];

export default categories;
