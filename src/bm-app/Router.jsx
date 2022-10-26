import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import classNames from "classnames";
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
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="fade-in-1s background"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
      }}
    >
      <BrowserRouter>
        <nav className="relative bg-white shadow dark:bg-gray-800">
          <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 transition-colors duration-300 transform dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300">
                  Basements & Lizards
                </h1>
              </div>

              <div className="flex lg:hidden">
                <button
                  onClick={() => setMenuOpen(!isMenuOpen)}
                  type="button"
                  className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                  aria-label="toggle menu"
                >
                  {!isMenuOpen && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4 8h16M4 16h16"
                      />
                    </svg>
                  )}

                  {isMenuOpen && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div
              className={classNames(
                "absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center",
                {
                  "translate-x-0 opacity-100": isMenuOpen,
                  "opacity-0 -translate-x-full": !isMenuOpen,
                },
              )}
            >
              <div className="flex flex-col md:flex-row md:mx-6">
                <Link
                  className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
                  to="/basements-and-lizards"
                >
                  Home
                </Link>
                <Link
                  className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
                  to="/basements-and-lizards/game"
                >
                  Game
                </Link>
                <Link
                  className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
                  to="/basements-and-lizards/inventory"
                >
                  Inventory
                </Link>
                <Link
                  className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
                  to="/basements-and-lizards/history"
                >
                  History
                </Link>
                {gameState.gameFinished && (
                  <Link
                    className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
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
