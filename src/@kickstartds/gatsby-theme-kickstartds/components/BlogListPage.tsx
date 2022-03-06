import React from 'react';
import { FunctionComponent } from 'react';

import { useStaticQuery, graphql } from "gatsby";

import { Section } from "@kickstartds/base/lib/section";
import { PostTeaser } from "@kickstartds/blog/lib/post-teaser";

import { Layout } from './Layout';

export const BlogListPage: FunctionComponent<any> = ({
  postTeaser, ...rest
}) => {
  const images = useStaticQuery(graphql`
  query {
    profileImage: file(relativePath: { eq: "images/profile.jpg" }) {
      publicURL
    }
  }
`);

  return (
    <Layout {...rest}>
      <Section
        headline={{
          content: "Willkommen auf dem mixtipp Blog",
          level: "h1",
          subheadline:
            "Rezepte aus dem Thermomix für jeden Anlass",
          align: "center",
        }}
        width="wide"
        spaceAfter="none"
      />

      {postTeaser && postTeaser.length > 0 && (
        <Section
          spaceBefore="default"
          width="narrow"
          mode="list"
          gutter="large">
          {postTeaser.map((teaser) => <PostTeaser {...teaser} meta={{...teaser.meta, author: { name: "Annemarie", image: { src: images.profileImage.publicURL }}}} />)}
        </Section>
      )}
    </Layout>
  );
};
