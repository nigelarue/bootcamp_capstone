import React from "react";
import PageContent from "./PageContent";
import Landing from "./Landing";
import Login from "./LoginForm";
import Signup from "./SignupForm";
import ProviderProfile from "./ProviderProfile";
import UserProfile from "./UserProfiles";
import Booking from "./BookingForm";
import PoviderCatalog from "./ProviderCatalog";

function Page({ currentPage, setCurrentPage }) {
  const renderPage = () => {
    switch (currentPage.name) {
      case "Login":
        return <Login setCurrentPage={setCurrentPage} />;
      case "Signup":
        return <Signup />;
      case "Provider Profile":
        return <ProviderProfile />;
      case "User Profile":
        return <UserProfile />;
      case "Booking":
        return <Booking />;
      case "Provider Catalog":
        return <ProviderCatalog />;
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
