import { Saturn } from "./icons/saturn";
import { SpaceShip } from "./icons/spaceship";
import { Mercury } from "./icons/mercury";
import { Venus } from "./icons/venus";
import { Earth } from "./icons/earth";
import { Moon } from "./icons/moon";
import { Mars } from "./icons/mars";
import { Jupyter } from "./icons/jupyter";
import { Uranus } from "./icons/uranus";
import { Neptune } from "./icons/neptune";
import { Pluto } from "./icons/pluto";
import { Votok1 } from "./icons/votok1";

export const ItemData = [
  {
    distance: 57900000,
    diameter: 4878,
    name: "Mercury",
    component: Mercury,
    type: "planet",
    story: 4
  },
  {
    distance: 108200000,
    diameter: 12104,
    name: "Venus",
    component: Venus,
    type: "planet",
    story: 3
  },
  {
    distance: 149600000,
    diameter: 12756,
    name: "Earth",
    component: Earth,
    type: "planet",
    story: 1
  },
  {
    distance: 149216000,
    diameter: 3474,
    name: "Moon",
    component: Moon,
    type: "moon",
    story: 2
  },
  {
    distance: 227900000,
    diameter: 6787,
    name: "Mars",
    component: Mars,
    type: "planet",
    story: 5
  },
  {
    distance: 778300000,
    diameter: 142796,
    name: "Jupyter",
    component: Jupyter,
    type: "planet",
    story: 6
  },
  {
    distance: 1427000000,
    diameter: 120660,
    name: "Saturn",
    component: Saturn,
    type: "planet",
    story: 7
  },
  {
    distance: 2871000000,
    diameter: 51118,
    name: "Uranus",
    component: Uranus,
    type: "planet",
    story: 8
  },
  {
    distance: 4497100000,
    diameter: 48600,
    name: "Neptune",
    component: Neptune,
    type: "planet",
    story: 9
  },
  {
    distance: 5193000000,
    diameter: 2274,
    name: "Pluto",
    component: Pluto,
    type: "planet",
    story: 10
  },
  {
    distance: 149600000 - 327,
    diameter: 2274,
    name: "Vostok 1",
    component: Votok1,
    type: "spaceship",
    story: 11,
    tooltip: () => (
      <div className="tooltip-space">
        This is the tooltip for Yuri Gagarin info 
        <a target="_blank" rel="noreferrer" href="https://en.wikipedia.org/wiki/Vostok_1">
          wikipedia
        </a>
      </div>
    )
  }
];
