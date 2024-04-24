import { useRef, useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;
function Signup() {
    const navigate=useNavigate();
        const [setValues]=useState({
            firstname:'',
            lastname:'',
            email:'',
            password:''
        })
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
                        const response = await axios.post(baseUrl+'/auth/signup',data);
                        if(response.status===200)
                        {
                        const userData = response.data;
                        //Setting into local storage    
                        localStorage.setItem('user', JSON.stringify(userData));
                        
                        //Navigate to my profile    
                        navigate("/myprofile");
                        }
                    } catch (err) {
                        if (!err?.response) {
                            setErrMsg('No Server Response');
                        } else if (err.response?.status === 400) {
                            setErrMsg('Email already exist');
                        } else if (err.response?.status === 401) {
                            setErrMsg('Unauthorized');
                        }
                        else {
                            setErrMsg('Sign up Failed');
                        }
                    }finally
                    {
                        setValues({
                            firstname:"",
                            lastname:"",
                            email:"",
                            password:""
                          })
                    }
                }
        //errRef.current.focus();
        fetchData(data);
     }

  return (
    <div className='d-flex justify-content-center align-items-center'>
    <div className='bg-white p-3 rounded w-25'>
    <h2>Sign up Form</h2>
        <form onSubmit={handleSubmit}> 
        <div className='mb-3'>
            <label htmlFor="firstname"><strong>First Name</strong></label>
            <input type="firstname" name="firstname" placeholder='Enter First Name' id="firstname" className='form-control rounded-0'></input>
        </div>
        <div className='mb-3'>
            <label htmlFor="lastname"><strong>Last Name</strong></label>
            <input type="lastname" name="lastname" placeholder='Enter Last Name' id="lastname" className='form-control rounded-0'></input>
        </div>
        <div className='mb-3'>
            <label htmlFor="email"><strong>Email</strong></label>
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
            <label htmlFor="password"><strong>Password</strong></label>
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
        <p  style={{ color: 'red' }} ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <button type="submit" className='btn btn-success w-100 rounded-0'><strong>Sign up</strong></button>
        <p></p>
        <a href="/" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'> <strong>Log in </strong></a>
        </form>
    </div>
</div>
  )
}

export default Signup