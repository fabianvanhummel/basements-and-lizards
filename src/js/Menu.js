import "../css/splash-screen.css";

export function Menu({setStory}) {
  return (
    <main className="p-4 svg-background min-h-screen fade-in-2s">
      <div className="max-w-2xl px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800 text text-lg font-sans text-center">
        {" "}
        Choose the story you wish to play.
      </div>
      <div className="max-w-lg my-10 px-8 py-4 mx-auto text text-lg font-sans text-center">
        <button
          id="introduction"
          className="max-w-lg px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800 text text-lg font-sans text-center"
          onClick={() => {
            setStory("introduction");
          }}
        >
          Maze runner (introduction)
        </button>
      </div>
    </main>
  );
}
