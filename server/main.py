from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import socketio
from openai import OpenAI
import httpx
import os
from dotenv import load_dotenv

# Initialize FastAPI app
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"],  # Your frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Initialize Socket.IO server
sio = socketio.AsyncServer(cors_allowed_origins="*", async_mode="asgi")
socket_app = socketio.ASGIApp(sio, app)

# Initialize OpenAI
load_dotenv()
openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Socket.IO event handlers
@sio.event
async def connect(sid, environ):
    print(f"User connected: {sid}")

@sio.event
async def disconnect(sid):
    print(f"User disconnected: {sid}")

# Update token endpoint
@app.get("/token")
async def get_token():
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.openai.com/v1/realtime/sessions",
                headers={
                    "Authorization": f"Bearer {openai_client.api_key}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": "gpt-4o-realtime-preview-2024-12-17",
                    "voice": "verse"
                }
            )
            
            data = response.json()
            return data
            
    except Exception as e:
        print("Token generation error:", str(e))
        return {"error": "Failed to generate token"}, 500

# Run the server
if __name__ == "__main__":
    uvicorn.run(socket_app, host="0.0.0.0", port=8080)