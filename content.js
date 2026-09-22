/* ============================================================
   content.js  -  ALL EDITABLE CONTENT LIVES HERE
   Change text, links, logos or add new clients / reviews in this
   file only. You do not need to touch script.js or style.css.
   ============================================================ */


/* @@ C1  PROFILE & CONTACT LINKS  (used in Contact section + Footer) */
var PROFILE = {
  name: "Muhammad Talha Rehman",
  email: "contactmtalharehman@gmail.com",
  whatsapp: "https://wa.me/923471709613",
  linkedin: "https://www.linkedin.com/in/muhammad-talha-rehman-25286342b"
};


/* @@ C2  SKILLS  (shown as chips in the About section)
   To add a skill: add a new line like  "Skill name",  */
var SKILLS = [
  "AI Automation",
  "AI Tools & Workflows",
  "Content Strategy",
  "Digital Marketing",
  "Business Development",
  "Client Management",
  "Social Media Management",
  "Creative Direction",
  "Graphic Design",
  "Video Editing"
];


/* @@ C3  FEATURED CLIENT  (the big panel at the top of the Work section) */
var FEATURED = {
  name: "DigiSukoon",
  role: "General Manager",
  logo: "assets/digisukoon.png",
  fallback: "DS",
  url: "https://digisukoon.com/",
  linkText: "Visit digisukoon.com",
  text: "Working as General Manager, content strategist, business developer, graphic designer, and video editor while handling multiple clients and digital projects. DigiSukoon helps businesses launch and scale successful online stores, from store setup and inventory integration to marketing strategies that drive real results.",
  stats: [
    { value: "50+", label: "store launches by DigiSukoon" },
    { value: "99%", label: "client satisfaction reported by DigiSukoon" }
  ],
  tools: ["Graphic Design", "Video Editing", "AI Tools", "Digital Marketing"]
};


/* @@ C4  PROJECTS / CLIENTS  (rows in the Work section + logos in the moving strip)
   The ORDER below is the order shown on the website.
   TO ADD A NEW CLIENT: copy one whole block { ... }, paste it where you want it
   to appear (keep the comma between blocks), then change the text.
   To move a client up or down: cut its whole block and paste it somewhere else.
   showInStrip: false  ->  hides that item from the moving logo strip. */
var PROJECTS = [
  {
    name: "MUMKIN Coaching",
    logo: "assets/mumkin.png",
    fallback: "MC",
    text: "Creating and designing video content for a professional coaching brand and supporting its social media presence.",
    tools: ["Video Editing", "Graphic Design", "Content Strategy"]
  },
  {
    name: "TheraVive PhysioCare",
    logo: "assets/theravive.png",
    fallback: "TP",
    text: "Working on content strategy and video design for a physiotherapy clinic.",
    tools: ["Video Editing", "Graphic Design", "Content Strategy"]
  },
  {
    name: "AURAQ Publications",
    logo: "assets/auraq.png",
    fallback: "AQ",
    text: "Creating and designing video content for a professional publishing company and supporting its social media presence.",
    tools: ["Video Editing", "Graphic Design", "Content Strategy"]
  },
  {
    name: "Saeed Visa Consultant",
    logo: "assets/saeedvisa.png",
    fallback: "SV",
    text: "Currently working with the consultancy agency on digital content, creative work, and business-related activities.",
    tools: ["Graphic Design", "Video Editing", "Content Strategy", "AI Tools"]
  },
  {
    name: "Fauzia Cooks",
    logo: "assets/fauziacooks.png",
    fallback: "FC",
    text: "Creating and designing video content and supporting the brand's social media presence through content strategy and creative work.",
    tools: ["Video Editing", "Graphic Design", "Content Strategy"]
  },
  {
    name: "Saadi Perfumes",
    logo: "assets/saadiperfumes.png",
    fallback: "SP",
    text: "Creating and designing video content for a perfume brand and supporting its social media presence.",
    tools: ["Video Editing", "Graphic Design", "Content Strategy"]
  },
  {
    name: "Gul Badan",
    logo: "assets/gulbadan.png",
    fallback: "GB",
    text: "Creating and designing video content and supporting the brand's social media presence through content strategy and creative work.",
    tools: ["Video Editing", "Graphic Design", "Content Strategy"]
  },
  {
    name: "Personal Portfolio",
    logo: "assets/portfolio.png",
    fallback: "MTR",
    text: "My own portfolio website, designed and built with HTML, CSS, and JavaScript to showcase my work and experience.",
    tools: ["HTML", "CSS", "JavaScript", "Graphic Design"],
    showInStrip: false
  }
];


/* @@ C5  CLIENT REVIEWS
   The Reviews section (and its menu link) stays HIDDEN while this list is empty.
   TO ADD A REVIEW: remove the // in front of the template lines below,
   fill in the real details, and save. Add more blocks the same way,
   with a comma between them.
   photo is optional: use "" if you have no photo. */
var REVIEWS = [
  // {
  //   quote: "Write the client's real review here.",
  //   name: "Client Name",
  //   role: "Their role",
  //   company: "Their company",
  //   photo: "assets/reviews/client-name.jpg"
  // }
];