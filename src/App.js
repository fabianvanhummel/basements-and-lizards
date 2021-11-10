import { useState } from 'react'
import data from './json/maze.json' // book

function App() {
  const [location, setLocation] = useState(data['start-location']) // state

  return (
    <div className="svg-background min-h-screen">
      <main>
        <h1>{ data.locations[location].name }</h1>
        <p>{ data.locations[location].description }</p>

        { data.locations[location].directions.map((direction, index) => (
          <div key={index}>
            <button
              onClick={() => setLocation(direction)} // action
            >
              { direction }
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
