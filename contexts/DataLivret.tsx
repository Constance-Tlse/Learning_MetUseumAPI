import { createContext } from "react";
import { PaintingProps } from "../services/types";

type DataLivretContextType = {
    DataOuverture: PaintingProps[];
    setDataOuverture: React.Dispatch<React.SetStateAction<PaintingProps[]>>;
};

const DataLivret = createContext<DataLivretContextType | null>(null);

export default DataLivret;