import { useState } from "react";

function SessionStopped({ startSession }) {
  const [isActivating, setIsActivating] = useState(false);

  function handleStartSession() {
    if (isActivating) return;

    setIsActivating(true);
    startSession();
  }

  return (
    <div className="flex items-center justify-center w-full h-full">
      <button
        onClick={handleStartSession}
        className={isActivating ? "bg-gray-600" : "bg-red-600"}
      >
        {isActivating ? "starting session..." : "🎤 start session"}
      </button>
    </div>
  );
}

function SessionActive({ stopSession }) {
  return (
    <div className="flex items-center justify-center w-full h-full gap-4">
      <button onClick={stopSession} className="bg-red-600">
        disconnect
      </button>
    </div>
  );
}

export default function SessionControls({
  startSession,
  stopSession,
  isSessionActive,
}) {
  return (
    <div className="flex gap-4 border-t-2 border-gray-200 h-full rounded-md">
      {isSessionActive ? (
        <SessionActive
          stopSession={stopSession}
        />
      ) : (
        <SessionStopped startSession={startSession} />
      )}
    </div>
  );
}
