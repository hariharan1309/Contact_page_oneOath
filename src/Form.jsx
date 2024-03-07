import { useState } from 'react';
import PropTypes from 'prop-types';

export default function Form({ setSentStatus }) {

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [mail, setMail] = useState('');
  const [pnum, setPnum] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot,setHoneypot]=useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSent,setIsSent]=useState(false);
  const [isError,setIsError]=useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'fname':
        setFname(value);
        break;
      case 'lname':
        setLname(value);
        break;
      case 'mail':
        setMail(value);
        break;
      case 'pnum':
        setPnum(value);
        break;
      case 'message':
        setMessage(value);
        break;
      default:
        break;
    }
  };

  function isValidMobileNumber(number) {
    const regex = /^[0-9]{10}$/;
    return regex.test(number);
  }
  function isValidEmail(email) {
    const regex = /^[a-zA-Z][a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  }
  function isValidName(name) {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(name);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyzWQPw7RlUI5Mxso66SDwqARK1e2kZR6QRXn8YvRrP7MR1_7blhl2qCuiYre8BgUlR/exec';
    if (honeypot) return;
    setIsLoading(true);
    const formDataToSend = new FormData();
    if((fname.length<=0) || (lname.length<=0) || (mail.length<=0) || (pnum.length<=0)){
      setIsError(true);

      setTimeout(() => {
        setIsLoading(false);
        setIsError(false)
      }, 2500);
      return;
    }
    formDataToSend.append('fname', fname);
    formDataToSend.append('lname', lname);
    formDataToSend.append('mail', mail);
    formDataToSend.append('pnum', pnum);
    formDataToSend.append('message', message);

    try {
      const response = await fetch(scriptURL, {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        console.log('Success');
        setIsSent(true)
        setTimeout(() => {
          setSentStatus(true);
        }, 2500);
      } else {
        console.error('Error');
      }
      
    } catch (error) {
      console.error('Error:', error);
    }

  };

  return (
    <div>
      <div className={`md:image-container ${isLoading?"opacity-80":""}`}>
        <form onSubmit={handleSubmit} className='purple-gradient hover:shadow-2xl shadow-purple-500 mx-10 box-border rounded-xl'>
          <div className='flex flex-col w-[400px] max-md:w-max mx-10 mt-10 px-5 *:form-container text-gray-800 box-border'>
            <div className='flex flex-row max-md:flex-col'>
              
              <span className='w-[120px]'>
                <label htmlFor="fname">First name <span className='text-red-700 font-bold'>*</span></label>
              </span>
              <input type="text" name="fname" id="fname" value={fname} onChange={handleInputChange} 
              />
            </div>

            <div className='flex flex-row max-md:flex-col'>
            <span className='w-[120px]'>
                <label htmlFor="lname">Last name <span className='text-red-700 font-bold'>*</span></label>
              </span>
              <input type="text" name="lname" id="lname" value={lname} onChange={handleInputChange}/>
              {!isValidName(lname) && lname.length > 0 ? (  <div className=' text-red-500 text-[10px] mt-2 px-1 font-sans z'>Enter a valid name</div>) : (null)}
            </div>

            <div className='flex flex-row max-md:flex-col'>
            <span className='w-[120px]'>
                <label htmlFor="mail">E-mail <span className='text-red-700 font-bold'>*</span></label>
              </span>
              <input type="email" name="mail" id="mail" value={mail} onChange={handleInputChange} />
              {!isValidEmail(mail) && mail.length > 0 ? (  <span className=' text-red-500 text-[10px] mt-2 px-1 font-sans'>Enter a valid mail id</span>) : (null)}

            </div>

            <div style={{ display: 'none' }}>
              <label>
                Do not fill this field <span className='text-red-700 font-bold'>*</span>
                <input type="text" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
              </label>
            </div>

            <div className='flex flex-row max-md:flex-col'>
            <span className='w-[120px]'>
                <label htmlFor="pnum">Number <span className="text-red-700 font-bold">*</span></label>
              </span>
              <input type="tel" name="pnum" id="pnum" value={pnum} onChange={handleInputChange} />
              {!isValidMobileNumber(pnum) && pnum.length > 0 ? (  <span className=' text-red-500 text-[10px] mt-2 px-1 font-sans'>Enter a valid mobile number</span>) : (null)}
            </div>

            <div className='flex flex-col'>
              <span className='w-[120px]'>
                  <label htmlFor="message">Message</label>
                </span>
              <textarea name="message" id="message" cols="30" rows="10" value={message} onChange={handleInputChange}
              placeholder='Enter your message here...'
              ></textarea>
            </div>
            <button type="submit" className='bg-white my-2 mx-8 rounded-3xl hover:text-black hover:mx-5 hover:border-blue-400 border-2'>
              send
            </button>   
            </div>
        </form>

        <img src="../img/bg1.png" alt="Image" className='max-md:hidden' />
      </div>
      {isLoading &&
      <div className='z-30 fixed  top-1/2 left-1/2'>
          {isError && <div className='flex flex-col top-1/2 w-[100px] h-[100px] mx-auto'>
              <img src="../img/error.gif" alt="" />
              <span className='font-semibold text-red-500 text-center'> Error </span>
            </div>}
          {isSent ? <div>
            <img src="../img/sent.gif" alt="success" className='flex flex-col top-1/2 w-[100px] h-[100px] mx-auto' />
            <span className='text-gradient-3 items-center'>sent ...</span>
          </div>:
          !isError && 
            <div>
              <img src="../img/loading.gif" alt="loading" className='flex flex-col top-1/2 w-[100px] h-[100px] mx-auto' />
            <span className='text-gradient-2 items-center'>
              Loading...  
            </span>
          </div>
          }
      </div>
      }
    </div>
  );
}

Form.propTypes = {
  setSentStatus: PropTypes.func.isRequired,
};