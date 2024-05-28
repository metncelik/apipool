import Toggle from "react-toggle";
import '../styles/components/ToggleButton.css';

const ToggleButton = ({text, defaultState, stateSetter, icons}) => {
    return (
        <label className="toggle-button">
            <span className="toggle-span">{text}</span>
            <Toggle 
            defaultChecked={defaultState} 
            icons={
                {
                    checked: icons[0],
                    unchecked: icons[1]
                }
            } 
            onChange={stateSetter} 
            />
        </label>
    );
};

export default ToggleButton;