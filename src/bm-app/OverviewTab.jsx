import React from "react";

export const OverviewTab = ({ book, gameState }) => {
  return (
    <div className="text-center mt-4 w-4/6 m-auto">
      <div className="font-sans text-3xl">Welcome (back) to </div>
      <div className="font-sans text-5xl">{book.name}</div>
      <div className="mx-4 bg-blue-50 rounded-lg shadow-md mt-4 py-4">
        <div className="font-sans text-3xl ">Description</div>
        <div className="justify-center items-center flex overflow-y-auto">
          {book.description}
        </div>
      </div>
      <div className="mx-4 bg-fuchsia-50 rounded-lg shadow-md mt-4 py-4">
        <div className="font-sans text-3xl ">Statistics</div>
        <div className="flex flex-col justify-center">
          <div className="font-sans text-xl mt-4">
            Time played:
            <div className="font-bold">Way too short</div>
          </div>
          <div className="font-sans text-xl mt-4">
            Current Location
            <div className="font-bold">
              {book.locations[gameState.location].name}
            </div>
          </div>
          <div className="font-sans text-xl mt-4">
            Enemies defeated:
            <div className="font-bold">Not yet implemented</div>
          </div>
          <div className="font-sans text-xl mt-4">
            Items picked up:
            <div className="font-bold">{gameState.inventoryItems.length}</div>
          </div>
        </div>
      </div>
      <div className="mx-4 bg-yellow-50 rounded-lg shadow-md mt-4 py-4">
        <div className="font-sans text-3xl">Party</div>
        <div className="mx-auto my-4 mr-0">
          {book.characters &&
            book.characters.map((character, index) => {
              return (
                <div key={index} className="rounded-md w-full my-4">
                  <p className="text-lg font-bold">{character.name}</p>
                  <div className="items-center m-auto w-full">
                    <img
                      className="m-auto"
                      src={character.image}
                      width="108"
                      height="128"
                      alt=""
                    ></img>
                  </div>
                  <div key={character.id}>
                    <p> {character.race}</p>
                    <p className="italic">'{character.title}'</p>
                  </div>
                  <div className="max-h-28 mx-2 overflow-auto">
                    {character.description
                      ? character.description
                      : "A dark and mysterious past."}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="mx-4 bg-green-50 rounded-lg shadow-md mt-4 py-4">
        <div className="font-sans text-3xl">Gamestate</div>
        <div className="flex flex-col justify-center">
          <div className="font-sans text-xl mt-4">
            Current location:
            <div className="font-bold">
              {book.locations[gameState.location].name}
            </div>
          </div>
          <div className="font-sans text-xl mt-4">
            Latest actions:
            <div className="font-bold">
              TODO: use history to show latest action
            </div>
          </div>
          <div className="font-sans text-xl mt-4">
            Latest events:
            <div className="font-bold">
              {
                // Here we slice off the 3 most recently happened events to show in the overview tab. The choice for 3 is arbitrary and was made by the developer himself when programming this part. The same goes for items.
                gameState.pastEvents.length !== 0
                  ? gameState.pastEvents
                      .slice(0, 3)
                      .map((event) => event + ", ")
                  : "None"
              }
            </div>
          </div>
          <div className="font-sans text-xl mt-4">
            Latest item pickups:
            <div className="font-bold">
              {gameState.length !== 0
                ? gameState.inventoryItems.length !== 0
                  ? gameState.inventoryItems
                      .slice(0, 3)
                      .map((item) => item + ", ")
                  : "None"
                : "None"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
