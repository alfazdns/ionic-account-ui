import { IonButton, IonCheckbox, IonCol, IonContent, IonGrid, IonLabel, IonPage, IonRow } from '@ionic/react';
import InputRow from '../components/InputRow';
import { useRef, useState } from 'react';
import {Link} from 'react-router-dom'

type FormKey = 'username' | 'dob' | 'email' | 'password' | 'confirmPassword';

const Home: React.FC = () => {
  const [checked, setChecked] = useState(false);
  const [showError, setShowError] = useState({
    username: false,
    dob: false,
    email: false,
    password: false, 
    confirmPassword: false});
  const [formValue, setFormValue] = useState({
    username: '',
    dob: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const errorText = {
    username: 'Username must be greater than 3 in length',
    dob: 'Date of birth cannot be in the future',
    email: 'Email must be an email',
    password: 'Password should contain at least 8 characters, 1 special symbol character, 1 number, 1 uppercase letter', 
    confirmPassword: 'Passwords should match'
  }

  const handleErrorText = (name: FormKey) =>{
    if(showError[name]){
      return errorText[name]
    }
    return ''
  }
  const handleChange = (e: any, name: FormKey)=>{
    setFormValue({
      ...formValue,
      [name]: e?.target.value
    })
  }

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const data = formValue;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const error = {...showError};

    const checkError = (name: FormKey, condition: boolean) =>{
      if(!condition){
        console.log(name)
        error[name] = true
      }else{
        error[name] = false;
      }
    }

    checkError('password', regex.test(data.password));
    checkError('confirmPassword', data.password === data.confirmPassword);
    checkError('username', data.username.length > 3);
    checkError('dob', new Date(data.dob).getTime() < new Date().getTime());
    checkError('email', emailPattern.test(data.email));

    setShowError(error)
    if(Object.values(error).includes(true)){
      return
    }else{
      setTimeout(()=>{
        alert(`
Login succesfull!
------------------
Username: ${formValue.username}
DOB: ${formValue.dob}
Email: ${formValue.email}
        `)
      }, 0)
    }
  }

  const handleSubmitDisabled = ()=>{
    if(checked && Object.values(formValue).every(i=> !!i)){
      return false;
    }
    return true;
  }

  return (
    <IonPage className='signup-container' >
      <IonContent fullscreen class='signup' >
        <form onSubmit={handleSubmit} >
          <IonGrid>
            <IonRow>
              <IonCol>
                <div>
                  <h1>Let's get you started</h1>
                  <p>Already have an account? <Link to="/login" className='link' >Login</Link></p>
                </div>
              </IonCol>
            </IonRow>
            <InputRow label='Username' input={{type: 'text', placeholder: 'Enter username', onChange: (e)=> handleChange(e, 'username'),  required: true, errorText: handleErrorText('username')}} />
            <InputRow label='Date of birth' input={{type: 'date', required: true, onChange: (e)=> handleChange(e, 'dob'), errorText: handleErrorText('dob')}} />
            <InputRow label='Email address' input={{type: 'text', placeholder: 'Enter email address', onChange: (e)=> handleChange(e, 'email'), required: true, errorText: handleErrorText('email')}} />
            <InputRow label='Password' input={{type: 'password', placeholder: 'Enter password', passwordToggle: true, required: true, onChange: (e)=> handleChange(e, 'password'), errorText: handleErrorText('password')}} />
            <InputRow label='Confirm password' input={{type: 'password', placeholder: 'Confirm password', passwordToggle: true, required: true, onChange: (e)=> handleChange(e, 'confirmPassword'), errorText: handleErrorText('confirmPassword')}} />
            <IonRow style={{marginTop: '24px'}}>
              <IonCol>
                <div className='vertical-center' >
                  <IonCheckbox onIonChange={e=> setChecked(e.target.checked)} />
                  <IonLabel>I agree to the <Link to="toc" className='link' >Terms and Conditions</Link> and <Link to="/privacy-policy" className='link'> Privacy Policy</Link> of this app.</IonLabel>
                </div>
              </IonCol>
            </IonRow>
            <IonRow style={{marginTop: '24px'}} >
              <IonCol>
                <IonButton disabled={handleSubmitDisabled()} type='submit' expand='block'>Create Account</IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Home;
