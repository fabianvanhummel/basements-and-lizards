import React, { Component } from 'react';
import '../css/splash-screen.css';

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
