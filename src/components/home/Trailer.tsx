import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function Trailer() {
  return (
    <div className="py-24 px-6 bg-[#0a0a15]" id="trailer">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#f5f0e8] mb-4">
            Watch the Trailer
          </h2>
          <p className="text-lg text-[#f5f0e8]/70 max-w-2xl mx-auto">
            See what Life Worth Living uncovers—and why so many are calling for urgent public awareness.
          </p>
        </div>

        {/* Vimeo Embed */}
        <div className="bg-[#1a1a2e] rounded-lg overflow-hidden shadow-2xl mb-12 border border-[#c9a227]/20">
          <div style={{padding: '56.25% 0 0 0', position: 'relative'}}>
            <iframe 
              src="https://player.vimeo.com/video/1151952264?badge=0&autopause=0&player_id=0&app_id=58479" 
              frameBorder="0" 
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} 
              title="Trailer for LIFE WORTH LIVING"
            />
          </div>
          <script src="https://player.vimeo.com/api/player.js"></script>
        </div>

        {/* Key Points */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex gap-3">
            <CheckCircle className="w-6 h-6 text-[#c9a227] flex-shrink-0 mt-1" />
            <p className="text-[#f5f0e8]/80">
              Testimony from doctors and families affected by MAiD
            </p>
          </div>
          <div className="flex gap-3">
            <CheckCircle className="w-6 h-6 text-[#c9a227] flex-shrink-0 mt-1" />
            <p className="text-[#f5f0e8]/80">
              Evidence and recorded audio presented in the film
            </p>
          </div>
          <div className="flex gap-3">
            <CheckCircle className="w-6 h-6 text-[#c9a227] flex-shrink-0 mt-1" />
            <p className="text-[#f5f0e8]/80">
              A serious subject, told with a message of hope and resilience
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}