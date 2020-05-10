import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import conceptsListInfo from "../../data/concepts";
import uuid from "react-uuid";
import ReactTooltip from "react-tooltip";
import { MODIFY_CONCEPTS_LIST, MODIFY_CONCEPT } from "graphQL/mutations";
import { useMutation } from "@apollo/react-hooks";
import PropositionsFeedBack from "./PropositionsFeedBack";

const getItemStyle = (isDragging, draggableStyle) => ({
  ...draggableStyle,
  userSelect: "none",
  padding: 5,
  margin: 5,
  display: "inline-block",
  marginLeft: 5,
  borderRadius: 5,
  boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
  width: "90px!important",
  background: isDragging ? "lightgreen" : "white",
  height: "90px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const getLineItemStyle = (isDragging, draggableStyle) => ({
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
  width: "60px",
  height: "60px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  width: "100%",
  minHeight: 100,
  padding: 10,
  display: "flex",
  flexWrap: "wrap",
});

const GamePanel = ({ gameInfo }) => {
  const { currentWord, conceptsLists } = gameInfo;
  const initialConcepts = conceptsLists.map((list) =>
    list.map((item) => conceptsListInfo.find((concept) => item === concept.img))
  );
  const gameId = gameInfo.id;
  const [conceptsList, setConcepts] = useState(conceptsListInfo);
  const [selected, setSelected] = useState(initialConcepts);

  const [listIndex, setListIndex] = useState();
  const [listAction, setListAction] = useState();
  const [conceptAction, setConceptAction] = useState();
  const [conceptId, setConceptId] = useState();

  const [modifyConceptsList] = useMutation(MODIFY_CONCEPTS_LIST, {
    variables: {
      gameId,
      listIndex,
      action: listAction,
    },
  });

  const [modifyConcept] = useMutation(MODIFY_CONCEPT, {
    variables: {
      gameId,
      conceptId,
      listIndex,
      action: conceptAction,
    },
  });

  const deleteLine = (idx) => {
    const newlist = [...selected];
    newlist.splice(idx, 1);
    setSelected(newlist);
    setListAction("remove");
    setListIndex(idx);
  };

  const addLine = () => {
    setListIndex(selected.length);
    selected.length < 4 && setSelected([...selected, []]);
    setListAction("add");
  };

  useEffect(() => {
    if (listAction) {
      modifyConceptsList();
      setListAction();
    }
  }, [listAction]);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    const destinationId = destination?.droppableId;
    if (destinationId && destinationId.indexOf("concepts") < 0) {
      const updatedSelected = Array.from(selected[destinationId]);
      const element = conceptsList[source.index];
      if (updatedSelected.map((el) => el.img).indexOf(element.img) === -1) {
        setListIndex(parseInt(destinationId));
        setConceptId(element.img);
        setConceptAction("add");
        updatedSelected.push({ ...element, id: uuid() });
      }
      const newSelectedList = [...selected];
      newSelectedList[destinationId] = updatedSelected;
      setSelected(newSelectedList);
    }
    return;
  };

  const removeConcept = (elementIdx, lineIdx) => {
    setListIndex(lineIdx);
    setConceptId(selected[lineIdx][elementIdx]);
    setConceptAction("remove");
    let newLine = [...selected[lineIdx]];
    newLine.splice(elementIdx, 1);
    let newSelected = [...selected];
    newSelected[lineIdx] = newLine;
    setSelected(newSelected);
  };

  useEffect(() => {
    if (conceptAction) {
      modifyConcept();
      setConceptAction();
    }
  }, [conceptAction]);

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex", height: "calc(100vh - 104px)" }}>
          <div
            style={{
              background: "white",
              right: 0,
              top: 0,
              bottom: 0,
              width: "30%",
              padding: 20,
              height: "100%",
              overflow: "scroll",
            }}
          >
            <button
              className={`btn ${selected.length >= 4 && "disabled"}`}
              onClick={addLine}
            >
              Ajouter un concept
            </button>
            {selected.length >= 4 && <p>Maximum 4 concepts!</p>}
            {selected.map((el, idx) =>
              SelectionLine(el, idx, () => deleteLine(idx), removeConcept)
            )}
          </div>
          <div
            style={{
              width: "70%",
              height: "100%",
              overflow: "scroll",
            }}
          >
            <div
              style={{
                padding: "0px 25px 0px 10px",
                margin: 0,
                background: "white",
                position: "fixed",
                width: "70%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={{ width: "50%", display: "inline-block" }}>
                <h4>Les concepts</h4>
                <p style={{ fontWeight: "bold" }}>
                  Votre mot est : {currentWord}
                </p>
              </div>
              <div style={{ width: "50%", display: "inline-block" }}>
                <PropositionsFeedBack gameInfo={gameInfo} />
              </div>
            </div>
            <div style={{ paddingTop: 150 }}>
              <Droppable droppableId="concepts" isDropDisabled={true}>
                {(provided, snapshot) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                    >
                      {conceptsList.map((item, index) =>
                        conceptCard(item, index)
                      )}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          </div>
        </div>
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
              effect="solid"
              multiline={true}
            />
            <a data-for={item.id} data-tip={item.text} data-iscapture="true">
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={
                  isLine
                    ? getLineItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )
                    : getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )
                }
                onClick={() => {
                  isLine && removeConcept();
                }}
              >
                {isLine && (
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "#005236",
                      height: "100%",
                    }}
                  >
                    X
                  </span>
                )}
                <img
                  src={`/images/concepts/${item.img}`}
                  style={
                    isLine
                      ? { width: 40, height: 40 }
                      : { width: 70, height: 70 }
                  }
                />
              </div>
            </a>
            {snapshot.isDragging && (
              <div style={getItemStyle(snapshot.isDragging)}>
                <img
                  src={`/images/concepts/${item.img}`}
                  style={{ width: 70, height: 70 }}
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
      <h6>
        <button
          style={{ padding: "0 10px", borderRadius: "50%" }}
          className="btn outlined"
          onClick={deleteAction}
        >
          <i className="material-icons">delete</i>
        </button>
        {idx === 0 ? " Concept Principal" : ` Concept ${idx + 1}`}
      </h6>
      {lineInfo.length ? (
        <>
          {lineInfo.map((el, idx) => (
            <p key={idx}>{el.text}</p>
          ))}
        </>
      ) : (
        <p>Ajoutez des concepts</p>
      )}
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
