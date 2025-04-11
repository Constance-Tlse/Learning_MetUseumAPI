import { PaintingProps } from "../services/types";

function Paint ({paint}: PaintingProps) {
    const {img, title, description} = paint

    return <>
        <section>
        <img src={img} alt={title} />
        <h2>{title}</h2>
        <p>{description}</p>
        </section>
    </>
}

export default Paint