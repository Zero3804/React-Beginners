import { GoHeartFill } from "react-icons/go";
import { GiBrokenHeart } from "react-icons/gi";
import { useState } from "react";

interface Props {
    onClick: () => void;
}

const Like = ({onClick}: Props) => {
    const [status, setStatus] = useState(false);

    const toggle = () => {
        setStatus(!status);
        onClick();
    };
return (
    <div>
      {status ? (
        <GoHeartFill color="red" size={30} onClick={toggle} />
      ) : (
        <GiBrokenHeart color="red" size={30} onClick={toggle} />
      )}
    </div>
)
}

export default Like;