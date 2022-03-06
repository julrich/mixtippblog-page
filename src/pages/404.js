import React from "react";

import { Layout } from '@kickstartds/gatsby-theme-kickstartds/src/components/Layout';

import { Section } from '@kickstartds/base/lib/section';
import { TextMedia } from '@kickstartds/base/lib/text-media';
import { LinkButton } from '@kickstartds/base/lib/link-button';
import { Button } from '@kickstartds/base/lib/button';

function NotFoundTemplate() {
  return (
    <Layout>
      <Section
        headline={{
          level: "h1",
          align: "center",
          content: "That page doesn't exist 😯",
          subheadline: "404 - missing page",
          switchOrder: true,
        }}
        width="narrow"
        spaceAfter="none"
        pattern="1"
      >
        <TextMedia
          text="We are sorry, but the page your are looking for could not be found. Please return to our start page or start a conversation."
        />
      </Section>

      <Section width="narrow" spaceBefore="small">
        <LinkButton href="/" label="Start page" />
        <Button label="Contact us" className="zen-404" />
      </Section>
    </Layout>
  );
}
export default NotFoundTemplate;
