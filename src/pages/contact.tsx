import React from "react";
import Contact from "../components/contact";
import Layout from "../components/layout";

import "../stylesheets/contact.scss";
import SEO from "../components/seo";

type Props = {};

function ContactPage({}: Props) {
  return (
    <Layout>
      <main className="flex items-center justify-center contact-page-container">
        <Contact />
      </main>
    </Layout>
  );
}

export const Head = () => (
  <SEO
    title="Contact - rishikc.com"
    description="Get in touch for collaboration, queries and more. You can also connect with me through my social media profiles."
  />
);

export default ContactPage;
