import { BMApp } from "./bm-app/BMApp";
import maze from "./books/maze.json";
import "./styles/splashscreen.css"
import { Component, useState, useEffect } from "react"

// Disable this boolean if you dont want the startup screen (please do this when testing)
const doStartScreen = false;

// Note: this component is meant to control rendering of different apps. Since we only have one app now, it's still very basic.

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

export function splashScreen(WrappedComponent) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
      };
    }

    async componentDidMount() {
      setTimeout(() => {
        this.setState({
          loading: false,
        });
      }, 5500) // Deze tijd kunnen we later nog aanpassen. Voor nu past 5500 ms prima
    }

    render() {
      // while checking user session, show "loading" message
      if (this.state.loading) return LoadingMessage();

      // otherwise, show the desired route
      return <WrappedComponent />;
    }
  };
}

export const App = () => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  });

  if (loading && doStartScreen) return <LoadingMessage />
  return <BMApp book={maze} />
}
