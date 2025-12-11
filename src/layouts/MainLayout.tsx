import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NewsLetter from "../components/NewsLetter";

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow">
        {/* Outlet for nested routes */}
        <Outlet />
      </main>
      {/* Footer can be added here if needed */}
      <NewsLetter />
      <Footer />
    </div>
  );
}

export default MainLayout;
