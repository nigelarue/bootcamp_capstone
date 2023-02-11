import React from "react";
import PageContent from "./PageContent";
import Landing from "./Landing";
import Login from "./LoginForm";
import Signup from "./SignupForm";
import ProviderProfile from "./ProviderProfile";
import UserProfile from "./UserProfiles";
import BookingForm from "./BookingForm";
import ProviderCatalog from "./ProviderCatalog";

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
      case "Provider Form":
        return <ProviderForm />;        
      case "Booking":
        return <BookingForm />;
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
