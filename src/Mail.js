import React, { useState, useEffect } from 'react';
import './Mail.css'

function Mail() {

  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsDone(true);
    }, 4000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <svg className={`
      ${isDone?'done':''}
    `} id="mail" width="750" height="1000" viewBox="0 0 750 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path className="upper" d="M52.9506 0C37.8292 0 32.2087 19.8406 45.0834 27.7714L367.133 226.154C371.957 229.125 378.043 229.125 382.867 226.154L704.917 27.7714C717.791 19.8406 712.171 0 697.049 0H52.9506Z" fill="#EAD5D8"/>
      <path d="M0 480C0 491.046 8.95431 500 20 500H730C741.046 500 750 491.046 750 480V64.2177C750 48.481 732.666 38.9089 719.347 47.2907L385.653 257.296C379.142 261.393 370.858 261.393 364.347 257.296L30.6527 47.2907C17.334 38.9089 0 48.481 0 64.2177V480Z" fill="#EAD5D8"/>
    </svg>
  );
}

export default Mail;