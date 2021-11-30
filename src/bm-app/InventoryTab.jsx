import React from "react";
import { Inventory } from "../components/Inventory";


export const InventoryTab = ({items, addEvent}) => (
  <div className="p-4">
    <Inventory
      items={items}
      addEvent={addEvent}
    />
  </div>
  );
