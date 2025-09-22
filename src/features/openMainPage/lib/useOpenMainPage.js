import { useNavigate } from "react-router";
export const useOpenMainPage = () => {
    const navigate = useNavigate();
    return ()=>{navigate("/")}
}