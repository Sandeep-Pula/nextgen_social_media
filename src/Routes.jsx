import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import UserLogin from './pages/user-login';
import AccountSettings from './pages/account-settings';
import UserRegistration from './pages/user-registration';
import UserProfile from './pages/user-profile';
import ContentUpload from './pages/content-upload';
import DirectMessaging from './pages/direct-messaging';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AccountSettings />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/account-settings" element={<AccountSettings />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/content-upload" element={<ContentUpload />} />
        <Route path="/direct-messaging" element={<DirectMessaging />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
