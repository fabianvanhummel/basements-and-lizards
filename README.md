# Basements & Lizards

Epische coole app door bazen

## Concept

Our app consists of three main parts: the **rules**, the **book** (story), and the **state** of the story. The main difference between these three is where they change. The rules are set throughout the app and tell the players how the game is played and thus don't change between different books. The book contains an actual story with it's own characters, locations, items, etc. Multiple books can be written, like _The Tutorial_ and _The Plane of Water_. The state tracks all the changes during a playthrough of a book to maintain what's happened in the book. So there's one rules, there can be multiple books, which each can have multiple states for each time you play.

### Rules

The rules tell the players how _Basements & Lizards_ is played. It explains how the book interacts with the state and does this through actions. For example, the `move to [direction]` action changes the `location` state to the `direction` that's chosen by the BM. This requires a direction from the book.

Actions:

- `move to [direction]`: changes `location` state to `direction`

### Books

The books contain all the information needed for the story and are much like traditional books, but the story is broken down in a more structered manner. For example, the locations are extracted and so are the characters and the items. The players themselves decide which character they play or interact with, which items they interact with or pick up, which direction they go. Besides that, the book explains the main storyline while moving between places.

The idea is to make story writing available for everyone, which is why we use a standard `json` structure to do this. Basement Masters (BMs) can thus write their own books to be played with friends. This should also allow them to alter existing stories to their liking. The structure of the book is well defined and should be validated for completeness.

```
// name-of-book.json
{
  name: string,
  description: string,
  start-location: int, // initial state of the location
  locations: {
    <int>: {
      name: string,
      description: string,
      destinations: [
        int
      ]
    }
  }
}
```

### State

Whenever the players perform a certain action on a book component, this will be stored in the state. For example, if the party `move to [direction]`, the location state will change to the location the party moves towards. Or when a player picks up an item, this should be represented in his inventory state.

States:

- location: string

---

# Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Story Driven Development

We generally follow the Storybook Driven Development (SDD) pattern described in [this article](https://medium.com/nulogy/storybook-driven-development-a3c517276c07) for reasons described here as well. This restricts us from using `React.Context`, so we will not use patterns similar to that. For any additional design decisions, we will use [this article](https://medium.com/@theinterned/a-design-systems-reading-list-8f492413281)'s content to make sensible decisions.

## Github

Weekly meetings follow this agenda: [B&L Meeting Agenda](https://docs.google.com/document/d/1rLChTkkyS77AWu8Nw200Vly71aZE5wgi8-H5Rex5NwY/edit)

### Brief overview

Requirements are documented using Notes and Issues. Tasks are tracked using Issues and Pull Requests.

- Notes:
  - Are used to document requirements
  - Are discussed during meetings
  - Can be converted to Issues when more details are known
- Issues:
  - Are used to track work and requirements
  - Should be linked to a Project
  - Should be linked to a Milestone
- Pull Requests:
  - Contain code that satisfies requirements
  - Should be linked to a Project
  - Should be linked to a Milestone
  - Can be linked to Issues when they satisfy their requirements

### Github methods

We use Github Projects to monitor our work. The project board contains the following columns:

- Notes: Any items in this column are considered new input for the next meeting
- Backlog: The entire collection with known tasks
- To Do: Tasks that are to be done before the next meeting
- In progress: Tasks that are being executed
- Done: Completed tasks, these will be archived during the next meeting

Certain automation rules apply to the project board:

- New Issues go to "Backlog"
- New Pull Requests go to "To Do"
- Reopened Issues and Pull Requests go to "In progress"
- Closed Issues go to "Done"
- Merged or closed Pull Requests go to "Done"

Further things to consider:

- Projects
  - Any new requirements that are established can be added to the "Notes" column.
  - Any work that needs to be done is described and tracked using Issues. These Issues are connected to a project and can therefore be tracked using the project board.
  - Pull Requests are also linked to a project so they can easily be tracked. When a Pull Request satisfies the requirements captured within an Issue, they should be linked. When that Pull Request is merged, the linked Issues are automatically closed as well.
  - Requirements that are deemed beyond the scope of a project are documented in the "Future Versions" project.
- Milestones
  - Milestones represent components of the end product.
  - The order of milestones roughly translate to the order in which they should be built.
  - Issues and Pull Requests should be linked to milestones in order to easily track our work.

## Getting started

1. Make sure you have Git installed on your computer: https://git-scm.com/
2. Make sure you have NodeJS installed on your computer: https://nodejs.dev/download
3. Open a console and navigate to the folder you like your project in: `cd <path>`
4. Clone the project: `git clone https://github.com/fabianvanhummel/basements-and-lizards.git`
5. Move into the project folder: `cd basements-and-lizards`
6. Install the packages needed: `npm install`
7. Start development by using: `npm start`

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

### `npm run storybook`

Starts Storybook in development mode

We use Storybook for easier development with isolated components. View the [Storybook website](https://storybook.js.org/) for more information.

## Packages

- [TailwindCSS](https://tailwindcss.com/): Allows us to use do styling within the JSX to keep all HTML, CSS, and JS tpgether.
- [Meraki UI](https://merakiui.com/#main): Instead of installing a UI library, we use this page for ideas and copy the code.

For more UI ideas, we can also use [Kometa](https://kitwind.io/products/kometa/components) or any other [Tailwind library](https://superdevresources.com/tailwind-ui-kits/).
