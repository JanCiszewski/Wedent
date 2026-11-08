import { ButtonLink } from "../ui/Button"
import "./Header.css"

export default function Hero() {
    return (
            <section className="hero">
                <h1>Wedent</h1>
                <p>Stomatologia na wyższym poziomie</p>
                <ButtonLink shape="rounded" variant="primary" href="#booking">
                    Umów wizyte!
                </ButtonLink>
            </section>
    )
}