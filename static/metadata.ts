const siteMetadata: Record<string, unknown> = {
  title: `Rishi's website`,
  siteUrl: `https://www.rishikc.com`,
  description: `Rishi Kumar Chawda's personal website / portfolio`,
  image: `/static/assets/handsome-guy.webp`,
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
  image: string;
  og: {
    type: string;
  };
  twitter: {
    card: string;
    creator: string;
  };
}
