export default function TopBar(){
    return (
    <div className="top-bar">
        <div className="user-container">

            <span className="login-text" style={{fontSize:"12px"}}>sign in</span>
            <img 
                className="lab-coat-icon" 
                src="/Assets/lab-coat.svg"
                alt = "Lab coat"
                />

        </div>
    </div>
        )
}