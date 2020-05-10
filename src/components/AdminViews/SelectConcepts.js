import React, { useState } from "react";
import DragAndDrop from "./DragAndDrop";

export default function SelectConcepts({ gameInfo }) {
  return (
    <div>
      <DragAndDrop gameInfo={gameInfo} />
    </div>
  );
}
