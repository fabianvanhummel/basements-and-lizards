import { checkRequirements } from "./requirements";

// Overrides
export const checkLocationOverride = (book, gameState, locationId) => {
  if (!book.locations[locationId].override) return locationId;
  const override = book.locations[locationId].override.find((override) =>
    checkRequirements(gameState, override.requirements),
  );
  if (override)
    return checkLocationOverride(book, gameState, override.byLocationId);
  return locationId;
};

export const checkEventOverride = (book, gameState, eventId) => {
  if (!book.events[eventId].override) return eventId;
  const override = book.events[eventId].override.find((override) => {
    override.requirements.push({
      type: "EVENT_NOT_HAPPENED",
      id: override.byEventId,
    });
    return checkRequirements(gameState, override.requirements);
  });
  if (override) return checkEventOverride(book, gameState, override.byEventId);
  return eventId;
};
