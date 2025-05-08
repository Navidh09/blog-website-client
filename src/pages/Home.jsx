import React from "react";
import Banner from "../components/homePage/Banner";
import RecentPosts from "../components/homePage/RecentPosts";
import NewsLetter from "../components/homePage/NewsLetter";
import TrendingPosts from "../components/homePage/TrendingPosts";
import EditorsPick from "../components/homePage/EditorsPick";

const Home = () => {
  return (
    <div className="w-11/12 mx-auto">
      <Banner></Banner>
      <RecentPosts></RecentPosts>
      <NewsLetter></NewsLetter>
      <TrendingPosts></TrendingPosts>
      <EditorsPick></EditorsPick>
    </div>
  );
};

export default Home;
