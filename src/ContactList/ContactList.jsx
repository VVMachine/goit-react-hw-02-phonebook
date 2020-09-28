import React from "react";
import PropTypes from "prop-types";

export default function ContactList({ contactsList, deleteHandler }) {
  return (
    <ul className="contactsLits">
      {contactsList.map((contact) => {
        return (
          <li key={contact.id}>
            <div>
              <span>
                {contact.name}: {contact.number}
              </span>
              <button
                type="button"
                name="delete"
                onClick={() => deleteHandler(contact.id)}
              >
                Delete
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

ContactList.defaultProps = {
  contactsList: [],
  deleteHandler: () => {
    return;
  },
};

ContactList.propTypes = {
  contactsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
