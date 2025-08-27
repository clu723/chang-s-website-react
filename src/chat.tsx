import { useState } from 'react'
import HelpModal from './helpmodal'
import './styles/chat.css'

const API_URL = "https://chang-s-website-api.onrender.com/api/chatbot";

type Message = { role: 'user' | 'bot'; text: string }

export default function Chat() {
    const [showHelp, setShowHelp] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')
    const [listening, setListening] = useState(false)

    const clear = () => { setInput('') }

    const sendMessage = async () => {
        if (!input.trim()) return
        setMessages(prev => [...prev, { role: 'user', text: input.trim() }])
        const botResponse = await callGeminiAPI(input.trim());
        setMessages(prev => [...prev, { role: 'bot', text: botResponse }])
        clear();
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert("Speech Recognition not supported in this browser.");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.interimResults = true;

    recognition.onresult = function (event: any) {
        for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
                console.log(event.results[i][0].transcript);
                setInput(event.results[i][0].transcript + " ");
            }
        }
    }

    // Continuous results when mic is active
    recognition.onend = function () {
        if (listening) {
            recognition.start();
        }
    };

    const toggleMic = () => {
        setListening(v => !v)
        if (listening) {
            recognition.start();
        } else {
            recognition.stop();
        }
    }

    const callGeminiAPI = async (query: string) : Promise<string> => {
        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: query })
            });
            const data = await res.json();
            return data;
        } catch (err) {
            console.error(err);
            return("Error fetching response.");
        }
    };

    return (
        <>
            <div className="chat-container">
                <div className="messages" id="messages">
                    {messages.map((m, i) => (
                        <div key={i} className={`message ${m.role}`}>
                            {m.text}
                        </div>
                    ))}
                </div>
                <div className="input-container">
                    <button className="microphone" id="mic-button" onClick={toggleMic}>
                        <span className=" microphone-icon">🎤</span>
                    </button>
                    <div className="input-container">
                        <input
                            type="text"
                            id="chat-input"
                            className="chat-input"
                            placeholder="Click the microphone to start talking!"
                            autoComplete="off"
                            style={{ cursor: 'not-allowed' }}
                            value={input}
                            onChange={e => setInput(e.target.value)}

                        />
                        <button className="clear-btn" id="clear-btn" title="Clear" onClick={clear}>
                            Clear
                        </button>
                        <button className="send-btn" id="send-btn" title="Send" onClick={sendMessage}>
                            ➤
                        </button>
                    </div>
                </div>
            </div>
            <button
                id="help-btn"
                className="help-btn"
                title="Help"
                onClick={() => setShowHelp(true)}
            >?
            </button>
            <HelpModal active={showHelp} onClose={() => setShowHelp(false)}></HelpModal>
        </>
    )
}