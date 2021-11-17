import { useState } from "react";
import { main } from '../js/main';
import maze from "../json/maze.json"

// als de story op maze gaat dan gebruiken we de maze data
const storyMap = {
  introduction: maze,
}

export function StoryHandler({ story }) {
  const data = storyMap[story]

  // Laad gekozen verhaal in
  const [location, setLocation] = useState(data["start-location"]); // state
  const [triggers, setTrigger] = useState(data["triggers"]); // state

  // Return module met verhaal
  return main(data, location, triggers, setLocation, setTrigger)

}
