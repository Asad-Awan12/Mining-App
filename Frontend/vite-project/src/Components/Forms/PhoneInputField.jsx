import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
// import './phone-input-custom.css';
// import './index.css';


const PhoneInputField = () => {
  const [phone, setPhone] = useState('');

  return (
<div className="w-full">
      <PhoneInput
        country={'us'}
        value={phone}
        onChange={setPhone}
        inputStyle={{
          width: '100%',
          height: '50px',
          borderRadius: '10px',
          border: '1px solid #4B4B5E',
          paddingLeft: '50px',
          backgroundColor: '#1c1b2f',
          color: 'white',
        }}
        buttonStyle={{
          border: 'none',
          backgroundColor: '#1c1b2f',
        }}
        dropdownStyle={{
          backgroundColor: '#fff',
        }}
        containerStyle={{
          borderRadius: '10px',
        }}
        className="bg-gradient-to-r from-[#1E1F34] to-[#262A4F]"
      />
    </div>
  );
};

export default PhoneInputField;
