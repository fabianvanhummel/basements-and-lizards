import { useState } from 'react'
import data from './tutorial.json'

function App() {

  const [location, setLocation] = useState(data['start-location'])

  return (
    <div className="svg-background min-h-screen">
      <main>
        <p>{ data.locations[location].story }</p>

        { data.locations[location].directions.map(direction => (
          <div key={direction.to} style={{ marginTop: "8px" }}>
            <p>{ direction.story }</p>
            <button onClick={() => setLocation(direction.to)}>
              { direction.to }
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
