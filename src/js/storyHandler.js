import { useState } from "react";
import { setStoryFromJson } from "./functions/setStory";
import { main } from '../js/main';

export function StoryHandler(story) {

  // Import data op basis van story
  var data = '';
  data = setStoryFromJson(story)

  // Laad gekozen verhaal in
  var [location, setLocation] = useState(data["start-location"]); // state
  var [triggers, setTrigger] = useState(data["triggers"]); // state

  if (location === "not-started" || triggers === "not-started") {
    return
  }

  // Return module met verhaal
  return main(data, location, triggers, setLocation, setTrigger)

}
