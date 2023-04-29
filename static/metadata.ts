const siteMetadata: Record<string, unknown> = {
  title: `Rishi's website`,
  siteUrl: `https://www.rishikc.com`,
  description: `I write code that runs on your browsers, phones, and desktops. As a Freelance Developer, I have worked on Web design and development; and cross-platform mobile applications. As a full-time Software Engineer, I've built websites, mobile applications, DevSecOps tools, and more. With a passion for creating beautiful interfaces influenced by user experience and behavior - photography, and philosophy are two things that keep me occupied in my spare time.`,
  image: `static/assets/handsome-guy.webp`,
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
