import React, { useState, useEffect } from 'react'
import { Menu } from './js/Menu';
import { StoryHandler } from "./js/storyHandler"
import './css/splash-screen.css';

function LoadingMessage() {
  return (
    <div>
      <div className="splash-screen fade-in-out-5s">
        <div className="splash-text">
          Welcome to Dungeons and Lizards
        </div>
        <div className="dlimage"></div>
      </div>
    </div>
  );
}

const App = () => {
  const [story, setStory] = useState(null)

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  });

  if (loading) return <LoadingMessage />
  if (!story) return <Menu setStory={setStory} />
  return <StoryHandler story={story} />
}

export default App;

