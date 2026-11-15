import { RewardItem } from "./types";

export const REWARD_ITEMS: RewardItem[] = [
  // MASCOTAS MÁGICAS
  {
    id: "pet-dog",
    name: "Chispas el Perrito",
    type: "pet",
    costStars: 0,
    emoji: "🐶",
    description: "Tu fiel compañero de cuatro patas que mueve la colita en cada aventura.",
  },
  {
    id: "pet-owl",
    name: "Pipita la Lechuza Sabia",
    type: "pet",
    costStars: 10,
    emoji: "🦉",
    description: "Una pequeña lechuza que susurra pistas y consejos en los senderos oscuros.",
  },
  {
    id: "pet-dragon",
    name: "Flama el Dragón de Rocío",
    type: "pet",
    costStars: 20,
    emoji: "🐲",
    description: "Un tierno dragoncito que no lanza fuego, sino burbujas de vapor perfumado.",
  },
  {
    id: "pet-unicorn",
    name: "Estrella el Unicornio",
    type: "pet",
    costStars: 35,
    emoji: "🦄",
    description: "Un unicornio mágico cuyo cuerno ilumina las noches de lectura.",
  },

  // ACCESORIOS DE HÉROE
  {
    id: "acc-crown",
    name: "Corona de Luciérnagas",
    type: "accessory",
    costStars: 8,
    emoji: "👑",
    description: "Tejida con ramitas de sauce y pequeñas luces brillantes del valle.",
  },
  {
    id: "acc-cape",
    name: "Capa de Explorador",
    type: "accessory",
    costStars: 15,
    emoji: "🧣",
    description: "Suave como una nube, abriga en las expediciones al planeta de los sueños.",
  },
  {
    id: "acc-compass",
    name: "Brújula de los Deseos",
    type: "accessory",
    costStars: 25,
    emoji: "🧭",
    description: "Su aguja dorada siempre apunta hacia las buenas acciones y la amistad.",
  },

  // AMBIENTES SONOROS RELAJANTES
  {
    id: "sound-rain",
    name: "Lluvia Suave en el Bosque",
    type: "sound",
    costStars: 5,
    emoji: "🌧️",
    description: "El sonido de gotas tibias cayendo sobre hojas verdes para dormir en paz.",
  },
  {
    id: "sound-box",
    name: "Caja de Música Estelar",
    type: "sound",
    costStars: 12,
    emoji: "🎵",
    description: "Una dulce melodía de cuna tocada con campanas de plata diminutas.",
  },
];
