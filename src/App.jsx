import { useState } from 'react'
import Feedback from './components/Feedback'
import Options from './components/Options'
import Notification from './components/Notification'

import './App.css'


export default function App() {
  const [feedback, setFeedback] = useState(() => {
      const savedFeedback = localStorage.getItem('feedback');
      return savedFeedback ? JSON.parse(savedFeedback) : { good: 0, neutral: 0, bad: 0 };
    });


   const updateFeedback = (type) => {
       setFeedback((prevFeedback) => {
        const updatedFeedback = {
      ...prevFeedback,
      [type]: prevFeedback[type] + 1,
     };
 
     localStorage.setItem('feedback', JSON.stringify(updatedFeedback));
     return updatedFeedback;
     });
   };


   const resetFeedback = () => {
    const resetData = { good: 0, neutral: 0, bad: 0 };
    setFeedback(resetData);

    localStorage.setItem('feedback', JSON.stringify(resetData));
   };
    
    const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
    const positiveFeedback = Math.round((feedback.good / totalFeedback) * 100)

  
  

  return (
    <>
    <h1>Sip Happens Café</h1>
    <p>Please leave your feedback about our service by selecting one of the options below.</p>
  
   <Options updateFeedback ={updateFeedback} totalFeedback ={totalFeedback} resetFeedback={resetFeedback} />

   {totalFeedback > 0 ? (<Feedback feedback={feedback} totalFeedback={totalFeedback} positiveFeedback={positiveFeedback} />) : (
  <Notification />
)}

    </>
  )

}




