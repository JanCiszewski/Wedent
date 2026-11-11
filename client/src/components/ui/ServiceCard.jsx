import {Button} from "../ui/Button";
import { useState } from "react";

export default function ServiceCard ({service}) {
    const [isExtended, setIsExtended] = useState(false);

    const showMore = () => {
        isExtended ? setIsExtended(false) : setIsExtended(true);
    }

    return (
        <div>
            <h3>{service.name}</h3>
            <p>{isExtended ? service.fullDesc : service.shortDesc}</p>
            <Button shape="rounded" variant="primary" onClick={showMore}>{isExtended ? "Czytaj mniej" : "Czytaj więcej"}</Button>
        </div>
    )
}