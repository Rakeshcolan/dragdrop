import { useCallback, useState } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import 'reactflow/dist/style.css';

import TextUpdaterNode from './TextUpdaterNode.js';



function Flow({elem}) {
    
    const rfStyle = {
      backgroundColor: '#B8CEFF',
    };
    
    const initialNodes = [
      
      {
        id: 'node-2',
        type: 'output',
        targetPosition: 'top',
        position: { x: 0, y: 200 },
        data: { elem },
      },
   
    ];
    
    const initialEdges = [
      // { id: 'edge-1', source: 'node-1', target: 'node-2', sourceHandle: 'a' },
      // { id: 'edge-2', source: 'node-1', target: 'node-3', sourceHandle: 'b' },
    ];
    
    // we define the nodeTypes outside of the component to prevent re-renderings
    // you could also use useMemo inside the component
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    const nodeTypes = { textUpdater: TextUpdaterNode };

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
      style={rfStyle}
    />
  );
}

export default Flow;
