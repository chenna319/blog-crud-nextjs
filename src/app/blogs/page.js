import React from "react";
import BlogOverView from "../components/blog-overview";

async function getFetchedData() {
  try {
    const responce = await fetch("http://localhost:3000/api/get-blog", {
      method: "GET",
      cache: "no-store",
    });
    const getResponseData = await responce.json();
    return getResponseData.data;
  } catch (error) {
    throw new Error(error);
  }
}

const Blogs = async () => {
  const getAllData = await getFetchedData();

  return <BlogOverView blogList={getAllData} />;
};

export default Blogs;
