import ServiceCard from "../ui/ServiceCard";

export const services = [
            {
                id: 1,
                name: "Ortodoncja",
                slug: "ortodoncja",
                shortDesc: "Ortodoncja opis krótki",
                fullDesc: "Ortodoncja opis długi"
            },
            {
                id: 2,
                name: "Implanty",
                slug: "implanty",
                shortDesc: "Implanty opis krótki",
                fullDesc: "Implanty opis długi"
            },
            {
                id: 3,
                name: "Protetyka",
                slug: "protetyka",
                shortDesc: "Protetyka opis krótki",
                fullDesc: "Protetyka opis długi"
            },
            {
                id: 4,
                name: "Wybielanie zębów",
                slug: "wybielanie-zebow",
                shortDesc: "Wybielanie zębów opis krótki",
                fullDesc: "Wybielanie zębów opis długi"
            },
            {
                id: 5,
                name: "Stomatologia estetyczna",
                slug: "stomatologia-estetyczna",
                shortDesc: "Stomatologia estetyczna opis krótki",
                fullDesc: "Stomatologia estetyczna opis długi"
            },
            {
                id: 6,
                name: "Mikroskop",
                slug: "mikroskop",
                shortDesc: "Mikroskop opis krótki",
                fullDesc: "Mikroskop opis długi"
            },
            {
                id: 7,
                name: "Konsultacja",
                slug: "konsultacja",
                shortDesc: "Konsultacja Stomatologiczna",
                fullDesc: "Konsultacja opis długi"
            }];


export default function Services() {

    return (
        <section className="service-grid">
            {services.map(service => (<ServiceCard key={service.id} service={service} />))}
        </section>
        
    )
         
}