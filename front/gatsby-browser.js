import React from 'react';
import { isLoggedIn } from './src/utils/auth';
import LoginLayout from './src/components/Layout/Login';
import BaseLayout from './src/components/Layout/Base';
import { navigate } from 'gatsby';

// 共通CSS
import "./public/css/fonts.css";

export const wrapPageElement = ({ element, props }) => {
  if (props.pageContext.layout === 'login') {
    console.log("is public page")
    return <LoginLayout>{element}</LoginLayout>;
  }

  if (props.pageContext.layout === 'main') {
    console.log("is private page", isLoggedIn())
    if (!isLoggedIn()) {
      navigate('/user/login');
    }
    return <BaseLayout>{element}</BaseLayout>;
  }

  return element;
};
