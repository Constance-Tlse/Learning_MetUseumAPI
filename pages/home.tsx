import React, { useState, useEffect, useCallback } from 'react';
import useSWR from 'swr';
import {PaintingProps} from "../services/types.tsx";

function Home() {

        const [DataOuverture, setDataOuverture] = useState<PaintingProps[]>([]);
        const theme = 'Hokusai';
        const searchUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${theme}`;

        const { data: searchData, error: searchError } = useSWR<{ objectIDs: number[] }>(searchUrl, async (url) => {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(` ${url} ${response.status}`);
            }
            return await response.json();
        });

        const Livret = useCallback(async (objectIDs: number[]): Promise<PaintingProps[]> => {
            const TailleduLot = 80;
            const Delai = 1000;
            const Results: PaintingProps[] = [];

            for (let i = 0; i < objectIDs.length; i += TailleduLot) {
                const Lot = objectIDs.slice(i, i + TailleduLot);
                const LivretData = await Promise.all(
                    Lot.map(async (id) => {
                        try {
                            const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
                            if (!response.ok) {
                                throw new Error(`${id} ${response.status}`);
                            }
                            const artData = await response.json() as PaintingProps;
                            return artData;
                        } catch (error) {
                            console.error(`${id}`, error);
                            return null;
                        }
                    })
                );
                Results.push(...LivretData.filter((result): result is PaintingProps => result !== null));
                await new Promise((resolve) => setTimeout(resolve, Delai));
            }
            return Results;
        }, []);

        useEffect(() => {
            if (searchData?.objectIDs) {
                const getArtData = async () => {
                    try {
                        const Synopsis = await Livret(searchData.objectIDs);
                        setDataOuverture(Synopsis);
                    } catch (error) {
                        console.error(error)
                    }
                };
                getArtData();
            }
        }, [searchData?.objectIDs, Livret]);


    useEffect(() => {
        console.log("DataOuverture", searchData?.objectIDs);
    }, [searchData?.objectIDs]);

    useEffect(() => {
        console.log("DataLivret", DataOuverture);
    }, [DataOuverture]);

    if (searchError) return <div>Erreur lors de la récupération des données de recherche</div>;
    if (!searchData) return <div>Chargement...</div>;

    return (
        <div style={{ display: "grid", gridTemplateColumns: "auto auto auto", gridGap: "50px" }}>
            {DataOuverture?.map((art) => {
                if (art.primaryImageSmall) {
                    return (
                        <section key={art.objectID}>
                            <img src={art.primaryImageSmall} style={{ width: "100%" }} alt={art.title} />
                            <h3>{art.artistAlphaSort}</h3>
                            <p>{art.objectDate} {art.medium}</p>
                            <p>{art.department}</p>
                        </section>
                    );
                }
                return null;
            })}
        </div>
    );
}

export default Home;