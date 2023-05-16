const siteMetadata: Record<string, unknown> = {
  title: `Rishi Kumar Chawda | Portfolio and Blog`,
  siteUrl: `https://rishikc.com`,
  description: `I write code that runs on your browsers, phones, and desktops. Experienced in building websites, mobile applications, DevSecOps tools, and more. `,
  keywords: "software, engineer, freelance, web, mobile, applications",
  og: {
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    creator: "rishiikc"
  },
  schema: {
    author: {
      name: "Rishi Kumar Chawda",
      url: "https://www.linkedin.com/in/rkrishi/",
      sameAs: [
        "https://github.com/rishichawda",
        "https://www.instagram.com/rishiikc",
        "https://twitter.com/rishiikc",
        "https://dribbble.com/rishikc"
      ]
    }
  }
}

export default siteMetadata

export interface SiteMetadata {
  title: string;
  description: string;
  siteUrl: string;
  og: {
    type: string;
  };
  twitter: {
    card: string;
    creator: string;
  };
  schema: {
    author: Queries.Maybe<{
      name: string;
      url: string;
      sameAs: string[];
    }>
  }
}
