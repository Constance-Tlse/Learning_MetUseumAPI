import {useEffect, useState} from "react";
import useSWR from 'swr';
import {PaintingProps} from "../services/types";

function home() {
    const [DataOuverture, setDataOuverture] = useState<number[] | undefined>()
    const [DataLivret, setDataLivret] = useState< PaintingProps[] | undefined>()

    async function Livret(objectIDs: number[], setDataLivret: (data: PaintingProps[]) => void) {

        const TailleduLot = 80;
        const Delai = 1000;

        for (let i = 0; i < objectIDs.length; i += TailleduLot) {
            const Lot = objectIDs.slice(i, i + TailleduLot);
            const LivretData = await Promise.all(
                Lot.map(async (objectID) => {
                    const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);
                    return response.json();
                })
            );
            setDataLivret((prevDataArt) => [...(prevDataArt || []), ...LivretData]);
            await new Promise((resolve) => setTimeout(resolve, Delai)); // Attendre avant le prochain lot
        }
    }
        useEffect(() => {
            async function Ouverture() {
                const theme = 'Hokusai';
                const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${theme}`;
                const response = await fetch(url);
                const data = await response.json();
                setDataOuverture(data.objectIDs);

                if (data.objectIDs) {
                    await Livret(data.objectIDs, setDataLivret);
                }
            }
            Ouverture();
        }, []);

    useEffect(() => {
        console.log(DataOuverture);
    }, [DataOuverture]);

    useEffect(() => {
        console.log(DataLivret);
    }, [DataLivret]);

    return (
        <div style={{ display: "grid", gridTemplateColumns: "auto auto auto", gridGap: "50px" }}>
            {DataLivret && DataLivret.map((art) => (
                    <section key={art.objectID}>
                        <img src={art.primaryImageSmall} style={{ width: "100%" }} />
                        <h3>{art.artistAlphaSort}</h3>
                        <p>{art.objectDate} {art.medium}</p>
                        <p>{art.department}</p>
                    </section>
                ))}
        </div>
    );

}

export default home;