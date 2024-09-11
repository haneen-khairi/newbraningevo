import { useContext } from "react";
import ResultContext from "@/contexts/resultContext";
export default function useResultModal() {
    const { success, error, confirm } = useContext(ResultContext);
    return { success, error, confirm };
}