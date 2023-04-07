import { useState } from 'react';
import css from './ContactForm.module.css';

export const ContactForm = ({ onAdd, checkName }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChangeForm = ({ target }) => {
    const { name, value } = target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    const isSuccess = onAdd({ name, number });
    if (isSuccess) {
      reset();
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleFormSubmit} className={css.form}>
      <label> Name </label>
      <input
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={handleChangeForm}
      />
      <label> Phone </label>
      <input
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={handleChangeForm}
      />
      <button type="submit">Add Contact</button>
    </form>
  );
};
