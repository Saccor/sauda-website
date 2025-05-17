import React from "react";

const VideoPage = () => {
  return (
    <main className="min-h-screen bg-[#0a1833] text-white flex flex-col items-center justify-center pt-32 pb-16 px-4">
      <div className="max-w-2xl w-full mx-auto flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-10 text-center tracking-tight">Music Video</h1>
        <div className="w-full aspect-video bg-black/60 rounded-2xl flex items-center justify-center shadow-xl border-2 border-white/10">
          <span className="text-lg text-white/60">Music video coming soon...</span>
        </div>
      </div>
    </main>
  );
};

export default VideoPage; 