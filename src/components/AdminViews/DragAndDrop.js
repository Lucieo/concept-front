import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import conceptsListInfo from "./concepts";
import uuid from "react-uuid";
import ReactTooltip from "react-tooltip";

const getItemStyle = (isDragging, draggableStyle) => ({
  ...draggableStyle,
  userSelect: "none",
  padding: 5,
  margin: 5,
  display: "inline-block",
  marginLeft: 5,
  borderRadius: 5,
  boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
  width: "100px!important",
  background: isDragging ? "lightgreen" : "white",
  width: "100px",
  height: "100px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  width: "100%",
  minHeight: 100,
  padding: 10,
  display: "flex",
  flexWrap: "wrap",
});

const GamePanel = () => {
  const [conceptsList, setConcepts] = useState(conceptsListInfo);
  const [selected, setSelected] = useState([[]]);

  const removeConcept = (elementIdx, lineIdx) => {
    let newLine = [...selected[lineIdx]];
    newLine.splice(elementIdx, 1);
    let newSelected = [...selected];
    newSelected[lineIdx] = newLine;
    setSelected(newSelected);
  };

  const deleteLine = (idx) => {
    const newlist = [...selected];
    newlist.splice(idx, 1);
    setSelected(newlist);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    const destinationId = destination?.droppableId;
    if (destinationId && destinationId.indexOf("concepts") < 0) {
      const updatedSelected = Array.from(selected[destinationId]);
      const element = conceptsList[source.index];
      if (updatedSelected.map((el) => el.img).indexOf(element.img) === -1) {
        updatedSelected.push({ ...element, id: uuid() });
      }
      const newSelectedList = [...selected];
      newSelectedList[destinationId] = updatedSelected;
      setSelected(newSelectedList);
    }
    return;
  };

  return (
    <>
      <button
        className={`btn ${selected.length >= 4 && "disabled"}`}
        onClick={() => selected.length < 4 && setSelected([...selected, []])}
      >
        Ajouter un concept
      </button>
      <DragDropContext onDragEnd={onDragEnd}>
        {selected.map((el, idx) =>
          SelectionLine(el, idx, () => deleteLine(idx), removeConcept)
        )}
        <h4>Les concepts</h4>
        <Droppable droppableId="concepts" isDropDisabled={true}>
          {(provided, snapshot) => {
            console.log(provided.placeholder);
            return (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {conceptsList.map((item, index) => conceptCard(item, index))}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default GamePanel;

const conceptCard = (
  item,
  index,
  isLine = false,
  removeConcept = undefined
) => {
  const id = item.img.split(".")[0];
  if (item.img) {
    return (
      <Draggable
        key={item.id}
        draggableId={item.id}
        index={index}
        isDragDisabled={isLine}
      >
        {(provided, snapshot) => (
          <>
            <ReactTooltip
              id={item.id}
              place="top"
              type="dark"
              effect="float"
              multiline={true}
            />
            <a data-for={item.id} data-tip={item.text} data-iscapture="true">
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={getItemStyle(
                  snapshot.isDragging,
                  provided.draggableProps.style
                )}
              >
                {isLine && (
                  <span
                    style={{
                      cursor: "pointer",
                      fontWeight: "bold",
                      color: "#005236",
                      height: "100%",
                    }}
                    onClick={removeConcept}
                  >
                    X
                  </span>
                )}
                <img
                  src={`/images/concepts/${item.img}`}
                  style={{ width: 80, height: 80 }}
                />
              </div>
            </a>
            {snapshot.isDragging && (
              <div style={getItemStyle(snapshot.isDragging)}>
                <img
                  src={`/images/concepts/${item.img}`}
                  style={{ width: 80, height: 80 }}
                />
              </div>
            )}
          </>
        )}
      </Draggable>
    );
  } else {
    return (
      <p style={{ width: "100%" }} key={index}>
        {item.text}
      </p>
    );
  }
};

const SelectionLine = (lineInfo, idx, deleteAction, removeConcept) => {
  return (
    <div key={idx}>
      <h4>
        <button
          style={{ padding: "0 10px", borderRadius: "50%" }}
          className="btn outlined"
          onClick={deleteAction}
        >
          <i className="material-icons">delete</i>
        </button>
        {idx === 0 ? " Concept Principal" : ` Concept ${idx + 1}`}
      </h4>
      <Droppable droppableId={`${idx}`}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {lineInfo.map((item, index) =>
              conceptCard(item, index, true, () => removeConcept(index, idx))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
