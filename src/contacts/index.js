import React from 'react';
import github from '../assets/github.png';
import linkedin from '../assets/linkedin.png';

const ContactsCard = () => (
  <div
    className="modal fade"
    id="contactcard"
    tabIndex="-1"
    role="dialog"
    aria-labelledby="contactcardtitle"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-body">
          <div className="list-group">
            <a
              href="https://github.com/rishichawda"
              className="list-group-item list-group-item-action flex-column align-items-start my-2 animated fadeIn"
            >
              <div className="d-flex w-100 justify-content-between">
                <div className="card-body py-0 pl-5 lead">
                  <img
                    className="mr-5"
                    src={github}
                    width="30"
                    height="30"
                    alt=""
                  />
                  {' '}
                  Github
                </div>
                <small className="text-muted">View GitHub profile.</small>
              </div>
            </a>
            <a
              href="https://www.linkedin.com/in/rkrishi"
              className="list-group-item list-group-item-action flex-column align-items-start my-2 animated fadeIn"
            >
              <div className="d-flex w-100 justify-content-between">
                <div className="card-body py-0 pl-5 lead">
                  <img
                    className="mr-5"
                    src={linkedin}
                    width="30"
                    height="30"
                    alt=""
                  />
                  {' '}
                  LinkedIn
                </div>
                <small className="text-muted">View LinkedIn profile.</small>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ContactsCard;
