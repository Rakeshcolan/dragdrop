
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import 'reactflow/dist/style.css';
import Flow from "./flow";

const Column = ({ id, title, items, index }) => {
  return (
    <Droppable droppableId={id} type="ITEM">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            border: "1px solid lightgray",
            padding: "8px",
            width: "200px",
            background: snapshot.isDraggingOver ? "lightblue" : "white",
          }}
        >
          <h3>{title}</h3>

          {items.map((item, index) =>(
             item.isDropped ? (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                     
                    >
                     <Flow elem={item.elem}/>
                    </div>
                  )}
                </Draggable>
              ) : (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        userSelect: "none",
                        padding: "8px",
                        margin: "4px",
                        backgroundColor: snapshot.isDragging
                          ? "lightgreen"
                          : "lightgrey",
                        border: "1px solid gray",
                        borderRadius: "4px",
                        ...provided.draggableProps.style,
                      }}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              )
          )  )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

const DragAndDropExample = () => {
  const [columns, setColumns] = useState({
    column1: {
      id: "column1",
      title: "Column 1",
      items: [
          { id: "item-1", content: "Item 1", elem: <div>Div</div> },
          { id: "item-2", content: "Item 2", elem: <input></input> },
          {id:"item-3",content:"Button",elem:<button>Hi</button>}
     
    ],
    },
    // column2: {
    //   id: 'column2',
    //   title: 'Column 2',
    //   items: [
    //     { id: 'item-3', content: 'Item 3' },
    //     { id: 'item-4', content: 'Item 4' },
    //   ],
    // },
    column3: {
      id: "column3",
      title: "Column 3",
      items: [],
    },
  });

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const sourceColumn = result.source.droppableId;
    const destinationColumn = result.destination.droppableId;

    if (sourceColumn === destinationColumn) {
      const column = { ...columns[sourceColumn] };
      const reorderedItems = Array.from(column.items);
      const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
      reorderedItems.splice(result.destination.index, 0, reorderedItem);
      column.items = reorderedItems;

      setColumns({ ...columns, [sourceColumn]: column });
    } else {
      const sourceItems = [...columns[sourceColumn].items];
      const [movedItem] = sourceItems.splice(result.source.index, 1);
      [movedItem][0].isDropped = true;
      const destinationItems = [...columns[destinationColumn].items];
      destinationItems.splice(result.destination.index, 0, movedItem);

      setColumns({
        ...columns,
        [sourceColumn]: { ...columns[sourceColumn], items: sourceItems },
        [destinationColumn]: {
          ...columns[destinationColumn],
          items: destinationItems,
        },
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex" }}>
        {Object.keys(columns).map((columnId) => (
          <Column
            key={columns[columnId].id}
            id={columns[columnId].id}
            title={columns[columnId].title}
            items={columns[columnId].items}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

const Example = () => {
  return (
    <div>
      <h1>Drag and Drop Example</h1>
      <DragAndDropExample />
    </div>
  );
};

export default Example;
