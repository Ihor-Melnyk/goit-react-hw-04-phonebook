import style from './ContactItem.module.scss';
import PropTypes from 'prop-types';

const ContactItem = ({ id, name, number, onDeleteContact }) => {
  return (
    <li className={style.item}>
      {name}: <span>{number}</span>
      <button
        type="button"
        className={style.btn}
        onClick={() => onDeleteContact(id)}
      >
        Delete
      </button>
    </li>
  );
};

export default ContactItem;

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
