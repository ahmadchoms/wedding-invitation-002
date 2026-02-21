// ─────────────────────────────────────────────
//  WEDDING DATA — Core configuration for the invitation
// ─────────────────────────────────────────────

export const weddingData = {
  groom: {
    firstName: "Andi",
    lastName: "Prasetyo",
    fullName: "Andi Prasetyo",
    photo: "/assets/images/profiles/groom.jpg",
    father: "Budi Prasetyo",
    mother: "Siti Rahayu",
    instagram: "@andiprasetyo",
  },
  bride: {
    firstName: "Sari",
    lastName: "Kusuma",
    fullName: "Sari Kusuma",
    photo: "/assets/images/profiles/bride.jpg",
    father: "Hendra Kusuma",
    mother: "Dewi Anggraini",
    instagram: "@sarikusumaaa",
  },
  events: {
    akad: {
      label: "Akad Nikah",
      date: "Sabtu, 14 Juni 2025",
      time: "08.00 – 10.00 WIB",
      venue: "Masjid Al-Hikmah",
      address: "Jl. Sudirman No. 45, Menteng, Jakarta Pusat 10310",
      mapsUrl: "https://maps.google.com/?q=Masjid+Al-Hikmah+Jakarta",
      mapsLabel: "Buka di Google Maps",
    },
    resepsi: {
      label: "Resepsi Pernikahan",
      date: "Sabtu, 14 Juni 2025",
      time: "11.00 – 14.00 WIB",
      venue: "The Ritz-Carlton Jakarta, Pacific Place",
      address: "Jl. Jend. Sudirman Kav. 52–53, SCBD, Jakarta Selatan 12190",
      mapsUrl: "https://maps.google.com/?q=Ritz-Carlton+Jakarta+Pacific+Place",
      mapsLabel: "Buka di Google Maps",
    },
  },
  ceremonyDate: "2025-06-14T08:00:00+07:00",

  gallery: [
    { src: "/assets/images/gallery/photo-1.jpg", alt: "Pre-wedding portrait" },
    { src: "/assets/images/gallery/photo-2.jpg", alt: "Wedding details" },
    { src: "/assets/images/gallery/photo-3.jpg", alt: "Couple moment" },
    { src: "/assets/images/gallery/photo-4.jpg", alt: "Reception venue" },
    { src: "/assets/images/gallery/photo-5.jpg", alt: "Bridal portrait" },
    { src: "/assets/images/gallery/photo-6.jpg", alt: "Atmospheric shot" },
  ],

  gift: {
    accounts: [
      {
        bank: "BCA",
        accountName: "Andi Prasetyo",
        accountNumber: "1234567890",
      },
      {
        bank: "Mandiri",
        accountName: "Sari Kusuma",
        accountNumber: "0987654321",
      },
    ],
    address: {
      name: "Andi & Sari",
      street: "Jl. Melati No. 12, RT 03/RW 05",
      city: "Kebayoran Baru, Jakarta Selatan 12180",
    },
  },

  closing: {
    quote: `"Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu istri-istri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya."`,
    quoteSource: "QS. Ar-Rum: 21",
    message: "Merupakan suatu kehormatan dan kebahagiaan bagi kami sekeluarga apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai.",
    signature: "Andi & Sari",
  },

  meta: {
    title: "Pernikahan Andi & Sari — 14 Juni 2025",
    description: "Dengan penuh syukur dan kebahagiaan, kami mengundang Anda untuk merayakan pernikahan kami.",
    ogImage: "/assets/images/meta/og-image.jpg",
    siteUrl: "https://andi-sari-wedding.vercel.app",
  },
};

export default weddingData;
