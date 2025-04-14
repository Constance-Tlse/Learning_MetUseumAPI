import { useContext } from 'react';
import DataLivret from "../contexts/DataLivret.tsx";

export function Paint() {
    const { DataOuverture } = useContext(DataLivret)!;

    return (
        <div className="grid grid-cols-3 gap-12">
            {DataOuverture?.map((art) => {
                if (art.primaryImageSmall) {
                    return (
                        <section key={art.objectID} className="table h-[20vh] w-[20vw]">
                            <img src={art.primaryImageSmall} style={{ width: "100%" }} alt={art.title} />
                            <h3>{art.artistAlphaSort}</h3>
                            <p>{art.objectDate} {art.medium}</p>
                            <p>{art.department} - {art.objectID}</p>
                        </section>
                    );
                }
                return null;
            })}
        </div>
    );
}


export default Paint;