import { useNavigate } from "react-router";
import { routeConsts } from '../../../shared/config';

const { citizensPath } = routeConsts;
export const useOpenCitizensPage = () => {
    const navigate = useNavigate();
    return ()=>{navigate(`/${citizensPath}`)}
}