function paint(DataLivret) {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "auto auto auto", gridGap: "50px" }}>
            {DataLivret && DataLivret.map((art) => (
                <section key={art.objectID}>
                    <img src={art.primaryImageSmall} style={{ width: "100%" }} />
                    <h3>{art.artistAlphaSort}</h3>
                    <p>{art.objectDate} {art.medium}</p>
                    <p>{art.department}</p>
                    <p>blablabla</p>
                </section>
            ))}
        </div>
    );

}

export default paint;