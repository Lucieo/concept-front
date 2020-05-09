import React, { useState } from "react";
import DragAndDrop from "./DragAndDrop";
import PropositionsFeedBack from "./PropositionsFeedBack";

export default function SelectConcepts({ gameInfo }) {
  return (
    <div>
      <PropositionsFeedBack gameInfo={gameInfo} />
      <DragAndDrop gameInfo={gameInfo} />
    </div>
  );
}
