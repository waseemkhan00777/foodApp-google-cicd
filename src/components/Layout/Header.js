import React from "react";
import classes from "./Header.module.css";
import mealsImage from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";
import ls from "localstorage-slim";
import VideoRecorder from "react-video-recorder";
// enable global encryption
ls.config.encrypt = true;

function Header(props) {
  const handleClick = e => {
    // save data in localStorage
    ls.set("hey", "Hello World");
    ls.set("userAccessObject", {
      name: "test1",
      age: 21
    });
    // data saved gets obfuscated automatically
    console.log(localStorage.getItem("hey")); // °··ºk¢º½·¯
    console.log(localStorage.getItem("userAccessObject")); // °··ºk¢º½·¯

    // calling get will deobfuscate data automatically
    const value = ls.get("hey"); // Hello world
    console.log("value: ", value);

    const userObj = ls.get("userAccessObject"); // Hello world
    console.log("userObj: ", userObj);
  };
  return (
    <>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        {/* <HeaderCartButton /> */}
        <button
          style={{ width: "150px", height: "50px" }}
          title="Store data"
          onClick={handleClick}
        >
          Store data
        </button>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A tabe full of delicious food" />
      </div>
      <VideoRecorder
        onRecordingComplete={videoBlob => {
          // Do something with the video...
          console.log("videoBlob", videoBlob);
        }}
      />
    </>
  );
}

export default Header;
