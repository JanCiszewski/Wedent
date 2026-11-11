import { useState } from "react";
import { FormInput } from "../ui/Input";
import { services } from "./Services";
import {Button} from "../ui/Button";

const inputFields = [
    {
        name: "patientName",
        type: "text",
        label: "Imię",
        placeholder: "Jan",
        required: true
    },
    {
        name: "patientLastName",
        type: "text",
        label: "Nazwisko",
        placeholder: "Kowalski",
        required: true
    },
    {
        name: "email",
        type: "email",
        label: "Adres e-mail",
        placeholder: "email@poczta.pl",
        required: true
    },
    {
        name: "phoneNumber",
        type: "tel",
        label: "Numer Telefonu",
        placeholder: "123456789",
        required: true
    }
];

export default function BookingContact() {
    const [formData, setFormData] = useState({
    patientName: "",
    patientLastName: "",
    email: "",
    phoneNumber: "",
    service: "",
    date: "",
    time: "",
    notes: ""
})

const [message, setMessage] = useState("");
const [error, setError] = useState("");

function handleChange(event) {
    setFormData(prev => ({... prev, [event.target.name]: event.target.value}));
}

async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setError("");
    const { time, ...appointmentData } = formData;
    appointmentData.date = `${formData.date}T${time}:00`;
    try{
        const response = await fetch("/api/appointments", {
            method: "POST",
            body: JSON.stringify(appointmentData),
            headers: {"Content-Type": "application/json"}
        })
        if(!response.ok){
            const data = await response.json();
            setError(data.message);
            return
        }
        const data = await response.json();
        setMessage(data.message);
        
    } catch(error) {
        setError("Nie udało się połączyć z serwerem. Spróbuj ponownie.");
        console.error(error)
    }
   
}

    return (
        <section id="booking">
            <form onSubmit={handleSubmit}>
                {inputFields.map(field => <FormInput id={field.name} key={field.name} {...field} value={formData[field.name]} onChange={handleChange} />)}
                
                <label htmlFor="service">Wybierz rodzaj usługi</label>
                <select name="service" id="service" value={formData.service} onChange={handleChange} required>
                    <option value="">Wybierz usługę</option>
                    {services.map(service => <option key={service.id} value={service.slug}>{service.name}</option>)}
                </select>
                
                <label htmlFor="date">Wybierz datę usługi</label>
                <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} required/>
                
                <label htmlFor="time">Wybierz godzinę usługi</label>
                <input type="time" name="time" id="time" value={formData.time} onChange={handleChange} required/>

                <label htmlFor="notes">Wpisz notatki do wizyty (opcjonalne)</label>
                <textarea name="notes" id="notes" value={formData.notes} onChange={handleChange} placeholder="Czy są jakieś dodatkowe informacje, które powinniśmy znać?"/>
                
                <Button type="submit" shape="rounded" variant="primary" >Wyślij</Button>
            </form>
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
            <pre>{JSON.stringify(formData, null, 2)}</pre>  
        </section>
    )
}