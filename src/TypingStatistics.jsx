import Header from "./Header"
import { useEffect, useState } from "react";
import localforage from "localforage";

function TypingStatistics() {

    const [speed, setSpeed] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [totalParagraphs, setParagraphs] = useState(0);
    const [totalCpm, setTotalCpm] = useState(0);
    const [totalMistakes, setTotalMistakes] = useState(0);
    const [wpmPerParagraph, setWpmPerParagraphs] = useState(0);
    const [accuracyPerParagraph, setAccPerParagraph] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const tempSpeedArray = [];
        const tempAccuracyArray = [];
        const tempParagraphs = [];
        const tempCpm = [];
        const tempMistakes = [];
        const tempWpmPerParagraph = [];
        const tempAccuracyPerParagraph = [];

        const fetchRecentData = async () => {

            try {

                await localforage.iterate((value, key, iterationNumber) => {

                    if (value.wpm != null || value.wpm != undefined) {

                        if (value.wpm > 0) {

                            tempSpeedArray.push(value.wpm);
                        }

                    }

                    if (value.accuracy != null || value.accuracy != undefined) {

                        if (value.accuracy > 0) {

                            tempAccuracyArray.push(value.accuracy);

                        }

                    }

                    if (value.paragraphIndex != null || value.paragraphIndex != undefined) {

                        if (value.paragraphIndex > 0) {

                            tempParagraphs.push(value.paragraphIndex);

                        }

                    }

                    if (value.cpm != null || value.cpm != undefined) {

                        if (value.cpm > 0) {

                            tempCpm.push(value.cpm);

                        }

                    }

                    if (value.mistakes != null || value.mistakes != undefined) {

                        if (value.mistakes > 0) {

                            tempMistakes.push(value.mistakes);

                        }

                    }

                    if (value.wpmPerParagraphs != null || value.wpmPerParagraphs != undefined) {

                        if (parseFloat(value.wpmPerParagraphs) > 0) {

                            tempWpmPerParagraph.push(value.wpmPerParagraphs);

                        }

                    }

                    if (value.accPerParagraph != null || value.accPerParagraph != undefined) {

                        if (parseFloat(value.accPerParagraph) > 0) {

                            tempAccuracyPerParagraph.push(value.accPerParagraph);

                        }

                    }


                });


                //Calculate Average WPM Speed

                let averageSpeedNumNumerator = 0;

                let averageSpeedNumDenominator = 0;

                for (let i = 0; i < tempSpeedArray.length; i += 1) {

                    averageSpeedNumDenominator += 1;

                    averageSpeedNumNumerator += parseFloat(tempSpeedArray[i]);
                }

                let overallAverageSpeed = averageSpeedNumNumerator / averageSpeedNumDenominator


                //Calculate Average Accuracy

                let averageAccuracyNumerator = 0;

                let averageAccuracyDenominator = 0;

                for (let i = 0; i < tempAccuracyArray.length; i += 1) {

                    averageAccuracyDenominator += 1;

                    averageAccuracyNumerator += parseFloat(tempAccuracyArray[i]);
                }

                let overallAverageAccuarcy = averageAccuracyNumerator / averageAccuracyDenominator;


                //Calculate Total Paragraphs Completed

                let totalParagraphsCompleted = 0;

                for (let i = 0; i < tempParagraphs.length; i += 1) {

                    totalParagraphsCompleted += tempParagraphs[i];

                }


                //Calculate Average CPM

                let averageCpmNumerator = 0;

                let averageCpmDenominator = 0;

                for (let i = 0; i < tempCpm.length; i += 1) {

                    averageCpmDenominator += 1;

                    averageCpmNumerator += tempCpm[i];
                }

                let overallCpm = averageCpmNumerator / averageCpmDenominator;


                //Calculate Total Mistakes

                let totalMistakesMade = 0;

                for (let i = 0; i < tempMistakes.length; i += 1) {

                    totalMistakesMade += tempMistakes[i];

                }


                //Calculate The Average WPM Per Completed Paragraph


                let averageWpmPerParagraphNumerator = 0;

                let averageWpmPerParagraphDenominator = 0;

                let singularArray = tempWpmPerParagraph.flat();

                for (let i = 0; i < singularArray.length; i += 1) {

                    averageWpmPerParagraphDenominator += 1;

                    averageWpmPerParagraphNumerator += parseFloat(singularArray[i]);

                }

                let overallWpmPerParagraph = averageWpmPerParagraphNumerator / averageWpmPerParagraphDenominator;


                //Calculate The Average Accuracy Per Completed Paragraph

                let averageAccPerParagraphNumerator = 0;

                let averageAccPerParagraphDenominator = 0;

                let singularAccArray = tempAccuracyPerParagraph.flat();

                for (let i = 0; i < singularAccArray.length; i += 1) {

                    averageAccPerParagraphDenominator += 1;

                    averageAccPerParagraphNumerator += parseFloat(singularAccArray[i]);

                }


                let overallAccPerParagraph = averageAccPerParagraphNumerator / averageAccPerParagraphDenominator;



                setSpeed(overallAverageSpeed);
                setAccuracy(overallAverageAccuarcy);
                setParagraphs(totalParagraphsCompleted);
                setTotalCpm(overallCpm);
                setTotalMistakes(totalMistakesMade);
                setWpmPerParagraphs(overallWpmPerParagraph);
                setAccPerParagraph(overallAccPerParagraph);

            } catch (err) {

                setError(err);

                console.error('Error retrieving data:', err);

            } finally {

                setLoading(false);

            }
        }

        fetchRecentData();

    }, [])


    if (loading) return <p>Loading data...</p>;

    if (error) return <p>Error: couldn't load your statistics</p>;


    return (
        <>
            <Header />
            <h1 style={{ color: "white", textAlign: "center", border: "2px solid white", padding: "5px", backgroundColor: "black" }}>
                Your Statistics
            </h1>

            <div className="recentStats" style={{ border: "2px solid gray", paddingBottom: "20px", backgroundColor: "black" }}>

                <h3 style={{ textAlign: "center", marginTop: "10px" }}>RECENT STATS</h3>

                <div className="statsContainer">
                    <div className="square">
                        <h4>Average Speed:</h4>
                        <p>{Number.isNaN(speed) || speed == null ? "-" : `${speed.toFixed(2)} WPM`}</p>
                    </div>
                    <div className="square">
                        <h4>Average Accuracy:</h4>
                        <p>{Number.isNaN(accuracy) || accuracy == null ? "-" : `${accuracy.toFixed(2)}%`}</p>
                    </div>
                    <div className="square">
                        <h4>Total Paragraphs Completed:</h4>
                        <p>{`${totalParagraphs}`}</p>
                    </div>
                    <div className="square">
                        <h4>Average CPM (Characters Per Minute):</h4>
                        <p>{Number.isNaN(totalCpm) || totalCpm == null ? "-" : `${totalCpm.toFixed(2)} CPM`}</p>
                    </div>
                    <div className="square">
                        <h4>Total Mistakes:</h4>
                        <p>{`${totalMistakes}`}</p>
                    </div>
                    <div className="square">
                        <h4>Average WPM Per Paragraph</h4>
                        <p>{Number.isNaN(wpmPerParagraph) || wpmPerParagraph == null ? "-" : `${wpmPerParagraph.toFixed(2)} WPM`}</p>
                    </div>
                    <div className="square">
                        <h4>Average Accuracy Per Paragraph</h4>
                        <p>{Number.isNaN(accuracyPerParagraph) || accuracyPerParagraph == null ? "-" : `${accuracyPerParagraph.toFixed(2)}%`}</p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default TypingStatistics;