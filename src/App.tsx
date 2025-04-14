import { Link, Outlet } from "react-router";
import React, {useCallback, useEffect, useState} from "react";
import DataLivret from "../contexts/DataLivret";
import { PaintingProps } from "../services/types";
import "./App.css";
import useSWR from "swr";



function App() {
    const [DataOuverture, setDataOuverture] = useState<PaintingProps[]>([]);
    const theme = 'Hokusai';
    const searchUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${theme}`;

    const { data: searchData, error: searchError } = useSWR<{ objectIDs: number[] }>(searchUrl, async (url) => {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(` ${url} ${response.status}`);
            }
            return await response.json();
        },
        {
            revalidateOnFocus: false,
            shouldRetryOnError: false,
            revalidateIfStale: true,
        }
    );

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

    return (
        <DataLivret.Provider value={{ DataOuverture, setDataOuverture }}>
            <nav>
                <Link to="/">L'index</Link>
                <Link to="/+">Aller plus loin</Link>
            </nav>
            <main>
                <Outlet />
            </main>
        </DataLivret.Provider>
    );
}

export default App;