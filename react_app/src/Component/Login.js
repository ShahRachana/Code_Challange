import { useRef, useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const baseUrl = process.env.REACT_APP_BASE_URL;
const Login = () => {
    const navigate=useNavigate();
    const userRef = useRef();
    const errRef = useRef();
    const [email, setEmail] = useState('');
    const [password, setPwd] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [errMsg, setErrMsg] = useState('');
    let isValid=true;

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    const handleEmailChange = (event) => {
      const newEmail = event.target.value;
      setEmail(newEmail);
      // Validate email format
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail);
      setIsValidEmail(isValid);
    };
  
    const handlePasswordChange = (event) => {
      const newPassword = event.target.value;
      setPwd(newPassword);
      // Validate password length (at least 6 characters)
       isValid = newPassword.length >= 6;
      setIsValidPassword(isValid);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = Array.from(e.target.elements)
      .filter((input) => input.id)
      .reduce((obj, input) => Object.assign(obj, { [input.id]: input.value }), {});
      
      const fetchData = async (data) => {
        try {
            const response = await axios.post(baseUrl+'/auth/login',data);
            
            if(response.status===200)
            {
              const userData = response.data;
              // Store user data in local storage or state (e.g., Redux, Context API)
             localStorage.setItem('user', JSON.stringify(userData));
            /*Can store Token*/
            // const accessToken = response?.data?.accessToken;
            // localStorage.setItem('auth-token', JaccessToken);
             setEmail('');
             setPwd('');
             navigate("/myprofile");
            }
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Email or Password');
            } else if (err.response?.status === 404) {
                setErrMsg('Email or Password Not Found')
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            }
            else {
                setErrMsg('Login Failed');
            }
          }
        }
        //errRef.current.focus();
        fetchData(data);
     }

    return (
        <>
              <div className='d-flex justify-content-center align-items-center'>
        <div className='bg-white p-3 rounded w-25'>

                <section>
                    <p style={{ color: 'red' }} ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email">Email:</label>
                        <input
                           className='form-control rounded-0'
                            type="text"
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={handleEmailChange}
                            value={email}
                            required
                        />
                      {!isValidEmail && (
                        <p style={{ color: 'red' }}>Please enter a valid email address.</p>
                      )}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password">Password:</label>
                        <input
                           className='form-control rounded-0'
                            type="password"
                            id="password"
                            onChange={handlePasswordChange}
                            value={password}
                            required
                        />
                    {!isValidPassword && (
                      <p style={{ color: 'red' }}>'Password must be at least 6 characters long.'</p>
                    )}
                    </div>
                     <button type="submit" className='btn btn-success w-100 rounded-0'>Sign In</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className='w-100 rounded-0 text-decoration-none'>
                            <a   href="/signup">Sign Up</a>
                        </span>
                    </p>
                </section>
                </div></div>
        </>
    )
}

export default Login
