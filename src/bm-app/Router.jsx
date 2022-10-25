import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { OverviewTab } from "./OverviewTab";
import { GameTab } from "./GameTab";
import { InventoryTab } from "./InventoryTab";
import { HistoryTab } from "./HistoryTab";
import { FinishTab } from "./FinishTab";
import { makeInventoryItemList } from "../modules/listFunctions";
import "../styles/background.css";

export const Router = ({
  book,
  gameState,
  changeLog,
  history,
  handleAction,
  backgroundImageUrl,
}) => {
  return (
    <div
      className="fade-in-1s background"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
      }}
    >
      <BrowserRouter>
        <nav className="bg-white shadow dark:bg-gray-800">
          <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
            <div className="flex items-center justify-between">
              <div>
                <h1
                  className="text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl"
                  to="/"
                >
                  Basements & Lizards
                </h1>
              </div>

              <div className="flex md:hidden">
                <button
                  type="button"
                  className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                  aria-label="toggle menu"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path
                      fillRule="evenodd"
                      d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            <div className="items-center md:flex">
              <div className="flex flex-col md:flex-row md:mx-6">
                <Link
                  className="my-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0"
                  to="/basements-and-lizards"
                >
                  Home
                </Link>
                <Link
                  className="my-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0"
                  to="/basements-and-lizards/game"
                >
                  Game
                </Link>
                <Link
                  className="my-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0"
                  to="/basements-and-lizards/inventory"
                >
                  Inventory
                </Link>
                <Link
                  className="my-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0"
                  to="/basements-and-lizards/history"
                >
                  History
                </Link>
                {gameState.gameFinished && (
                  <Link
                    className="my-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0"
                    to="/basements-and-lizards/finish"
                  >
                    Finish
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route
            path="/"
            element={<OverviewTab book={book} gameState={gameState} />}
          />

          <Route
            path="/basements-and-lizards"
            element={<OverviewTab book={book} gameState={gameState} />}
          />

          <Route
            path="/basements-and-lizards/game"
            element={
              <GameTab
                book={book}
                gameState={gameState}
                changeLog={changeLog}
                handleAction={handleAction}
              />
            }
          />

          <Route
            path="/basements-and-lizards/inventory"
            element={
              <InventoryTab
                inventoryItems={makeInventoryItemList(book, gameState)}
              />
            }
          />
          <Route
            path="/basements-and-lizards/history"
            element={
              <HistoryTab history={history} handleAction={handleAction} />
            }
          />

          <Route
            path="/basements-and-lizards/finish"
            element={<FinishTab gameState={gameState} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
