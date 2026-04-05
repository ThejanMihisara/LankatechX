export const PRODUCT_CATEGORIES = [
  {
    label: "Laptops",
    value: "laptops",
    description: "Gaming laptops, business laptops, ultrabooks, and student laptops.",
  },
  {
    label: "Desktops",
    value: "desktops",
    description: "Desktop PCs, all-in-one computers, and workstation systems.",
  },
  {
    label: "Components",
    value: "components",
    description: "RAM, SSDs, processors, graphics cards, motherboards, and power supplies.",
  },
  {
    label: "Accessories",
    value: "accessories",
    description: "Laptop bags, cooling pads, adapters, hubs, and everyday computer accessories.",
  },
  {
    label: "Peripherals",
    value: "peripherals",
    description: "Monitors, keyboards, mice, speakers, printers, and external devices.",
  },
  {
    label: "Others",
    value: "others",
    description: "Other computer-shop products that do not fit the main categories.",
  },
];

export const CATEGORY_MAP = PRODUCT_CATEGORIES.reduce((acc, category) => {
  acc[category.value] = category;
  return acc;
}, {});

export const getCategoryBySlug = (slug) => {
  if (!slug) return null;
  return CATEGORY_MAP[String(slug).toLowerCase()] || null;
};

export const normalizeCategory = (value) => {
  if (!value) return "others";

  const normalized = String(value).trim().toLowerCase();

  if (CATEGORY_MAP[normalized]) return normalized;

  if (
    normalized.includes("laptop") ||
    normalized.includes("notebook") ||
    normalized.includes("macbook")
  ) {
    return "laptops";
  }

  if (
    normalized.includes("desktop") ||
    normalized.includes("workstation") ||
    normalized.includes("pc")
  ) {
    return "desktops";
  }

  if (
    normalized.includes("ram") ||
    normalized.includes("ssd") ||
    normalized.includes("hdd") ||
    normalized.includes("processor") ||
    normalized.includes("cpu") ||
    normalized.includes("gpu") ||
    normalized.includes("graphics") ||
    normalized.includes("motherboard") ||
    normalized.includes("power supply") ||
    normalized.includes("psu") ||
    normalized.includes("component")
  ) {
    return "components";
  }

  if (
    normalized.includes("monitor") ||
    normalized.includes("keyboard") ||
    normalized.includes("mouse") ||
    normalized.includes("printer") ||
    normalized.includes("speaker") ||
    normalized.includes("headset") ||
    normalized.includes("webcam")
  ) {
    return "peripherals";
  }

  if (
    normalized.includes("bag") ||
    normalized.includes("adapter") ||
    normalized.includes("hub") ||
    normalized.includes("stand") ||
    normalized.includes("cooling") ||
    normalized.includes("accessor")
  ) {
    return "accessories";
  }

  return "others";
};