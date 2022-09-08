import React from 'react';
import Link from 'next/link';
import { Input, Checkbox, Button } from '@vom/vom-ui';
// import IntlMessages from '@iso/components/utility/intlMessages';
import SignUpStyleWrapper from '../styled/SignUp.styles';


export default function SignUp() {
  return (
    <SignUpStyleWrapper className="isoSignUpPage">
      <div className="isoSignUpContentWrapper">
        <div className="isoSignUpContent">
          <div className="isoLogoWrapper">
            {/* <Link href="/dashboard">
              <IntlMessages id="page.signUpTitle" />
            </Link> */}
          </div>

          <div className="isoSignUpForm">
            <div className="isoInputWrapper isoLeftRightComponent">
              <Input size="large" placeholder="First name" />
              <Input size="large" placeholder="Last name" />
            </div>

            <div className="isoInputWrapper">
              <Input size="large" placeholder="Username" />
            </div>

            <div className="isoInputWrapper">
              <Input size="large" placeholder="Email" />
            </div>

            <div className="isoInputWrapper">
              <Input size="large" type="password" placeholder="Password" />
            </div>

            <div className="isoInputWrapper">
              <Input
                size="large"
                type="password"
                placeholder="Confirm Password"
              />
            </div>

            <div className="isoInputWrapper" style={{ marginBottom: '50px' }}>
              <Checkbox>
                {/* <IntlMessages id="page.signUpTermsConditions" /> */}
              </Checkbox>
            </div>

            <div className="isoInputWrapper">
              <Button type="primary">
                {/* <IntlMessages id="page.signUpButton" /> */}
              </Button>
            </div>
            <div className="isoInputWrapper isoOtherLogin">
              <Button
                type="primary"
                className="btnFacebook"
              >
                {/* <IntlMessages id="page.signUpFacebook" /> */}
              </Button>
              <Button
                type="primary"
                className="btnGooglePlus"
              >
                {/* <IntlMessages id="page.signUpGooglePlus" /> */}
              </Button>
              <Button
                type="primary"
                className="btnAuthZero"
              >
                {/* <IntlMessages id="page.signUpAuth0" /> */}
              </Button>
            </div>
            <div className="isoInputWrapper isoCenterComponent isoHelperWrapper">
              {/* <Link href="/signin">
                <IntlMessages id="page.signUpAlreadyAccount" />
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </SignUpStyleWrapper>
  );
}
