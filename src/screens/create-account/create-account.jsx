import Btn from '../../components/btn/btn';
import GameTitle from '../../components/game-title/game-title';
import Input from '../../components/Input/Input';
import ScreenWrapper from '../../components/wrappers/screen-wrapper/screen-wrapper';
import { useNavigate } from 'react-router-dom';

function CreateAccount() {
  const navigate = useNavigate();

  return (
    <ScreenWrapper>
      <GameTitle />
      <form className='form-wrapper'>
        <Input id="id01" placeholder='Username' type="text"/>
        <Input id="id02" placeholder='Email' type="email"/>
        <Input id="id03" placeholder='Password' type="password"/>
        <div className="btn-form-wrapper">
          <Btn className={'btn-pink-solid'} onClick={() => {navigate("/")}} >Cancel</Btn>
          <Btn onClick={() => {navigate("/")}} >create account</Btn>
        </div>
      </form>
    </ScreenWrapper>
  );
}

export default CreateAccount;