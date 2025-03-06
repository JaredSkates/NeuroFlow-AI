"use client";
import React from 'react'
import { Typewriter } from 'react-simple-typewriter';

type Props = {}

const TypewriterTitle = (props: Props) => {
  return (
    <Typewriter 
        words={['Organized!', 'AI Engineered!', 'Efficient!']}
        loop={0} // Infinite Loop
        cursor
        cursorColor='white'
        typeSpeed={60}
        deleteSpeed={90}
        delaySpeed={2000}
    ></Typewriter>
  )
}

export default TypewriterTitle;