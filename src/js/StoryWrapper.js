import { StoryHandler } from "./storyHandler"

// Een wrapper die checkt of er een story geselecteerd is. Zo niet, dan start hij het core programma niet
export function StoryWrapper(story) {
  if(story !== 'not-started') {
    return(StoryHandler(story))
  }
}