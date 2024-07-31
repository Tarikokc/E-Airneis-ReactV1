import React, { useState } from 'react';
import "../css/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverErrors, setServerErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("Form submission started"); 
  
    setIsLoading(true);
    setServerErrors({}); 
  
    try {
      console.log("Sending data to the server:", formData);
  
      const response = await fetch('http://localhost:8000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
        console.log("Server responded with success");
        setSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const data = await response.json();
        console.log("Server responded with errors:", data);
        if (data.error) {
          setServerErrors(data.error); 
        } else {
          setServerErrors({ general: 'Une erreur est survenue lors de l\'envoi du message.' });
        }
      }
    } catch (error) {
      console.error("Network error occurred:", error);
      setServerErrors({ general: 'Erreur réseau. Veuillez réessayer.' });
    } finally {
      setIsLoading(false);
      console.log("Form submission finished"); 
    }
  };
  

  return (
    <div className='contact'>
      <div className='container'>
        <div className='form'>
          <h2>Contactez-nous</h2>
          <form className='contact-form' method='POST' onSubmit={handleSubmit}> 
            <div className='box'>
              <div className='label'>
                <h3>Nom*</h3>
              </div>
              <div className='input'>
                <input type='text' placeholder='Nom' value={formData.name} name='name' onChange={handleChange} />
                {serverErrors.name && <p className="error">{serverErrors.name}</p>} 
              </div>
            </div>

            <div className='box'>
              <div className='label'>
                <h3>E-mail*</h3>
              </div>
              <div className='input'>
                <input type='email' placeholder='E-mail' value={formData.email} name='email' onChange={handleChange} />
                {serverErrors.email && <p className="error">{serverErrors.email}</p>}
              </div>
            </div>

            <div className='box'>
              <div className='label'>
                <h3>Sujet*</h3>
              </div>
              <div className='input'>
                <input type='text' placeholder='Sujet' value={formData.subject} name='subject' onChange={handleChange} />
                {serverErrors.subject && <p className="error">{serverErrors.subject}</p>}
              </div>
            </div>

            <div className='box'>
              <div className='label'>
                <h3>Message*</h3>
              </div>
              <div className='input'>
                <textarea placeholder='Message' value={formData.message} name='message' onChange={handleChange} />
                {serverErrors.message && <p className="error">{serverErrors.message}</p>}
              </div>
            </div>
            

            <button type='submit' disabled={isLoading}>
              {isLoading ? 'Envoi...' : 'Envoyer'}
            </button>

            {isLoading && <p>Envoi en cours...</p>}
            {success && <p className="success">Message envoyé avec succès !</p>}
            {serverErrors.general && <p className="error">{serverErrors.general}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
