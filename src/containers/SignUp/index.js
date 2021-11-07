import React from "react";

import * as ROUTES from "constants/routes";
import { SIGN_UP } from "constants/i18n";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Navigation from "components/shared/Navigation";
import MoPage from "components/library/MoPage";
import MoButton from "components/library/MoButton";
import SocialSignIn from "components/shared/SocialSignIn";
import SignUpForm from "./SignUpForm";
import useGlobal from "store";

const SignUpPage = () => {
  const [{ authUser, firebase }] = useGlobal();

  return (
    <Container maxWidth="lg">
      <Navigation authUser={authUser} firebase={firebase} />
      <MoPage
        title={authUser ? SIGN_UP.PAGE_TITLE : SIGN_UP.PAGE_LOGGED_IN_TITLE}
        isLoading={false}
      >
        <Grid container spacing={3}>
          {authUser ? (
            <Grid item sm={12} md={12}>
              <MoButton
                isArrowIcon={true}
                color="primary"
                variant="text"
                size="large"
                text={SIGN_UP.VIEW_ALL_COURSES}
                href={ROUTES.COLLECTIONS.path}
              />
            </Grid>
          ) : (
            <>
              <Grid item sm={6} md={6} style={{ width: "100%" }}>
                <SocialSignIn />
              </Grid>
              <Grid item sm={6} md={6}>
                <SignUpForm />
              </Grid>
            </>
          )}
        </Grid>
      </MoPage>
    </Container>
  );
};

export default SignUpPage;
