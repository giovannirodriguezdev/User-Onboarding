// ❗ The ✨ TASKS inside this component are NOT IN ORDER.
// ❗ Check the README for the appropriate sequence to follow.
import React, { useState, useEffect } from 'react'


const e = { // This is a dictionary of validation error messages.
  // username
  usernameRequired: 'username is required',
  usernameMin: 'username must be at least 3 characters',
  usernameMax: 'username cannot exceed 20 characters',
  // favLanguage
  favLanguageRequired: 'favLanguage is required',
  favLanguageOptions: 'favLanguage must be either javascript or rust',
  // favFood
  favFoodRequired: 'favFood is required',
  favFoodOptions: 'favFood must be either broccoli, spaghetti or pizza',
  // agreement
  agreementRequired: 'agreement is required',
  agreementOptions: 'agreement must be accepted',
}

// ✨ TASK: BUILD YOUR FORM SCHEMA HERE
// The schema should use the error messages contained in the object above.
const formSchema = {
  username: {
    required: true,
    minLength: 3,
    maxLength: 20,
  },
  faveLanguage: {
    required: true,
    options: ['javascript', 'rust'],
  },
  favFood: {
    required: true,
    options: ['broccoli', 'spaghetti', 'pizza'],
  },
  agreement: {
    required: true,
    value: true,
  },
};

export default function App() {
  // ✨ TASK: BUILD YOUR STATES HERE
  // You will need states to track (1) the form, (2) the validation errors,
  // (3) whether submit is disabled, (4) the success message from the server,
  // and (5) the failure message from the server.
  const [form, setForm] = useState({
    username: '',
    faveLanguage: '',
    favFood: '',
    agreement: false,
  });
  const [errors, setErrors] = useState({
    username: '',
    faveLanguage: '',
    favFood: '',
    agreement: '',
  });
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [failureMessage, setFailureMessage] = useState('');

  // ✨ TASK: BUILD YOUR EFFECT HERE
  // Whenever the state of the form changes, validate it against the schema
  // and update the state that tracks whether the form is submittable.
  const validate = (formData) => {
    const newErrors = { ...errors };

    if (formSchema.username.required && !formData.username.trim()) {
      newErrors.username = e.usernameRequired;
    } else if (formData.username.length < formSchema.username.minLength) {
      newErrors.username = e.usernameMin;
    } else if (formData.username.length > formSchema.username.maxLength) {
      newErrors.username = e.usernameMax;
    } else {
      newErrors.username = '';
    }

    if (formSchema.favFood.required && !formData.favFood) {
      newErrors.favFood = e.favFoodRequired;
    } else if (formSchema.favFood.options && !formSchema.favFood.options.includes(formData.favFood)) {
      newErrors.favFood = e.favFoodOptions;
    } else {
      newErrors.favFood = '';
    }

    if (formSchema.faveLanguage.required && !formData.faveLanguage) {
      newErrors.faveLanguage = e.favLanguageRequired;
    } else if (formSchema.faveLanguage.options && !formSchema.faveLanguage.options.includes(formData.faveLanguage)) {
      newErrors.faveLanguage = e.favLanguageOptions;
    } else {
      newErrors.faveLanguage = '';
    }

    if (formSchema.agreement.required && !formData.agreement) {
      newErrors.agreement = e.agreementRequired;
    } else if (formSchema.agreement.value !== undefined && formData.agreement !== formSchema.agreement.value) {
      newErrors.agreement = e.agreementOptions;
    } else {
      newErrors.agreement = '';
    }

    return newErrors;
  };

  useEffect (() => {
    const currentErrors = validate(form);
    setErrors(currentErrors);
    
    const hasErrors = Object.values(currentErrors).some(error => error !== '');
    setSubmitDisabled(hasErrors);
  }, [form]);

  const onChange = evt => {
    // ✨ TASK: IMPLEMENT YOUR INPUT CHANGE HANDLER
    // The logic is a bit different for the checkbox, but you can check
    // whether the type of event target is "checkbox" and act accordingly.
    // At every change, you should validate the updated value and send the validation
    // error to the state where we track frontend validation errors.
    const { name, value, type, checked } = evt.target;
    const newValue = type === 'checkbox' ? checked : value;
    setForm({ ...form, [name]: newValue});
  };

  const onSubmit = evt => {
    // ✨ TASK: IMPLEMENT YOUR SUBMIT HANDLER
    // Lots to do here! Prevent default behavior, disable the form to avoid
    // double submits, and POST the form data to the endpoint. On success, reset
    // the form. You must put the success and failure messages from the server
    // in the states you have reserved for them, and the form
    // should be re-enabled.
    evt.preventDefault();
    setSubmitDisabled(true);
    setSuccessMessage('');
    setFailureMessage('');

    try {
      console.log("Form data submitted:", form);

      setTimeout(() => {
        setSuccessMessage('Success! Welcome, new user!');
        setForm({ username: '', faveLanguage: '', favFood: '', agreement: false });
      }, 1000);

    } catch (error) {
      console.error('Submission error:', error);
      setFailureMessage('Sorry! An unexpected error occurred.');
      setSubmitDisabled(false);
    }
  };

  return (
    <div> {/* TASK: COMPLETE THE JSX */}
      <h2>Create an Account</h2>
      <form onSubmit={onSubmit}>
        {successMessage && <h4 className="success">{successMessage}</h4>}
       {failureMessage && <h4 className="error">{failureMessage}</h4>}

        <div className="inputGroup">
          <label htmlFor="username">Username:</label>
          <input id="username" name="username" type="text" placeholder="Type Username" value={form.username} onChange={onChange} />
          {errors.username && <div className="validation">{errors.username}</div>}
        </div>

        <div className="inputGroup">
          <fieldset>
            <legend>Favorite Language:</legend>
            <label>
              <input type="radio" name="faveLanguage" value="javascript" checked={form.faveLanguage === 'javascript'} onChange={onChange} />
              JavaScript
            </label>
            <label>
              <input type="radio" name="faveLanguage" value="rust" checked={form.faveLanguage === 'rust'} onChange={onChange} />
              Rust
            </label>
          </fieldset>
          {errors.faveLanguage && <div className="validation">{errors.faveLanguage}</div>}
        </div>

        <div className="inputGroup">
          <label htmlFor="favFood">Favorite Food:</label>
          <select id="favFood" name="favFood" value={form.favFood} onChange={onChange}>
            <option value="">-- Select Favorite Food --</option>
            <option value="pizza">Pizza</option>
            <option value="spaghetti">Spaghetti</option>
            <option value="broccoli">Broccoli</option>
          </select>
          {errors.favFood && <div className="validation">{errors.favFood}</div>}
        </div>

        <div className="inputGroup">
          <label>
            <input id="agreement" type="checkbox" name="agreement" checked={form.agreement} onChange={onChange} />
            Agree to our terms
          </label>
          {errors.agreement && <div className="validation">{errors.agreement}</div>}
        </div>

        <div>
          <input type="submit" disabled={submitDisabled} />
        </div>
      </form>
    </div>
  )
}
