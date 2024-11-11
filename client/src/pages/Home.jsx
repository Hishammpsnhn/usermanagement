import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { loading, error, user } = useSelector((state) => state.user);
console.log(loading,error,user)
  return <div>Home page is  hti{user?.email}</div>;
};

export default Home;
