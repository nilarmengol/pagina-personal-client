import React, { useState, useEffect } from "react";

export default function MenuWebList({ menu, setReloadMenuWeb }) {
  return (
    <div>
      <h1>Menu Web</h1>
      {menu.map(item => (
        <p key={item._id}>{item.title}</p>
      ))}
    </div>
  );
}
