import { useState, useEffect } from "react";
import { PaintingProps } from "../services/types";
import Paint from "../components/painting.tsx";

function home() {
    const [Data, setData] = useState<number[] | undefined>()
    const [DataArt, setDataArt] = useState< PaintingProps[] | undefined>()

    useEffect(() => {
        async function FetchList() {

            const theme = 'CasparDavidFriedrich';
            const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${theme}`;
            const response = await fetch(url);
            const datalist = await response.json();
            setData(datalist);
            console.log(Data);
        }
        FetchList();

    }, []);



    useEffect(() => {
        async function Paintingdata(data: number[] | undefined) {
            if (!data) {
                return
            }
            const datalistid = data[0];
            const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${datalistid}`;
            const response = await fetch(url);
            const art = await response.json();
            setDataArt(art);
            console.log(DataArt);
        }
        Paintingdata(Data)
    }, [Data]);


   // {DataArt && DataArt.map((test) => <Paint key={test.objectID} /> )}

return <>

</>;
}

export default home;