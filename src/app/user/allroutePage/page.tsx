import React from "react";
import SecondBanner from "../secondbanner/page";
import PopularCategory from "../popularCategory/page";
import ShopeAndGetMore from "../shopeAndGetmore/page";
import CurrentDelevary from "../currentDelevary/page";
import BeautifulCollapsible from "../CommonQuestion/page";
import BannerPage from "../banner/page";
import SpecialOffer from "../specialOffer/page";

const AllRoutePage = () => {
  return (
    <div>
      <div>
        <BannerPage />
      </div>
      <div className="mt-4">
        <SecondBanner />
      </div>
      <div className="mt-4">
        <SpecialOffer />
      </div>
      <div className="mt-4">
        <PopularCategory />
      </div>
      <div className="mt-4">
        <ShopeAndGetMore />
      </div>
      <div className="mt-4">
        <CurrentDelevary />
      </div>
      <div className="mt-4">
        <BeautifulCollapsible />
      </div>
    </div>
  );
};

export default AllRoutePage;
