import { useEffect, useState } from 'react';

export const useOtpTimer = (seconds = 30) => {
  const [timeLeft,setTimeLeft]=useState(seconds);
  useEffect(() => {
    if (timeLeft===0) return;
    const id=setInterval(()=> setTimeLeft((t)=>t-1), 1000);
    return ()=>clearInterval(id);
  },[timeLeft]);
  const restart =()=>setTimeLeft(seconds);
  return {timeLeft,restart};
};
