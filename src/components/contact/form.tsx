import React, { FormEvent } from "react";

import emailjs from "@emailjs/browser";

import MailIcon from "../icons/mail";
import SendIcon from "../icons/send";
import { validateEmail, validateMessage } from "../../utils/validation";

enum FormState {
  Idle = 0,
  Processing,
  Successful,
  Error,
}

enum FormInput {
  Email = "reply_to",
  Message = "message",
}

const ContactForm = () => {
  const form = React.useRef<HTMLFormElement>(null);
  const [fState, setFState] = React.useState(FormState.Idle);
  const [errMessage, setErrorMessage] = React.useState({
    [FormInput.Email]: "",
    [FormInput.Message]: "",
  });

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();
    let hasError = Object.keys(errMessage).some((k: string) => {
      return errMessage[k as FormInput] !== "";
    });
    if (hasError) {
      return;
    }
    setFState(FormState.Processing);
    emailjs
      .sendForm(
        process.env.GATSBY_EMAIL_SERVICE_ID!,
        process.env.GATSBY_EMAIL_TEMPLATE_ID!,
        form.current!,
        process.env.GATSBY_EMAIL_PUBLIC_KEY!
      )
      .then(
        () => {
          setFState(FormState.Successful);
        },
        () => {
          setFState(FormState.Error);
        }
      );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let err;
    switch (e.target.name) {
      case FormInput.Email:
        err = validateEmail(e.target.value.trim());
        setErrorMessage({
          ...errMessage,
          [FormInput.Email]: err ? err.message : "",
        });
        break;
      case FormInput.Message:
        err = validateMessage(e.target.value.trim());
        setErrorMessage({
          ...errMessage,
          [FormInput.Message]: err ? err.message : "",
        });
        break;
      default:
        break;
    }
  };

  switch (fState) {
    case FormState.Processing:
      return (
        <svg
          aria-hidden="true"
          className="w-10 h-10 mr-2 text-gray-300 animate-spin fill-brand-900"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      );
    case FormState.Successful:
    case FormState.Error:
      return (
        <div
          className="p-4 mb-4 w-full text-slate-600 dark:text-gray-200"
          role="alert"
        >
          <div className="flex items-center">
            <svg
              aria-hidden="true"
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              ></path>
            </svg>
            {fState === FormState.Error ? (
              <h3 className="text-lg font-medium">
                Uh-oh! Something went wrong :(
              </h3>
            ) : (
              <h3 className="text-lg font-medium">Message sent!</h3>
            )}
          </div>
          {fState === FormState.Error ? (
            <div className="mt-6 mb-4 text-sm">
              Don't worry, you can still contact me on social media.
            </div>
          ) : (
            <div className="mt-6 mb-4 text-sm">
              Please keep an eye out for a reply to your inbox as soon as I
              receive your message.
            </div>
          )}
        </div>
      );
    default:
      return (
        <form onSubmit={sendEmail} ref={form}>
          <div className="contact-section-form-input-container">
            <label htmlFor="email-address-input" className="hide">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MailIcon />
              </div>
              <input
                name="reply_to"
                type="email"
                id="email-address-input"
                className="block w-full pl-10 p-2.5 bg-gray-50 border rounded-lg border-gray-300 focus:outline-none focus:border-brand-500 dark:bg-slate-900 dark:border-gray-700 dark:placeholder-gray-400  dark:focus:border-brand-700"
                placeholder="email address"
                onBlur={handleChange}
                onChange={handleChange}
              />
            </div>
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {errMessage[FormInput.Email]
                ? `${errMessage[FormInput.Email]}`
                : ""}
            </p>
          </div>
          <div className="w-full contact-page-section-form-input-container">
            <label htmlFor="email-content-input" className="hide">
              Content
            </label>
            <textarea
              name="message"
              id="email-content-input"
              rows={4}
              className="block p-2.5 w-full text-sm bg-gray-50 border rounded-lg border-gray-300 focus:outline-none focus:border-brand-500 dark:bg-slate-900 dark:border-gray-700 dark:placeholder-gray-400  dark:focus:border-brand-700"
              placeholder="write your thoughts here.."
              onBlur={handleChange}
              onChange={handleChange}
            ></textarea>
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {errMessage[FormInput.Message]
                ? `${errMessage[FormInput.Message]}`
                : ""}
            </p>
          </div>
          <button
            type="submit"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            className="inline-flex items-center bg-brand-800 dark:bg-brand-800 hover:bg-brand-900 dark:hover:bg-brand-900 focus:bg-brand-900 dark:focus:bg-brand-900 text-white uppercase rounded-lg border-gray-300 focus:outline-none focus:border-brand-500 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:border-brand-500"
          >
            <SendIcon />
            Send message
          </button>
        </form>
      );
  }
};

export default ContactForm;
