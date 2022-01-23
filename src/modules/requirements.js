// Requirements
export const checkRequirements = (gameState, requirements = []) => {
  let reqMet = true;
  let blocked = false;
  requirements.forEach((requirement) => {
    switch (requirement.type) {
      case "EVENT_DID_HAPPEN":
        if (!gameState.pastEvents.includes(requirement.id)) {
          reqMet = false;
        }
        break;
      case "ITEM_IN_INVENTORY":
        if (!gameState.inventoryItems.includes(requirement.id)) {
          reqMet = false;
        }
        break;
      case "EVENT_NOT_HAPPENED":
        if (gameState.pastEvents.includes(requirement.id)) {
          blocked = true;
        }
        break;
      default:
        // Do Nothing
        break;
    }
  });

  return reqMet && !blocked;
};
