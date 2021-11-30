import { Item } from "../components/Item";

export const Inventory = ({items, addEvent}) => {
  return (
    <div className="max-w-2xl px-8 py-4 mx-auto bg-red-50 rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-700 dark:text-white">
          Inventory
        </h1>
        <div className="px-3 py-1 text-sm font-bold text-gray-100 bg-red-600 rounded">
          Inventory
        </div>
      </div>
      
     {items && (
       <div class="mt-4">
         <span class="text-sm font-light text-gray-600 dark:text-gray-400">
           Items
         </span>
         <ul>
           {items.map((item, index) => (
             <li key={index} class="mt-2">
               <Item {...item} addEvent={addEvent} />
             </li>
           ))}
         </ul>
       </div>
     )}
     
    </div>
  )};

  export default Inventory;
