import * as React from "react";
import styled from "styled-components";
import { applyTypeface, heading20 } from "../src/Materials/Typefaces";

import { Site } from "../src/Views/Components/Site";

export default () => {
  return (
    <Site>
      <Root>
        <Main>
          <Grid>
            <GridItem>
              <GridItemTitle>Grades</GridItemTitle>
              <GridItemContent>
                <img src="static/blockchaefer/Schwierigkeitsskala.jpg" />
              </GridItemContent>
            </GridItem>
            <GridItem>
              <GridItemTitle>Sektoren</GridItemTitle>
              <GridItemContent>
                <img src="static/blockchaefer/Sektoren.jpg" />
              </GridItemContent>
            </GridItem>
          </Grid>
        </Main>
      </Root>
    </Site>
  );
};

// ----------------------------------------------------------------------------

const Root = styled.div`
  flex: 1;
  padding: 20px 24px;
  display: flex;
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Grid = styled.div`
  flex: 1;
  display: grid;
  grid-template: 1fr 1fr;
  grid-gap: 12px;

  @media screen and (min-width: 600px) {
    grid-template: calc(50% - 12px) calc(50% - 12px) / 1fr 1fr;
    grid-gap: 24px;
  }
`;

const GridItem = styled.div`
  background: white;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.16s;
  display: flex;
  flex-direction: column;
  height: fit-content;
`;

const GridItemTitle = styled.div`
  ${applyTypeface(heading20)};
  margin: 24px 24px 0;
`;

const GridItemContent = styled.div`
  flex: 1;

  img {
    max-width: 100%;
    height: auto;
    object-fit: contain;
  }
`;
