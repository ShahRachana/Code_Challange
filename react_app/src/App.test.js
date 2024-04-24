import { render,fireEvent, screen } from '@testing-library/react';
import App from './App';
import Login from './Component/Login';
// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
describe('Login', () => {
  test('validates email input', () => {
render(<Login/>);
    const emailInput = screen.getByLabelText('Email:');

    // Invalid email format
    fireEvent.change(emailInput, { target: { value: 'invalid_email' } });
    expect(screen.queryByText('Please enter a valid email address.')).toBeInTheDocument();

    // Valid email format
    fireEvent.change(emailInput, { target: { value: 'testvalid@email.com' } });
    expect(screen.queryByText('Please enter a valid email address.')).not.toBeInTheDocument();
  });

  test('validates password input', () => {
    render(<Login/>);
    const passwordInput = screen.getByLabelText('Password:');
    // Invalid password (less than 6 characters)
    fireEvent.change(passwordInput, { target: { value: '12345' } });
    expect(screen.queryByText('Password must be at least 6 characters long.')).toBeInTheDocument();

    // Valid password (at least 6 characters)
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    expect(screen.queryByText('Password must be at least 6 characters long.')).not.toBeInTheDocument();
  });
});