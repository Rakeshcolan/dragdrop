import React from 'react';

export default () => {
  const onDragStart = (event, nodeType) => {

    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('id', event.target.id);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
        Input Node
      </div>
      <div className="dndnode" id="groupnode_0" onDragStart={(event) => onDragStart(event, 'textupdater')} draggable>
        Group
      </div>
      <div className="dndnode output" id='button' onDragStart={(event) => onDragStart(event, 'buttonNode')} draggable>
       Button
      </div>
      <div className="dndnode output"  onDragStart={(event) => onDragStart(event, 'textAreaUpdater')} draggable>
         Text
      </div>
    </aside>
  );
};
