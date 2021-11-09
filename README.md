# Basements & Lizards

Epische coole app door bazen

## Concept

Our app consists of three main parts: the **rules**, the **book** (story), and the **state** of the story. The main difference between these three is where they change. The rules are set throughout the app and tell the players how the game is played and thus don't change between different books. The book contains an actual story with it's own characters, locations, items, etc. Multiple books can be written, like *The Tutorial* and *The Plane of Water*. The state tracks all the changes during a playthrough of a book to maintain what's happened in the book. So there's one rules, there can be multiple books, which each can have multiple states for each time you play.

### Rules

The rules tell the players how *Basements & Lizards* is played. It explains how the book interacts with the state and does this through actions. For example, the `move to [direction]` action requires a direction from the book and stores that in the `location` state of the playthrough.

Possible actions:
- `move to [direction]`
- `talk to [character]`
- `pick up [item]`
- `attack [character]`
- `wield [item]`
- etc.

### Books

The books contain all the information needed for the story and are much like traditional books, but the story is broken down in a more structered manner. For example, the locations are extracted and so are the characters and the items. The players themselves decide which character they play or interact with, which items they interact with or pick up, which direction they go. Besides that, the book explains the main storyline while moving between places.

The idea is to make story writing available for everyone, which is why we use a standard `json` structure to do this. Basement Masters (BMs) can thus write their own books to be played with friends. This should also allow them to alter existing stories to their liking. The structure of the book is well defined and should be validated for completeness.

Book structure:
- Title (string)
- Description (string)
- Introduction (string)
- Locations (object)
  - Name (string)
  - Story (string)
  - Description (string)
  - Directions (list)
    - Location (slug)
  - NPCs
    - Character (slug)
  - Items
    - Item (slug)
- Characters (object)
  - Name (string)
  - Description (string)
  - isPlayable (boolean)
- Items (object)
  - Name (string)
  - Description (string)
  - Type (enum: static, weapon, quest, map, etc.)

### State

Whenever the players perform a certain action on a book component, this will be stored in the state. For example, if the party `move to [direction]`, the location state will change to the location the party moves towards. Or when a player picks up an item, this should be represented in his inventory state.

Playthrough state:
- location (slug)
- inventory (list of items for each player)
- character status (alive, dead, friendly, aggressive)

---

# Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
