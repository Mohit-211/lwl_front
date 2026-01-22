import React from 'react';

export default function Description() {
  return (
    <div className="py-24 px-6 bg-gradient-to-b from-[#0a0a15] to-[#1a1a2e]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-[#f5f0e8] mb-8 text-center">
          About the Film
        </h2>
        
        <div className="space-y-6 text-[#f5f0e8]/80 text-lg leading-relaxed">
          <p>
            <span className="text-[#c9a227] font-semibold">LIFE WORTH LIVING</span> is a film by Frank X. Panico of{' '}
            <span className="text-[#f5f0e8]">Xs in the Sky Films</span> and Alex Schadenberg, Executive Director of the{' '}
            <a 
              href="https://www.epcc.ca" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#f5f0e8] hover:text-[#c9a227] transition-colors underline"
            >
              Euthanasia Prevention Coalition
            </a>. It is a groundbreaking, bold documentary 
            that exposes the euthanasia crisis in Canada—described in the film as a dark stain on a nation that has taken 
            over 90,000 lives since 2016.
          </p>
          
          <p>
            Through intriguing testimony from doctors and from those who have unjustly lost loved ones to Medical Assistance 
            in Dying (MAiD), a viewer learns of the demise of a nation that the film describes as once a beacon of hope. 
            Doctors who once took a pledge to save lives and provide healthcare are now pushing death, and the film includes 
            audio recordings that it says document this.
          </p>
          
          <p>
            Canada is currently planning to provide death to those with mental illness alone, putting suicidal and depressed 
            individuals directly in the line of fire. The euthanizing of a nation and this common practice of killing has 
            seeped its way into America too, where 11 states currently practice assisted suicide.
          </p>
          
          <p className="text-[#f5f0e8] font-medium">
            Although <span className="text-[#c9a227]">Life Worth Living</span> addresses serious subject matter, it exposes 
            a vitally important story that must be told and is one of hope and resilience.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-[#f5f0e8]/10">
          <p className="text-sm text-[#f5f0e8]/50 text-center italic">
            "A beacon of hope in a time of darkness—this is a story that demands to be heard."
          </p>
        </div>
      </div>
    </div>
  );
}