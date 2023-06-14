import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

import IconArrow from '../../../../assets/images/icons/arrow.svg';
import IconEdit from '../../../../assets/images/icons/edit.svg';
import IconTrash from '../../../../assets/images/icons/trash.svg';

import { Card, ListHeader } from './styles';

export default function ContactList({
  filteredContacts,
  orderBy,
  onToggleOrderBy,
  onDeleteContact,
}) {
  return (
    <>
      {!!filteredContacts?.length && (
      <ListHeader orderBy={orderBy}>
        <button type="button" onClick={onToggleOrderBy}>
          <span>Nome</span>
          <img src={IconArrow} alt="Seta" />
        </button>
      </ListHeader>
      )}

      {filteredContacts?.map((contact, i) => (
        <Card
          key={contact?.id}
          timeAnimation={((i + 1) * 200) > 1500 ? 1500 : ((i + 1) * 200)}
        >
          <div className="info">
            <div className="contact-name">
              <strong>{contact?.name}</strong>
              {contact?.category?.name && <small>{contact?.category?.name}</small>}
            </div>

            <span>{contact?.email}</span>
            <span>{contact?.phone}</span>
          </div>

          <div className="actions">
            <Link to={'/edit/' + contact.id}>
              <img src={IconEdit} alt="Edit" />
            </Link>

            <button type="button" onClick={() => onDeleteContact(contact)}>
              <img src={IconTrash} alt="Trash" />
            </button>
          </div>
        </Card>
      ))}

    </>
  );
}

ContactList.propTypes = {
  filteredContacts: propTypes.arrayOf(propTypes.shape({
    id: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    email: propTypes.string,
    phone: propTypes.string,
    category: propTypes.shape({
      name: propTypes.string,
    }),
  })).isRequired,
  orderBy: propTypes.string.isRequired,
  onToggleOrderBy: propTypes.func.isRequired,
  onDeleteContact: propTypes.func.isRequired,
};
