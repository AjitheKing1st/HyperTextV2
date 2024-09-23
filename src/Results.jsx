import { useLocation, useParams } from "react-router-dom";

function Results() {

    let { triviatopic } = useParams();

    const { state } = useLocation();
    let { accuracy, time, cpm, wpm, mistakes, numberOfParagraphs } = state;

    console.log(state);

    return (
        <>
            <div className="results-container">

                <h3>{triviatopic} Chapter Stats: </h3>

                <div className="chapter-statistics">
                    <div className="accuracy">
                        <h3>Accuracy:</h3>
                        <h2>{accuracy}%</h2>
                    </div>
                    <div className="time">
                        <h3>Typing Time:</h3>
                        <h2>{time} Minutes</h2>
                    </div>
                    <div className="wpm">
                        <h3>Speed:</h3>
                        <h2>{wpm} WPM</h2>
                    </div>
                    <div className="cpm">
                        <h3>Characters Typed:</h3>
                        <h2>{cpm}</h2>
                    </div>
                    <div className="mistakes">
                        <h3>Mistakes:</h3>
                        <h2>{mistakes}</h2>
                    </div>
                </div>

            </div>

            <div className="Chapter-Statistics-Chart">
                <canvas id="Stats-Chart"></canvas>
            </div>
        </>
    )
}

export default Results