import { useContext } from 'react';
import DataLivret from "../contexts/DataLivret";

function Home() {
    const { DataOuverture } = useContext(DataLivret)!;

    const art1 = DataOuverture?.find(art => art.objectID === 39799);


    console.log(DataOuverture)

    return (
<>
        <div>
            {art1 && (
                <section className="table h-[20vh] w-[20vw]">
                    <img src={art1.primaryImageSmall} style={{ width: "100%" }} alt={art1.title} />
                    <h3>{art1.title}</h3>
                    <p>{art1.artistAlphaSort}</p>
                </section>
            )}
        </div>


        <div className="grid grid-cols-3 gap-12">
            {DataOuverture?.map((art) => {
                if (art.primaryImageSmall) {
                    return (
                        <section key={art.objectID} className="table h-[20vh] w-[20vw]">
                            <img src={art.primaryImageSmall} style={{ width: "100%" }} alt={art.title} />
                            <h3>{art.objectID}</h3>
                        </section>
                    );
                }
                return null;
            })}
        </div>
</>
    );
}

export default Home;