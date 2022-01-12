import React from "react";

export const OverviewTab = ({ book, gameState, gameStateHistory }) =>

  <div className="text-center mt-8 h-5/6">
    <div className="font-sans text-3xl">Welcome (back) to </div>
    <div className="font-sans text-5xl">{book.name}</div>
    <div className="grid grid-cols-3 mt-16 h-4/6">
      <div className="grid-rows-2">
        <div className="mx-4 bg-blue-50 rounded-lg shadow-md h-3/6">
          <div className="font-sans text-3xl ">
            Description
          </div>
          <div className="justify-center items-center flex h-5/6 overflow-y-auto">
            {book.description}
          </div>
        </div>
        <div className="mx-4 bg-fuchsia-50 rounded-lg shadow-md h-3/6 mt-8">
          <div className="font-sans text-3xl ">
            Statistics
          </div>
          <div className="h-5/6 flex flex-col justify-center">
            <div className="font-sans text-xl mt-4">
              Time played:
              <div className="font-bold">
                Way too short
              </div>
            </div>
            <div className="font-sans text-xl mt-4">
              Locations visited:
              <div className="font-bold">
                {
                  gameStateHistory.length !== 0 ? gameStateHistory.filter(state => state[0].changeLog === "location-swap").length : 1
                }
              </div>
            </div>
            <div className="font-sans text-xl mt-4">
              Enemies defeated:
              <div className="font-bold">
                Not yet implemented
              </div>
            </div>
            <div className="font-sans text-xl mt-4">
              Items picked up:
              <div className="font-bold">
                {
                  gameStateHistory.length !== 0 ? gameStateHistory.filter(state => state[0].changeLog === "item-added").length : 1
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid-rows-2">
        <div className="mx-4 bg-yellow-50 rounded-lg shadow-md h-full">
          <div className="font-sans text-3xl">
            Party
          </div>
          <div className="w-5/6 mx-auto my-4">
            {book.characters.map(character => {
              return (
                <div className="rounded-md border-2 border-orange-200	w-full my-2 grid grid-cols-3 font-bold">
                  <div className="border-2 border-orange-200 items-center m-auto w-full">
                    <img className="m-auto" src={character.image} width="100" height="120" alt=""></img>
                  </div>
                  <div className="border-2 border-orange-200">
                    <p className="text-lg">{character.name}</p>
                    <p> {character.race}</p>
                    <p>'{character.title}'</p>
                  </div>
                  <div className="border-2 border-orange-200">
                    <p className="text-lg">
                      Items:
                    </p>
                    <p>
                      {character.items.length !== 0 ? character.items.map(
                        item => {
                          return (
                            <p>{item}</p>
                          )
                        }) : 'Nothing'
                      }
                    </p>
                  </div>
                </div>
              )
            })
            }
          </div>
        </div>
      </div>
      <div className="grid-rows-2">
        <div className="mx-4 bg-green-50 rounded-lg shadow-md h-3/6">
          <div className="font-sans text-3xl">
            Gamestate
          </div>
          <div className="h-5/6 flex flex-col justify-center">
            <div className="font-sans text-xl mt-4">
              Current location:
              <div className="font-bold">
                {book.locations[gameState.locationIdState].name}
              </div>
            </div>
            <div className="font-sans text-xl mt-4">
              Latest locations:
              <div className="font-bold">
                {
                  gameStateHistory.length !== 0 ? gameStateHistory.filter(state => state[0].changeLog === 'location-swap').map(state => book.locations[state[0].locationIdState].name + ', ') : "None"
                }
              </div>
            </div>
            <div className="font-sans text-xl mt-4">
              Latest events:
              <div className="font-bold">
                {
                  // Here we slice off the 3 most recently happened events to show in the overview tab. The choice for 3 is arbitrary and was made by the developer himself when programming this part. The same goes for items.
                  gameState.length !== 0 ? gameState.happenedEvents.length !== 0 ? gameState.happenedEvents.slice(0, 3).map((event) => event + ", ") : "None" : "None"
                }
              </div>
            </div>
            <div className="font-sans text-xl mt-4">
              Latest item pickups:
              <div className="font-bold">
                {
                  gameState.length !== 0 ? gameState.inventoryItems.length !== 0 ? gameState.inventoryItems.slice(0, 3).map((item) => item + ", ") : "None" : "None"
                }
              </div>
            </div>
          </div>
        </div>
        <div className="mx-4 bg-violet-50 rounded-lg shadow-md h-3/6 mt-8">
          <div className="font-sans text-3xl">
            Wincondition
          </div>
          <div>(caution: spoilers)</div>
          <div className="font-sans text-xl mt-4">
            <p>Last event is:</p>
            <p className="text-lg font-bold">
              {book.finalEvent}
            </p>
            <p className="mt-4">Event happens on location:</p>
            <p className="text-lg font-bold">
              {Object.values(book.locations).filter(location =>
                location.hasOwnProperty('events')
              ).map(location => location.events.indexOf(book.finalEvent) !== -1? location.name : '')
              }
            </p>
            <p className="mt-4">Event has requirement(s):</p>
            <p className="text-lg font-bold">
              {book.events[book.finalEvent].requirements.map(requirement => requirement.id)}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>