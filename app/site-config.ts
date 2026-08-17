/**
 * AQUATERRA.UZ site settings.
 * Replace the placeholder values below when the client sends final details.
 */
export const siteConfig = {
  brand: {
    name: "AQUATERRA.UZ",
    eyebrow: "Живой мир воды",
    description:
      "Аквариумные рыбки, растения, аквариумы и всё необходимое для красивого подводного мира.",
    /** Put the final logo in /public and enter its path, e.g. "/aquaterra-logo.png". */
    logoSrc: "/aquaterra-logo-clean.png",
    logoAlt: "Логотип AQUATERRA.UZ",
  },
  contacts: {
    phones: [
      { display: "+998 97 146 41 21", href: "+998971464121" },
      { display: "+998 97 414 41 21", href: "+998974144121" },
      { display: "+998 95 822 41 21", href: "+998958224121" },
    ],
    telegrams: [
      {
        name: "Abduazim",
        display: "@AquaTerrauz",
        url: "https://t.me/AquaTerrauz",
      },
      {
        name: "Aquaterraauz",
        display: "@Aquaterraauz",
        url: "https://t.me/Aquaterraauz",
      },
    ],
    channel: {
      display: "@AquaTerra_uz",
      url: "https://t.me/AquaTerra_uz",
    },
  },
  location: {
    address: "Sherozi 65, Ташкент",
    coordinates: "41.313962, 69.209542",
    mapLinks: [
      {
        name: "Apple Maps",
        shortName: "Apple",
        url: "https://maps.apple.com/?ll=41.313962,69.209542&q=AQUATERRA.UZ%20%E2%80%94%20Sherozi%2065",
      },
      {
        name: "Google Maps",
        shortName: "Google",
        url: "https://www.google.com/maps/search/?api=1&query=41.313962%2C69.209542",
      },
      {
        name: "Яндекс Карты",
        shortName: "Яндекс",
        url: "https://yandex.com/maps/?ll=69.209542%2C41.313962&z=17&pt=69.209542%2C41.313962%2Cpm2rdm",
      },
      {
        name: "2GIS",
        shortName: "2GIS",
        url: "https://2gis.uz/tashkent/geo/69.209542%2C41.313962?m=69.209542%2C41.313962%2F17",
      },
    ],
  },
  hours: [{ days: "Каждый день", time: "09:00 — 21:00" }],
} as const;
