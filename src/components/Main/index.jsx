import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import ReactInputMask from 'react-input-mask';

import logo from '../../assets/logo.svg';

import styles from './styles.module.scss';

import { SubmitButton } from '../SubmitButton';
import { getUnformattedFone } from '../../utils/getUnformattedPhone';

export function Main () {
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    name: '',
    phone: '',
    message: ''
  });

  function handleInputChange (event) {
    const value = event.target.value;

    setState({ ...state, [event.target.name]: value });
  }

  async function handleSubmit (event) {
    event.preventDefault();

    try {
      setIsLoading(true);

      const requestData = {
        phone: getUnformattedFone(state.phone),
        message: state.name ? `${state.name.toUpperCase()}: ${state.message}` : state.message
      };

      await axios.post('https://sistemas-hm.equatorialenergia.com.br/bff-sendgrid-mkm/api/sms', requestData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      Swal.fire('Envio de torpedo', 'Sua mensagem foi enviada com sucesso!', 'success');
    } catch {
      Swal.fire('Envio de torpedo', 'Ocorreu um erro no envio da mensagem', 'error');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className={styles.container}>
      <div className={styles.title}>
        <img src={logo} alt="Oi torpedo grátis" />
        <h1>Oi Torpedo <br />Grátis</h1>
      </div>

      <form autoComplete="off" onSubmit={event => handleSubmit(event)}>
        <input
          type="text"
          name="name"
          placeholder="Digite o seu nome ou apelido"
          value={state.name}
          onChange={event => handleInputChange(event)}
        />

        <ReactInputMask
          type="text"
          name="phone"
          mask="(99) 99999-9999"
          placeholder="Digite o telefone"
          value={state.phone}
          onChange={event => handleInputChange(event)}
          required
        />

        <textarea
          name="message"
          placeholder="Digite a mensagem"
          cols="30" rows="10"
          value={state.message}
          onChange={event => handleInputChange(event)}
          required
        />

        <SubmitButton title="Enviar torpedo" isLoading={isLoading} />
      </form>
    </main>
  );
}