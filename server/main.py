from fastapi import FastAPI
import uvicorn
import socketio
from openai import OpenAI

# Initialize FastAPI app
app = FastAPI()

# Initialize Socket.IO server
sio = socketio.AsyncServer(cors_allowed_origins="*", async_mode="asgi")
socket_app = socketio.ASGIApp(sio, app)

# Initialize OpenAI
openai_client = OpenAI(api_key="YOUR_OPENAI_API_KEY")

# Socket.IO event handlers
@sio.event
async def connect(sid, environ):
    print(f"User connected: {sid}")

@sio.event
async def disconnect(sid):
    print(f"User disconnected: {sid}")


# Run the server
if __name__ == "__main__":
    uvicorn.run(socket_app, host="0.0.0.0", port=8080)