import { useSelector } from "react-redux";
import "./deleteIcon.css";
import ClearIcon from '@mui/icons-material/Clear';
const DeleteIcon = (props)=>{
let deleteNodeInstance = useSelector((state)=>state.instanceNode);

const {onDeleteInstance,deleteId} = props;
    const onDeleteNode = () => {
        console.log("ondeleteinstance",onDeleteInstance,props);
        let deleteNode = deleteNodeInstance?.getNodes()
          .filter((element) => element.id === deleteId);
          deleteNodeInstance.deleteElements({ nodes: deleteNode });
      };

    return (
        <ClearIcon  fontSize="small" className="iconstyle" onClick={()=>{onDeleteNode()}}/>
    )
}

export default DeleteIcon;