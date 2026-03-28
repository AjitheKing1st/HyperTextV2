import Header from "./Header"
import { useEffect, useState } from "react";

function TypingStatistics() {

    const [Speed, setSpeed] = useState("");
    const [Accuracy, setAccuracy] = useState("");
    const [DailyGoal, setDailyGoal] = useState("");

    useEffect(() => {

        const loadLatestTime = async () => {

            

        };

        loadLatestTime();

    }, []);

    return (
        <>
            <Header />
            <h1 style={{ color: "white", textAlign: "center", border: "2px solid white", padding: "5px", backgroundColor: "black" }}>
                Your Statistics
            </h1>

            <div className="recentStats" style={{ border: "2px solid gray", marginTop: "10px", backgroundColor: "black" }}>

                <h3 style={{ textAlign: "center", marginTop: "10px" }}>RECENT STATS</h3>

                <div className="statsContainer">
                    <div className="square">
                        <h4>Speed:</h4>
                        <p>-</p>
                    </div>
                    <div className="square">
                        <h4>Accuracy:</h4>
                        <p>-</p>
                    </div>
                    <div className="square">
                        <h4>Daily 15 Minute Typing Goal:</h4>
                        <p>-</p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default TypingStatistics;