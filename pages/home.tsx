import React, { useState, useEffect, useCallback } from 'react';
import useSWR from 'swr';
import {Paint} from "../components/painting.tsx";

function Home() {


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