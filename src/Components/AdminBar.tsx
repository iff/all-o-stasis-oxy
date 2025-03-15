import * as React from "react";
import styled from "styled-components";
import Link from "next/link";

import { secondary, secondaryText } from "../Materials/Colors";
import { useTypeface, copy16 } from "../Materials/Typefaces";

const mq = {
  mobile: "@media screen and (max-width: 799px)",
  desktop: "@media screen and (min-width: 800px)",
};

export const AdminBar = () => (
  <Root>
    <Link href="/admin/accounts">
      <a>Accounts</a>
    </Link>
    <Link href="/admin/planned">
      <a>Planned</a>
    </Link>
    <Link href="/admin/boulders">
      <a>Boulders</a>
    </Link>
    <Link href="/admin/data">
      <a>Data</a>
    </Link>
  </Root>
);

const Root = styled.div`
  background: ${secondary};
  color: ${secondaryText + "DD"};

  ${useTypeface(copy16)};
  display: flex;
  align-items: center;

  ${mq.mobile} {
    padding: 10px 12px;
  }

  ${mq.desktop} {
    padding: 16px 24px;
  }

  a {
    display: block;
    padding: 0 16px;
    text-decoration: none;
    color: currentColor;

    &:hover {
      text-decoration: underline;
    }
  }
`;
