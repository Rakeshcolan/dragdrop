import { useEffect, useState } from "react";
import  {

  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MarkerType,
} from "reactflow";
import FlowPage from "../../components/common/reactflow";
import ButtonNode from "../../components/fields/buttonNode";
import TextAreaUpdater from "../../components/fields/textArea";
import TextUpdaterNode from "../../components/fields/TextUpdaterNode";

import "../../index.css"

const ChatBot = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [textUpdaterInput, setTextUpdaterInput] = useState({});

    useEffect(()=>{
      let nodeObject =   localStorage.getItem('object');
      let nodeObjectJson  =JSON.parse(nodeObject);

      setNodes(nodeObjectJson.flowElements.nodes);
      setEdges(nodeObjectJson.flowElements.edges);
    },[])

// useEffect(()=>{
//   updateNode()
// },[nodes])
  return <>
  <div className="dndflow">
    <FlowPage  nodes={nodes} edges={edges} />
  </div>
    
    </>;
};

export default ChatBot;
