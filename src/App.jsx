import { useState, useEffect } from 'react'
import Feedback from './components/Feedback'
import Options from './components/Options'
import Notification from './components/Notification'
import Description from './components/Description'

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

     });
   };


   const resetFeedback = () => {
    setFeedback({good: 0, neutral: 0, bad: 0 });
  
    
   };
    
    const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
    const positiveFeedback = Math.round((feedback.good / totalFeedback) * 100)

    
    useEffect(() => {
      localStorage.setItem('feedback', JSON.stringify(feedback));
    }, [feedback]);
  

  return (
    <>
    <Description/>
  
   <Options updateFeedback ={updateFeedback} totalFeedback ={totalFeedback} resetFeedback={resetFeedback} />

   {totalFeedback > 0 ? (<Feedback feedback={feedback} totalFeedback={totalFeedback} positiveFeedback={positiveFeedback} />) : (
  <Notification />
)}

    </>
  )

}




