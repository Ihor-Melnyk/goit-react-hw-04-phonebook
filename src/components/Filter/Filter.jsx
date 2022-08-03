import style from './Filter.module.scss';
import PropTypes from 'prop-types';
import { IoIosSearch } from 'react-icons/io';

const Filter = ({ value, onChange }) => {
  return (
    <label className={style.label} htmlFor="">
      {<IoIosSearch />} Find contacts by name
      <input
        className={style.input}
        type="text"
        placeholder="find contact"
        value={value}
        onChange={onChange}
      />
    </label>
  );
};
export default Filter;

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
