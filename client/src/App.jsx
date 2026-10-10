import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
// import './App.css'

function Input({name, value, onChange}){
  return <input name={name} value={value} onChange={onChange}></input>
}


function App() {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });

  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  
  function handleChange(event) {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value
      })
    }

  function handleSubmit(event) {
    event.preventDefault()
    if(!formData.firstName || !formData.lastName) {
      setError("Pole jest puste");
    } else {
      setError("");
      setIsLoading(true);
      setTimeout(() => {setIsLoading(false)}, 5000);
    }

  }

  return (
    <>
      <h1>Uzupełnij formularz</h1>
      <form onSubmit={handleSubmit}>
        <Input name="firstName" value={formData.firstName} onChange={handleChange}></Input>
        <Input name="lastName" value={formData.lastName} onChange={handleChange}></Input>
        <Input name="email" value={formData.email} onChange={handleChange}></Input>
        <button type='submit' disabled={isLoading}>Wyślij</button>
        <p>{error}</p>
        {isLoading && <p>Wysyłanie...</p>}
      </form>

      <p>Nazywasz się: {formData.firstName + ' ' + formData.lastName} i twój email to: {formData.email}</p>
    </>
  )
}

export default App
