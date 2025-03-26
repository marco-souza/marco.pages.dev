export const time = {
  MILISECONDS: 1,
  SECOND: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  to: {
    seconds: (n: number) => n / time.SECOND,
    minutes: (n: number) => n / time.MINUTE,
    hours: (n: number) => n / time.HOUR,
    days: (n: number) => n / time.DAY,
  },
} as const;

function contactEmail(email = "marco@tremtec.com") {
  const mailUrl = new URL(`mailto:${email}`);

  mailUrl.searchParams.set("subject", "Hey, Marco! Let's grab a coffee ☕️");
  mailUrl.searchParams.set(
    "body",
    "Hey, Marco! I'm reaching out to you because...",
  );

  return mailUrl.toString().replace(/\+/g, "%20");
}

export const configs = {
  repo: "https://github.com/marco-souza/marco.pages.dev",
  username: "marco-souza",
  contact_me: contactEmail(),

  site: {
    title: "Welcome to Marco's lab!",
    description: "A place where I share my thoughts and projects.",
    pageURL: "https://marco-pages-dev.pages.dev",
    images: {
      icon: "/favicon.ico",
      og: "/images/marco.og.png",
      logo: "/images/marco.logo.png",
    },
  },

  links: {
    stackoverflow: "https://stackoverflow.com/users/7988674/marco-antônio/",
    linkedin: "https://www.linkedin.com/in/masouzajunior",
    github: "https://github.com/marco-souza",
    podcodar: "https://podcodar.com/",
    mongodb: "https://mongodb.com/",
    paradigm: "https://paradigm.co/",
    tremtec: "https://tremtec.com/",
  },

  github: {
    resume:
      "https://raw.githubusercontent.com/marco-souza/resume/main/RESUME.md",
  },

  navigation: {
    home: "/",
    about: "/about",
    login: "/login",
    logout: "/api/auth/logout",
  },
};
