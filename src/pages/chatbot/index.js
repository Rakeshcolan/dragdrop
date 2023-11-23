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

      setNodes(nodeObjectJson.nodes);
      setEdges(nodeObjectJson.edges);
    },[])

    const [nodeTypes, setNodeTypes] = useState({
      textupdater: TextUpdaterNode,
      buttonNode: ButtonNode,
      textAreaUpdater: TextAreaUpdater,
    })
    
    const updateNode = () => {
      console.log(nodes);
      if(nodes.length>0){
        return nodes.map((node) => {
          try {
            if (node.id === textUpdaterInput.id) {
              node.data = {
                ...node.data,
                label: textUpdaterInput.value,
              };
            }
            return node;
          } catch (err) {
            console.log("err", err);
          }
        });
      }
    };
// useEffect(()=>{
//   updateNode()
// },[nodes])
  return <>
  <div className="dndflow">
    <FlowPage  updateNode={nodes} edges={edges} />
  </div>
    
    </>;
};

export default ChatBot;
