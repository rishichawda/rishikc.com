import React from "react";
import Contact from "../components/contact";
import Layout from "../components/layout";

import "../stylesheets/contact.scss";

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

export default ContactPage;
