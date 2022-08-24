import { App } from "./bm-app/App";
import maze from "./books/lizardBasement.json";
import "./index.css";
import { useState, useEffect } from "react";

// Disable this boolean if you dont want the startup screen (please do this when testing)
const doStartScreen = false;

// Note: this component is meant to control rendering of different apps. Since we only have one app now, it's still very basic.

// Determine loading message Div wrapper and make it a function
function LoadingMessage() {
  return (
    <div className="fade-in-out-5s background-gradient h-screen w-screen">
      <div className="h-screen flex bg-no-repeat bg-contain bg-center fade-in-out-5s dlimage">
        <div className="text-6xl font-serif italic text-green-200 w-screen text-center mt-32">
          Welcome to Dungeons and Lizards
        </div>
      </div>
    </div>
  );
}

export const MainApp = () => {
  // Use states to determine if page is still loading
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Arbitrary 5 second loading time.. can be changes to dynamically listen to an API/server call or whatever
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  });

  if (loading && doStartScreen) return <LoadingMessage />;
  return <App book={maze} />;
};
