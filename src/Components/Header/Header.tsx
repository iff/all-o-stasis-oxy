import * as MUI from "../../Components/MUI";
import * as Avers from "avers";
import Link from "next/link";
import * as React from "react";
import styled from "styled-components";
import { useEnv } from "../../env";
import { primary, primaryText } from "../../Materials/Colors";
import { Backdrop } from "./Backdrop";

const M = {
  color01: primary,
  IcMenuClose24: (props) => (
    <svg width={24} height={24} {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="square" strokeWidth={2} d="M20 20L4 4m0 16L20 4" />
    </svg>
  ),
  IcMenuDefault24: (props) => (
    <svg width={24} height={24} {...props}>
      <path fill="currentColor" fillRule="evenodd" d="M0 5h24v2H0zm0 6h24v2H0zm0 6h24v2H0z" />
    </svg>
  ),
};

const mq = {
  mobile: "@media screen and (max-width: 799px)",
  desktop: "@media screen and (min-width: 800px)",
};

export const Header = React.memo(() => {
  const [showMenu, setShowMenu] = React.useState(false);
  const closeMenu = React.useCallback(() => {
    setShowMenu(false);
  }, [setShowMenu]);

  const toggleMenu = React.useCallback(() => {
    setShowMenu((x) => !x);
  }, [setShowMenu]);

  const clickNavigationContainer = React.useCallback(
    (ev: React.SyntheticEvent) => {
      if (ev.target === ev.currentTarget) {
        closeMenu();
      }
    },
    [closeMenu]
  );

  React.useEffect(() => {
    if (showMenu) {
      document.documentElement.style.top = `0px`;
      document.documentElement.style.position = "relative";
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.left = "0";
      document.body.style.right = "0";
    } else {
      document.documentElement.style.top = "";
      document.documentElement.style.position = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.left = "";
      document.body.style.right = "";
    }
  }, [showMenu]);

  const { app } = useEnv();

  return (
    <Root>
      <Container>
        <Inner>
          <Top>
            <Logo href="https://minimum.ch">
              <img src={process.env.LOGO_URL!} />
            </Logo>

            <NavigationContainer $visible={showMenu} onClick={clickNavigationContainer}>
              <Navigation $visible={showMenu}>
                <PrimaryNavigation onClick={closeMenu}>
                  <Link href="/" passHref legacyBehavior>
                    <PrimaryNavigationLink
                      active={!!(typeof window !== "undefined" && window.location.pathname === "/")}
                    >
                      Boulders
                    </PrimaryNavigationLink>
                  </Link>
                  <Link href="/team" passHref legacyBehavior>
                    <PrimaryNavigationLink
                      active={!!(typeof window !== "undefined" && window.location.pathname === "/team")}
                    >
                      Team
                    </PrimaryNavigationLink>
                  </Link>
                  <Link href="/stats" passHref legacyBehavior>
                    <PrimaryNavigationLink
                      active={!!(typeof window !== "undefined" && window.location.pathname === "/stats")}
                    >
                      Stats
                    </PrimaryNavigationLink>
                  </Link>
                </PrimaryNavigation>

                <SecondaryNavigation>
                  {(() => {
                    if (app.data.session.objId) {
                      return (
                        <>
                          <Link href="/auftraege" passHref legacyBehavior>
                            <SecondaryNavigationLink>Auftraege</SecondaryNavigationLink>
                          </Link>

                          <Link href="/settings" passHref legacyBehavior>
                            <SecondaryNavigationLink>Settings</SecondaryNavigationLink>
                          </Link>

                          <SecondaryNavigationLink
                            onClick={async () => {
                              await Avers.signout(app.data.session);
                              window.location.reload();
                            }}
                          >
                            Logout
                          </SecondaryNavigationLink>
                        </>
                      );
                    } else {
                      return (
                        <Link href="/login" passHref legacyBehavior>
                          <SecondaryNavigationLink>Login</SecondaryNavigationLink>
                        </Link>
                      );
                    }
                  })()}
                </SecondaryNavigation>
              </Navigation>
            </NavigationContainer>

            <Buttons>
              <MenuButton onClick={toggleMenu}>{showMenu ? <M.IcMenuClose24 /> : <M.IcMenuDefault24 />}</MenuButton>
            </Buttons>
          </Top>

          <BackdropWrapper>
            <Backdrop open={showMenu} />
          </BackdropWrapper>
        </Inner>
      </Container>
    </Root>
  );
});

// ----------------------------------------------------------------------------

const Root = styled("header")`
  /* stacking context */
  position: relative;
  z-index: 100;
  background: ${primary};
`;

const Inner = styled("div")`
  position: relative;
`;

const Top = styled("div")`
  display: flex;
  align-items: center;
  background: ${primary};
  margin: 0 -24px;
  padding: 0 24px;
  height: 64px;
  ${mq.mobile} {
    position: relative;
    z-index: 20;
  }
  ${mq.desktop} {
    height: 80px;
  }
`;

const Logo = styled("a")`
  margin: auto 0;
  display: flex;
  align-items: center;
  text-decoration: none;
  height: 100%;
  margin-right: 32px;
  z-index: 100;

  img {
    display: block;
    height: 32px;
  }

  ${mq.desktop} {
    img {
    }
  }
`;

const Buttons = styled("div")`
  display: flex;
  align-items: center;
  margin-right: -24px;
  margin-left: auto;
  z-index: 100;

  ${mq.desktop} {
    display: none;
  }
`;

const MenuButton = styled("button")`
  color: ${primaryText};
  height: 64px;
  width: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  /* <button> reset */
  padding: 0;
  border: none;
  background: transparent;
  outline: none;
`;

const BackdropWrapper = styled("div")`
  ${mq.desktop} {
    display: none;
  }
`;

const NavigationContainer = styled("div")<{ $visible: boolean }>`
  ${mq.mobile} {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: ${({ $visible }) => ($visible ? "100vh" : 0)};
    opacity: ${({ $visible }) => ($visible ? 1 : 0)};
    transition: ${({ $visible }) => ($visible ? "opacity .3s" : "opacity .2s")};
    pointer-events: ${({ $visible }) => ($visible ? "all" : "none")};
    overflow-y: auto;
  }

  ${mq.desktop} {
    display: flex;
    width: 100%;
  }
`;

const Navigation = styled("nav")<{ $visible: boolean }>`
  ${mq.mobile} {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 84px 0 40px;
    background: ${M.color01};
    transform: ${({ $visible }) => ($visible ? "translateY(0)" : "translateY(-150px)")};
    transition: transform ${({ $visible }) => ($visible ? ".4s" : ".3s ease-in-out .1s")};
  }
  ${mq.desktop} {
    z-index: 20;
    display: flex;
    width: 100%;
  }
`;

function PrimaryNavigationLink({ active, ...props }: any) {
  return (
    <MUI.Button
      as="a"
      {...props}
      variant={active ? "contained" : undefined}
      color={active ? "secondary" : undefined}
      style={{
        padding: "8px 24px",
        margin: "8px 8px",
      }}
    />
  );
}

function SecondaryNavigationLink({ active, ...props }: any) {
  return (
    <MUI.Button
      as="a"
      {...props}
      variant={active ? "contained" : undefined}
      color={active ? "secondary" : undefined}
      style={{
        padding: "8px 24px",
        margin: "8px 8px",
      }}
    />
  );
}

const PrimaryNavigation = styled("div")`
  display: flex;
  flex-direction: column;

  ${mq.desktop} {
    flex-direction: row;
    align-items: stretch;
  }
`;

const SecondaryNavigation = styled("div")`
  display: flex;
  flex-direction: column;

  ${mq.mobile} {
    margin-top: 40px;
  }

  ${mq.desktop} {
    margin-left: auto;
    flex-direction: row;
    align-items: stretch;
  }
`;

const Container = styled("div")`
  padding: 0 24px;
`;
