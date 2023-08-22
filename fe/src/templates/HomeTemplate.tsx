import React from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";

interface Props {
  component: React.FC;
}

const HomeTemplate: React.FC<Props> = ({ component: Component }) => {
  return (
    <div className="home-template">
      <div className="d-flex flex-column h-100" style={{ minHeight: "100vh" }}>
        <Header />
        <div className="container-md flex-grow-1 py-4">
          <Component />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default HomeTemplate;
