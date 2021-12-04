import { BMApp } from "./bm-app/BMApp";
import maze from "./books/maze.json";

// Note: this component is meant to control rendering of different apps. Since we only have one app now, it's still very basic.

export const App = () => <BMApp book={maze} />;
