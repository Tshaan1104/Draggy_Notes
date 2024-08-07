import { Addbutton } from "./addbutton";
import colors from "../assets/colors.json"
import Colors from "./colors";


const Controls = () => {
    return (
        <div id="controls">
            <Addbutton/>
            {
                colors.map((color)=>(
                    <Colors key={color.id} color={color}/>
                ))
            }
        </div>
    );
};
 
export default Controls;