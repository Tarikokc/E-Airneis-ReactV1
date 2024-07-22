import React, { useState } from 'react';
import "../css/Contact.css";
// import ReCAPTCHA from "react-google-recaptcha";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverErrors, setServerErrors] = useState({}); // Erreurs du serveur

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setServerErrors({}); 

    try {
      const response = await fetch('http://localhost:8000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const data = await response.json();
        if (data.error) {
          setServerErrors(data.error); 
        } else {
          setServerErrors({ general: 'Une erreur est survenue lors de l\'envoi du message.' });
        }
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
      setServerErrors({ general: 'Erreur réseau. Veuillez réessayer.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className='contact'>
        <div className='container'>
          <div className='form'>
            <h2>Contactez-nous</h2>
            <form method='POST' onSubmit={handleSubmit}> 
              <div className='box'>
                <div className='label'>
                  <h4>Nom*</h4>
                </div>
                <div className='input'>
                  <input type='text' placeholder='Nom' value={formData.name} name='name' onChange={handleChange} />
                  {serverErrors.name && <p className="error">{serverErrors.name}</p>} 
                </div>
              </div>

              <div className='box'>
                <div className='label'>
                  <h4>E-mail*</h4>
                </div>
                <div className='input'>
                  <input type='email' placeholder='E-mail' value={formData.email} name='email' onChange={handleChange} />
                  {serverErrors.email && <p className="error">{serverErrors.email}</p>}
                </div>
              </div>

              <div className='box'>
                <div className='label'>
                  <h4>Sujet*</h4>
                </div>
                <div className='input'>
                  <input type='text' placeholder='Sujet' value={formData.subject} name='subject' onChange={handleChange} />
                  {serverErrors.subject && <p className="error">{serverErrors.subject}</p>}
                </div>
              </div>

              <div className='box'>
                <div className='label'>
                  <h4>Message*</h4>
                </div>
                <div className='input'>
                  <textarea placeholder='Message' value={formData.message} name='message' onChange={handleChange} />
                  {serverErrors.message && <p className="error">{serverErrors.message}</p>}
                </div>
              </div>
              
              {/* Le composant ReCAPTCHA doit être adapté à votre configuration spécifique
              <ReCAPTCHA 
                sitekey="VOTRE_CLE_SITE_RECAPTCHA"
                onChange={(value) => {
                  // Gérez la valeur de reCAPTCHA ici (si nécessaire)
                }}
              /> */}

              <button type='submit' disabled={isLoading}>
                {isLoading ? 'Envoi...' : 'Envoyer'}
              </button>

              {/* Affichage des messages d'état */}
              {isLoading && <p>Envoi en cours...</p>}
              {success && <p className="success">Message envoyé avec succès !</p>}
              {serverErrors.general && <p className="error">{serverErrors.general}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
