import * as React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { appAPI } from '../../app/apiConn';
import { ErrorMessage } from '../../app/types/error';
import { User } from '../../app/types/user';

const RegisterPage: React.FC = () => {
  // Set the Browser History
  const history = useHistory();
  
  // Set the States
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [error, setError] = useState<string>();
  
  // Handle Email Method
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = (e.target as HTMLInputElement).value;
    setEmail(email);
  }

  // Handle Password Method
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = (e.target as HTMLInputElement).value;
    setPassword(password);
  }

  // Handle FirstName Method
  const handleFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const firstName = (e.target as HTMLInputElement).value;
    setFirstName(firstName);
  }

  // Handle LastName Method
  const handleLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lastName = (e.target as HTMLInputElement).value;
    setLastName(lastName);
  }

  // Create Account Method
  const createAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent Default Submit Behaviour
    e.preventDefault();

    // Build the Account Object
    const account: User = {
      email: email,
      password: password,
      first_name: firstName,
      last_name: lastName
    }

    // Send the API Request
    await appAPI.post("/account", account).then(res => {
      // Redirect to the Login Page
      history.push('/auth/login');
    }).catch(error => {
      // Get the Error Box Element
      let errorBox = document.getElementById("registration-error") as HTMLElement;
      
      // Check if we got an error response
      if (error.response) {
        // Handle the error in here
        let errorMsg: ErrorMessage = error.response.data;
        setError(errorMsg.message);
        errorBox.classList.remove("hidden");
      }
    });
  }

  // Render Method
  return(
    <div className="registration-page">
      <form action="/auth/create-account" method="post" onSubmit={createAccount}>
        <h1>Create Account</h1>
        <p id="registration-error" className="notification error hidden">{error}</p>
        <div className="register-form-grid-container">
          <p>
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" autoComplete="Off" onChange={handleEmail} />
          </p>
          <p>
            <label htmlFor="confirm-email">Confirm Email</label>
            <input type="email" id="confirm-email" name="confirm_email" autoComplete="Off" />
          </p>
          <p>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" autoComplete="Off" onChange={handlePassword} />
          </p>
          <p>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" name="confirm_password" autoComplete="Off" />
          </p>
          <p>
            <label htmlFor="first-name">First Name</label>
            <input type="text" id="first-name" name="first_name" autoComplete="Off" onChange={handleFirstName} />
          </p>
          <p>
            <label htmlFor="last-name">Last Name</label>
            <input type="text" id="last-name" name="last_name" autoComplete="Off" onChange={handleLastName} />
          </p>
          <p>
            <button className="primary">Create Account</button>
          </p>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;