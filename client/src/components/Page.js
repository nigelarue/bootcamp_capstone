import React from "react";
import PageContent from "./PageContent";
import Landing from "./Landing";
import Login from "./LoginForm";
import Signup from "./SignupForm";
import ProviderProfile from "./ProviderProfile";
import UserProfile from "./UserProfiles";
import Booking from "./BookingForm";


function Page({ currentPage }) {

    const renderPage = () => {
      switch (currentPage.name) {
        case "loginForm":
          return <Login />;
        case "signupForm":
          return <Signup />;
        case "provider profile":
          return <ProviderProfile />;
        case "user profile":
          return <UserProfile />;
        case "booking form":
            return <Booking />;
        default:
          return <Landing />;
      }
    };
  
    return (
      <section>
        <PageContent>{renderPage()}</PageContent>
      </section>
    );
  }
  export default Page;
  