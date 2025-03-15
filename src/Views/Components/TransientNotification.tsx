import * as Avers from "avers";
import * as React from "react";
import styled from "styled-components";

import * as C from "../../Materials/Colors";
import { useEnv } from "../../env";

export const TransientNotification = () => {
  const { app } = useEnv();

  const numNetworkRequests = Avers.networkRequests(app.data.aversH).length;
  if (numNetworkRequests > 0) {
    return <Root>Loading ({numNetworkRequests}) …</Root>;
  }

  const localChanges = Avers.localChanges(app.data.aversH);
  if (localChanges.length > 0) {
    const numLocalChanges = localChanges.reduce((a, x) => a + x.changes.length, 0);
    return <Root>{numLocalChanges} unsaved changes</Root>;
  }

  return <div />;
};

// ----------------------------------------------------------------------------

const Root = styled.div`
  position: fixed;
  bottom: 0.5rem;
  right: 0.5rem;
  background-color: ${C.darkGrey};
  color: ${C.white};
  border-radius: 3px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24);
  display: inline-block;
  line-height: 16px;
  padding: 12px;
  transition: opacity 0.2s;
  white-space: nowrap;
  z-index: 45;
`;
