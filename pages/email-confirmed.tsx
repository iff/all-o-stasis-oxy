import * as React from 'react'
import styled from 'styled-components'

import {useTypeface, h1, copy16} from '../src/Materials/Typefaces'

import {Site} from '../src/Views/Components/Site'

export default function emailConfirmedView() {
  return (
    <Site>
      <Root>
        <div style={{textAlign: 'center', maxWidth: 528}}>
          <H1>Email Address Confirmed</H1>
          <P>You have been correctly authenticated. You may now close this window!</P>
        </div>
      </Root>
    </Site>
  )
}

const Root = styled.div`
flex: 1;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

const H1 = styled.h1`
${useTypeface(h1)};
`

const P = styled.p`
${useTypeface(copy16)};
`
