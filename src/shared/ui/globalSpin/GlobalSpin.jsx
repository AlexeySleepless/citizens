import { Spin } from "antd";
import classes from "./GlobalSpin.module.css";

export const GlobalSpin = () => {
    return(
        <Spin className={classes.contentSpin}/>
    );
}