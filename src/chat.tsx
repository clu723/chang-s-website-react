import './styles/chat.css'

export default function Chat() {
    return (
        <>
            <div className="chat-container">
                <div className="messages" id="messages">
                </div>
                <div className="input-container">
                    <button className="microphone" id="mic-button">
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
                            disabled
                        />
                        <button className="clear-btn" id="clear-btn" title="Clear">
                            Clear
                        </button>
                        <button className="send-btn" id="send-btn" title="Send">
                            ➤
                        </button>
                    </div>
                </div>
            </div>

            <div id="help-modal" style={{ display: "block" }}>
                <div className="help-backdrop">
                </div>
                <div className="help-content">
                    <button id="help-close" className="help-close">&times;</button>
                    <h2>Welcome to Chang's Personal Website!</h2>
                    <div>
                        <b>How to use this site:</b><br />
                        <li>Turn up your volume!</li>
                        <li>Click the microphone to start speaking to my assistant.</li>
                        <li>Ask the assistant for info about Chang.</li>
                        <li>
                            Ask the assistant to navigate (e.g., &quot;Go to the projects page&quot;).
                            <ul>
                                <li>Available pages: <b>index, about, projects.</b></li>
                            </ul>
                        </li>
                        <li>When finished speaking, click the arrow to send.</li>
                        <br />
                        <em>
                            If nothing appears after closing this, please wait 15–25 seconds,
                            my backend is on the free tier and it goes to sleep with inactivity xD
                        </em>
                        <br /><br />
                        <em>Need help? Click the help button anytime!</em>
                    </div>
                </div>
            </div>
        </>
    )
}