import React from "react";
import { graphql } from "gatsby";
import { stripHtml } from "string-strip-html";

import { Layout } from '@kickstartds/gatsby-theme-kickstartds/src/components/Layout';

import { PostTeaser } from '@kickstartds/blog/lib/post-teaser';
import { Section } from '@kickstartds/base/lib/section';
import { Headline } from '@kickstartds/base/lib/headline';

function OverviewTemplate(props) {
  const pages = props.data.allKickstartDsPage.edges;

  return (
    <Layout>
      <Section spaceAfter="none" spaceBefore="small">
        <Headline level="h1" align="center" content="Overview of existing pages" subheadline="pages stem from Wordpress, Contentful and Netlify CMS" />
      </Section>

      <Section spaceAfter="none" width="narrow" spaceBefore="small" mode="list">
        {pages.map((page, index) => {
          return <PostTeaser
            date={page.node.date}
            link={{
              href: `/${page.node.slug}`,
              label: "read more..."
            }}
            title={stripHtml(page.node.title).result}
            body={`This is a *${page.node.internal.type}* page:  \n${page.node.internal.description}`}
            index={index}
            type="post-teaser"
          />
        })}
      </Section>
    </Layout>
  );
}
export default OverviewTemplate;
export const pageQuery = graphql`
  query {
    allKickstartDsPage {
      edges {
        node {
          id
          title
          slug
          internal {
            type
            description
          }
        }
      }
    }
  }`;
