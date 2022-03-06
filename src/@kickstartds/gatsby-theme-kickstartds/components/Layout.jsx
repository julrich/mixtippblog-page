import React from "react";

import { Layout as OriginalLayout } from '@kickstartds/gatsby-theme-kickstartds/src/components/Layout';

import { SectionProvider } from "@kickstartds/design-system/dist/components/section/SectionComponent";
import { HeadlineProvider } from "@kickstartds/design-system/dist/components/headline/HeadlineComponent";
import { CountUpProvider } from "@kickstartds/design-system/dist/components/count-up/CountUpComponent";
import { IconSprite } from "@kickstartds/design-system/dist/components/icon-sprite/IconSpriteComponent";

import { LightBox } from "@kickstartds/base/lib/lightbox";
import {
  ButtonContext,
  ButtonContextDefault,
} from "@kickstartds/base/lib/button";
import {
  LinkButtonContext,
  LinkButtonContextDefault,
} from "@kickstartds/base/lib/link-button";
import {
  TeaserBoxContext,
  TeaserBoxContextDefault,
} from "@kickstartds/base/lib/teaser-box";

import "@kickstartds/design-system/dist/index.css";
import "@kickstartds/design-system/dist/index.js";

import "../../../styles/tokens.css"

const Button = (props) => {
  if (!props.href) {
    const { href, newTab, ...buttonProps } = props;
    return <ButtonContextDefault {...buttonProps} />;
  }
  return <LinkButtonContextDefault {...props} />;
};

const TeaserBox = (props) => {
  return <TeaserBoxContextDefault {...props} />;
};

const ButtonProvider = (props) => (
  <ButtonContext.Provider value={Button} {...props} />
);

const LinkButtonProvider = (props) => (
  <LinkButtonContext.Provider value={Button} {...props} />
);

const TeaserBoxProvider = (props) => (
  <TeaserBoxContext.Provider value={TeaserBox} {...props} />
);

export const Layout = ({ children, ...rest }) => {
  return (
    <OriginalLayout {...rest}>
      <IconSprite />
      <LinkButtonProvider>
        <ButtonProvider>
          <HeadlineProvider>
            <CountUpProvider>
              <SectionProvider>
                <TeaserBoxProvider>
                  {children}
                </TeaserBoxProvider>
              </SectionProvider>
            </CountUpProvider>
          </HeadlineProvider>
        </ButtonProvider>
      </LinkButtonProvider>
      <LightBox />
    </OriginalLayout>
  );
};
