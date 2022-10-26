import { App } from "./bm-app/App";
import { DefaultButton } from "./components/Buttons";
import "./index.css";
import "./styles/splashscreen.css";
import "./styles/background.css";
import { useState, useEffect } from "react";
import { backgroundImages } from "./images/backgrounds.js";
import { HintButton } from "./components/HintButton";

import jasper from "./books/goofyGroceries.json";
import fabby from "./books/lizardBasement.json";
import pim from "./books/bl_pim.json"; // Koekje

// Disable this boolean if you dont want the startup screen (please do this when testing)
const doStartScreen = true;

// Set app background for this session
const backgroundImageUrl =
  backgroundImages[Math.floor(Math.random() * backgroundImages.length)];

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

const hint =
  "Welcome to Basements & Lizards! This is a game casually developed by a few friends. The goal of the game is to provide players an accessible roleplay experience. A Basement Master (BM) can guide a number of players through an adventure using this app. For now a few custom stories can be selected in this menu to start your adventure. The app will display any options or information that is needed by the BM to guide the players. The BM can use his/her imagination and creativity around these options to make the world really livelike and interactive for the participants. Whenever you encounter the lizard button it can be clicked to get some extra information about the screen that is currently displayed, this can help the BM to guide his/her players. This is still an early version of Basements & Lizards, meant to show the concept. Expect many improvements and updates in the future. Thanks for playing and have fun!";

const bookList = [jasper, fabby, pim];

const ChooseBook = ({ setBook }) => (
  <div
    className="background"
    style={{
      backgroundImage: `url(${backgroundImages[0]})`,
    }}
  >
    <ul className="p-4 mx-auto max-w-2xl">
      <h1 className="text-6xl	italic font-bold text-emerald-700 text-center py-4">
        Basements & Lizards
      </h1>

      <div className="flex mx-auto">
        {hint && <HintButton hintText={hint} />}
      </div>

      {bookList.map((book) => (
        <li
          key={book.name}
          className="mt-4 flex flex-col items-center text-justify	bg-gray-400 rounded-lg p-4"
        >
          <h2 className="text-2xl font-semibold">{book.name}</h2>
          <p>{book.description}</p>
          <DefaultButton onClick={() => setBook(book)}>
            Play this story now
          </DefaultButton>
        </li>
      ))}
    </ul>
  </div>
);

export const MainApp = () => {
  // Use states to determine if page is still loading
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState(null);

  useEffect(() => {
    // Arbitrary 5 second loading time.. can be changes to dynamically listen to an API/server call or whatever
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  });

  if (loading && doStartScreen) return <LoadingMessage />;
  if (!book) return <ChooseBook setBook={setBook} />;
  return <App book={book} backgroundImageUrl={backgroundImageUrl} />;
};
