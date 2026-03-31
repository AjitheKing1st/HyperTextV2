import { useEffect, useState } from "react";
import Header from "./Header";
import { useParams } from "react-router-dom";
import localforage from "localforage";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Filler,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Filler,
    Title,
    Tooltip,
    Legend,
)

function Results() {

    const [accuracy, setAccuracy] = useState(0);
    const [time, setTime] = useState("");
    const [cpm, setCpm] = useState(0);
    const [wpm, setWpm] = useState(0);
    const [mistakes, setMistakes] = useState(0);
    const [wpmPerParagraph, setWpmPerParagraph] = useState([]);
    const [fastestWpm, setFastestWpm] = useState(0);
    const [accPerParagraph, setAccPerParagraph] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    let { subject, triviatopic } = useParams();

    useEffect(() => {

        const accuracyArray = [];
        const timeArray = [];
        const cpmArray = [];
        const wpmArray = [];
        const mistakesArray = [];
        const wpmPerParagraphArray = [];
        const accPerParagraphArray = [];
        let timeData;

        const titleNameKey = `${subject}: ${triviatopic}`
        const totalTimeKey = `${subject}: ${triviatopic} Total Time`

        const fetchResults = async () => {

            try {

                await localforage.iterate((value, key, iterationNumber) => {

                    if (key == titleNameKey) {

                        accuracyArray.push(value.accuracy);
                        cpmArray.push(value.cpm);
                        wpmArray.push(value.wpm);
                        mistakesArray.push(value.mistakes);
                        wpmPerParagraphArray.push(...value.wpmPerParagraphs);
                        accPerParagraphArray.push(...value.accPerParagraph);

                    }

                    if (key == totalTimeKey) {

                        if (value.seconds > 0 && value.minutes == 0) {

                            timeData = `${value.seconds} Second(s)`;

                            timeArray.push(timeData)

                        }
                        else if (value.minutes > 0 && (value.hours == 0 && value.days == 0)) {

                            timeData = `${value.minutes} Minute(s) and ${value.seconds} Second(s)`;

                            timeArray.push(timeData)

                        }
                        else if (value.hours > 0 && value.days == 0) {

                            timeData = `${value.hours} Hour(s) and ${value.minutes} Minute(s) and ${value.seconds} Second(s)`;

                            timeArray.push(timeData)

                        }
                        else if (value.days > 0 && (value.hours == 0 || value.hours > 0)) {

                            timeData = `${value.days} Day(s) and ${value.hours} Hour(s) and ${value.minutes} Minute(s) and ${value.seconds} Second(s)`;

                            timeArray.push(timeData)

                        }

                    }

                });

                let fastestWpm = Math.max(...wpmPerParagraphArray.flat());

                setAccuracy(accuracyArray);
                setTime(timeData);
                setWpm(wpmArray);
                setFastestWpm(fastestWpm);
                setCpm(cpmArray);
                setMistakes(mistakesArray);
                setWpmPerParagraph(wpmPerParagraphArray);
                setAccPerParagraph(accPerParagraphArray);

            }
            catch (err) {

                setError(err);

                console.error('Error retrieving data:', err);

            } finally {

                setLoading(false);

            }

        };

        fetchResults();

    }, []);

    const constWpmArray = []

    for (let i = 0; i < wpmPerParagraph.length; i += 1) {

        constWpmArray.push(wpm);

    }

    const labels = [];

    for (let i = 0; i < wpmPerParagraph.length; i += 1) {

        labels.push((i + 1).toString());

    }

    const data = {
        labels: labels,
        datasets: [
            {
                label: "Average WPM (Words Per Minute)",
                data: constWpmArray.flat(),
                borderColor: "yellow",
                cubicInterpolationMode: 'monotone',
                BackgroundColor: "white",
                pointBackgroundColor: "yellow",
                tension: 0.4,
                fill: true,
                pointRadius: 5,
            },
            {
                label: "WPM (Words Per Minute) Per Paragraph",
                data: wpmPerParagraph,
                borderColor: "rgb(0, 247, 255)",
                fill: true,
                cubicInterpolationMode: 'monotone',
                BackgroundColor: "rgb(0, 247, 255)",
                pointBackgroundColor: "rgb(0, 247, 255)",
                tension: 0.4,
                pointRadius: 5,
            },
            {
                label: "Accuracy Per Paragraph",
                data: accPerParagraph,
                yAxisID: 'AccuracyPerParagraph',
                borderColor: "pink",
                fill: true,
                cubicInterpolationMode: 'monotone',
                BackgroundColor: "pink",
                pointBackgroundColor: "pink",
                tension: 0.4,
                pointRadius: 5,
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Paragraphs',
                    color: 'white',
                    font: {
                        size: 17,
                        weight: "900",
                        family: "Segoe UI Symbol"
                    },
                },
                ticks: {
                    beginAtZero: true,
                    color: 'white',
                    font: {
                        size: 14,
                        weight: "900",
                        family: "Segoe UI Symbol"
                    }
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'WPM + Average WPM',
                    color: 'yellow',
                    font: {
                        size: 15,
                        weight: "700",
                        family: "Segoe UI Symbol"
                    },
                    padding: { top: 10 },
                },
                ticks: {
                    beginAtZero: true,
                    color: 'yellow',
                    font: {
                        size: 14,
                        weight: "600",
                        family: "Segoe UI Symbol"
                    },
                    callback: (val) => {
                        return val + " WPM";
                    }
                },
            },
            AccuracyPerParagraph: {
                title: {
                    display: true,
                    text: "Accuracy Per Paragraph",
                    color: 'pink',
                    font: {
                        size: 15,
                        weight: "900",
                        family: "Segoe UI Symbol"
                    },
                    padding: { top: 10 },
                },
                type: 'linear',
                position: 'right',
                ticks: {
                    beginAtZero: true,
                    color: 'pink',
                    font: {
                        size: 14,
                        weight: "600",
                        family: "Segoe UI Symbol"
                    },
                    callback: (val) => {
                        return val + "%";
                    }
                },
                grid: { display: false },
            }
        },
        interaction: {
            intersect: false,
            mode: 'nearest',
            axis: 'x'
        },
        plugins: {
            tooltip: {
                backgroundColor: "black",
                titleAlign: "center",
                boxPadding: 5,
                padding: 15,
                bodySpacing: 15,
                borderColor: "white",
                borderWidth: 1,
                titleFont: {
                    size: 15,
                    family: "Segoe UI Symbol",
                },
                bodyFont: {
                    size: 14,
                    family: "Segoe UI Symbol",
                    weight: "bold"
                },
                callbacks: {
                    title: (index) => {
                        return `At Paragraph ${index[0].dataIndex + 1}`;
                    },
                    label: function (tooltipItem) {

                        if (tooltipItem.dataset.label === "Accuracy Per Paragraph") {

                            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}%`;

                        }

                        if (tooltipItem.dataset.label === "Average WPM (Words Per Minute)") {
                            
                            return `${tooltipItem.dataset.label}: ${tooltipItem.raw} WPM`;
                        
                        }

                        if (tooltipItem.dataset.label === "WPM (Words Per Minute) Per Paragraph") {

                            return `${tooltipItem.dataset.label}: ${tooltipItem.raw} WPM`;

                        }

                        return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                    }
                },
            },
        }
    };

    if (loading) return <p>Loading Results...</p>;

    if (error) return <p>Error, couldn't load your results.</p>;

    return (
        <>

            <Header />
            <div className="results-container">

                <h3>{triviatopic} Chapter Stats: </h3>

                <div className="chapter-statistics">
                    <div className="accuracy">
                        <h3>Accuracy:</h3>
                        <h2>{accuracy}%</h2>
                    </div>
                    <div className="time">
                        <h3>Typing Time:</h3>
                        <h2>{time}</h2>
                    </div>
                    <div className="wpm">
                        <h3>Speed:</h3>
                        <h2>{wpm} WPM</h2>
                    </div>
                    <div className="wpmPerParagraphs">
                        <h3>Fastest Paragraph: </h3>
                        <h2>{fastestWpm} WPM</h2>
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
                <Line data={data} options={options} />
            </div>

        </>
    )
}

export default Results