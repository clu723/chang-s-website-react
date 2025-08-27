import "./styles/helpmodal.css"
type Props = {
  active: boolean
  onClose: () => void
}

export default function HelpModal({active, onClose }: Props) {
    if (!active) return null;

    return (
        <div id="help-modal">
            <div className="help-backdrop">
            </div>
            <div className="help-content">
                <button id="help-close" className="help-close" onClick={onClose}>&times;</button>
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
    )
}