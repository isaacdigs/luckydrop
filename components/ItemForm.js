"use client";

const ItemForm = ({ itemAttributes }) => (
  <div className="w-1/2 h-full flex flex-col justify-center items-center">
    <h2>Item Information</h2>
    <form className="w-full max-w-lg">
      <input type="text" value={itemAttributes.name} readOnly />
      {/* Render other fields similarly */}
      <button className="bg-black text-white mt-4" disabled>Coming Soon</button>
    </form>
  </div>
);

export default ItemForm;
