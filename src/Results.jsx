import { useEffect } from "react";
import Header from "./Header";
import { useLocation, useParams } from "react-router-dom";
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

    let { triviatopic } = useParams();

    const { state } = useLocation();
    let { accuracy, time, cpm, wpm, mistakes, wordsPerMinutePerParagraphs, accPerParagraph } = state;

    let wpmPerParagraphs = [];
    let wordsPerMin = [];
    let accuracyPerParagraph = [];

    for (let i = 0; i < wordsPerMinutePerParagraphs.length; i += 1) {
        wordsPerMin.push(wpm);
    }

    for (let i = 0; i < wordsPerMinutePerParagraphs.length; i += 1) {
        wpmPerParagraphs.push(wordsPerMinutePerParagraphs[i]);
    }

    for (let i = 0; i < accPerParagraph.length; i += 1) {
        accuracyPerParagraph.push(accPerParagraph[i]);
    }

    useEffect(() => {

        const h2 = document.getElementById("fastestParagraph");

        let fastestWpm = Math.max(...wpmPerParagraphs);

        h2.insertAdjacentHTML('afterbegin', `<h2>${fastestWpm} WPM</h2>`);

    }, []);

    const numOfParagraphs = wordsPerMinutePerParagraphs.length;

    const labels = [];

    for (let i = 0; i < numOfParagraphs; i += 1) {
        labels.push((i + 1).toString());
    }

    const data = {
        labels: labels,
        datasets: [
            {
                label: "Average WPM (Words Per Minute)",
                data: wordsPerMin,
                borderColor: "yellow",
                cubicInterpolationMode: 'monotone',
                BackgroundColor: "white",
                pointBackgroundColor: "yellow",
                tension: 0.4,
                fill: true,
                pointRadius: 5,
            },
            {
                label: "WPM (Words Per Minute)",
                data: wpmPerParagraphs,
                borderColor: "rgba(148,154,50,1)",
                fill: true,
                cubicInterpolationMode: 'monotone',
                BackgroundColor: "rgba(148,154,50,1)",
                pointBackgroundColor: "rgba(148,154,50,1)",
                tension: 0.4,
                pointRadius: 5,
            },
            {
                label: "Accuracy",
                data: accuracyPerParagraph,
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
                        if (tooltipItem.dataset.label === "Accuracy") {
                            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}%`;
                        }
                        return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                    }
                },
            },
        }
    };

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
                        <p id="fastestParagraph"></p>
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