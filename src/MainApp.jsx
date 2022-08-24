import { App } from "./bm-app/App";
import { DefaultButton } from "./components/Buttons";
import "./index.css";
import { useState, useEffect } from "react";
import { backgroundImages } from "./images/backgrounds.js";

import pim from "./books/bl_pim.json";
import maze from "./books/maze.json";

// Disable this boolean if you dont want the startup screen (please do this when testing)
const doStartScreen = false;

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

const bookList = [
  {
    name: "Test Maze",
    book: maze,
  },
  {
    name: "Lost Friend",
    book: pim,
  },
];

const ChooseBook = ({ setBook }) => (
  <div>
    <ul className="p-4">
      {bookList.map((book, index) => (
        <li key={book.name} className={index === 0 ? "" : "mt-4"}>
          <DefaultButton onClick={() => setBook(book.book)}>
            Play {book.name}
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
  return <App book={book} backgroundImageUrl={backgroundImageUrl}/>;
};
