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
}
