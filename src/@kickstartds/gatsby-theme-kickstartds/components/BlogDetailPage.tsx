import React from 'react';
import { FunctionComponent } from 'react';

import { Divider } from "@kickstartds/base/lib/divider";
import { Section } from "@kickstartds/base/lib/section";
import { Contact } from "@kickstartds/content/lib/contact";

// TODO this (`Html`) should be in use, instead of `dangerouslySetInnerHTML` below
import { Html } from "@kickstartds/base/lib/html";
import { PostHead } from "@kickstartds/blog/lib/post-head";
import { PostAside } from "@kickstartds/blog/lib/post-aside";
import { PostShareBar } from "@kickstartds/blog/lib/post-share-bar";

import { Layout } from './Layout';
import { ScrollSpy } from './ScrollSpy';

import { useStaticQuery, graphql } from "gatsby";

export const BlogDetailPage: FunctionComponent<any> = ({
  postHead,
  postBody,
  postAside,
  postShareBar,
  postContact,
  postReadingTime,
  postWordCount,
  ...rest
}) => {
  const images = useStaticQuery(graphql`
    query {
      profileImage: file(relativePath: { eq: "img/profile.jpg" }) {
        publicURL
      }
    }
  `);

  return (
    <>
      <ScrollSpy readingTime={postReadingTime} />
      <Layout {...rest}>
        <Section
          className="l-section--blog"
          width="wide"
          mode="list"
          headline={{
            level: "p",
            align: "center",
            content: "",
            spaceAfter: "none",
          }}
          spaceBefore="small"
          spaceAfter="default">

          {postAside && <PostAside {...postAside} author={{ title: "Annemarie", image: { src: images.profileImage.publicURL }, copy: "Lektorin im Edition Lempertz Verlag" }} />}

          <div className="c-post__content">
            {postHead && <PostHead {...postHead} />}
            {/* <div>TODO shouldn't need to dangerouslySetInnerHTML here</div> */}
            {postBody && <div className="c-html c-rich-text c-post-text" dangerouslySetInnerHTML={{__html: postBody.html}} /> }
            {postShareBar && <PostShareBar {...postShareBar} />}
          </div>
        </Section>

        <Section width="wide" spaceBefore="none" spaceAfter="none" align="center">
          <Divider />
        </Section> 

        <Section
          mode="list"
          spaceBefore="small"
          width="narrow"
          background="default"
          headline={{
            level: "p",
            align: "center",
            content: "",
            spaceAfter: "none",
          }}>
          <Contact {...postContact} title="Annemarie" links={[{icon: 'email', label: 'info@mixtippblog.de', href: 'mailto:info@mixtippblog.de'}]} image={{ src: images.profileImage.publicURL }} subtitle="Lektorin im Edition Lempertz Verlag" copy="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr" />
        </Section>
      </Layout>
    </>
  );
};
