import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState, useLayoutEffect, useRef } from "react"
import paragraphs from "./paragraphs";
import shortcutPic from "./assets/Shortcut.jpg"

function TypingGameplay() {

    let { subject, triviatopic } = useParams();

    const [paragraphs2, setParagraphs] = useState(paragraphs);
    let [charIndex, setCharIndex] = useState(0);
    let [mistakes, setMistakes] = useState(0);
    let [letters, setLetters] = useState(0);
    let [cpm, setCpm] = useState(0);
    let [wpm, setWpm] = useState(0);
    let [acc, setAcc] = useState(0);
    let [correctKeys, setCorrectKeys] = useState(0);
    let [denominater, setDenominator] = useState(0);
    let [missedCharacters, addMissedCharater] = useState([]);
    let [wpmPerParagraphs, setWpmPerParagraphs] = useState([]);
    let [accPerParagraph, setAccPerParagrpah] = useState([]);
    let [numOfParagraphs, setNumOfParagraphs] = useState(0);

    const navigate = useNavigate();

    const timer = useRef();

    useLayoutEffect(() => {

        const inpField = document.querySelector(".wrapper .input-field");

        const typingText = document.querySelector(".typing-text div");

        typingText.querySelectorAll(".letter")[0].classList.add("active");

        const words = document.querySelectorAll(".word");

        const textBox = document.querySelector(".typing-text");

        const letters = typingText.querySelectorAll(".letter").length;

        const numberOfParagraphs = document.getElementsByClassName("paragraph").length;

        setLetters(letters);
        setNumOfParagraphs(numberOfParagraphs);

        let seconds;
        let incorrectLetters = 0;
        let totalTime;

        function initTyping() {
            let characters = typingText.querySelectorAll(".letter");
            let typedChar = inpField.value.split("")[charIndex];

            startStopwatch();

            if (timer.current === undefined) {
                // Start timer to keep track of WPM
                var start = Date.now();
                timer.current = setInterval(() => {
                    var delta = Date.now() - start; // milliseconds elapsed since start
                    seconds = delta / 1000;
                }, 100); // update about every 100ms

            };

            if (charIndex < characters.length) {

                if (typedChar == null) {
                    if (charIndex > 0) {
                        setCharIndex(charIndex -= 1);
                        if (characters[charIndex].classList.contains("incorrect")) {
                            setMistakes(mistakes -= 1);
                            setDenominator(denominater -= 1);
                            incorrectLetters += 1;

                            for (let i = missedCharacters.length - 1; i >= 0; i -= 1) {
                                if (characters[charIndex].innerText != missedCharacters[i]) {
                                    characters[charIndex].innerText = missedCharacters[i];
                                    missedCharacters.pop();
                                    break;
                                }
                            }

                            textBox.scrollBy(0, -1);
                        }
                        else {
                            setCorrectKeys(correctKeys -= 1);
                            setDenominator(denominater -= 1);
                            textBox.scrollBy(0, -1);
                        }
                        characters[charIndex].classList.remove("correct", "incorrect");
                        textBox.scrollBy(0, -1);
                    }
                } else {
                    if (characters[charIndex].innerText == typedChar) {
                        characters[charIndex].classList.add("correct");
                        setCorrectKeys(correctKeys += 1);
                        setDenominator(denominater += 1);
                    } else {
                        setMistakes(mistakes += 1);
                        characters[charIndex].classList.add("incorrect");
                        missedCharacters.push(characters[charIndex].innerText);
                        characters[charIndex].innerText = typedChar;
                        setDenominator(denominater += 1);
                        incorrectLetters -= 1;
                    }
                    setCharIndex(charIndex += 1);

                    if (charIndex === characters.length) {
                        stopStopwatch();
                        clearInterval(timer.current);
                        timer.current = null;
                        setTimeout(() => {
                            navigate(`/${subject}/${triviatopic}/results`, { state: { accuracy: ((correctKeys / denominater) * 100).toFixed(2), time: totalTime, wpm: (((inpField.value.length + incorrectLetters) / 5) / (seconds / 60)).toFixed(2), cpm: charIndex - mistakes, mistakes: mistakes, wordsPerMinutePerParagraphs: wpmPerParagraphs, accPerParagraph: accPerParagraph } });
                        }, 1)
                    }
                }

                characters.forEach(span => span.classList.remove("active"));
                characters[charIndex].classList.add("active");

                setCpm(charIndex - mistakes);
                setAcc(((correctKeys / denominater) * 100).toFixed(2));

                if (wpm < 0) {
                    setWpm(0);
                }
                else {
                    setWpm((((inpField.value.length + incorrectLetters) / 5) / (seconds / 60)).toFixed(2));
                }

                for (let i = 0; i < words.length; i += 1) {
                    if (words[i].querySelectorAll(".letter")[0].classList.contains("active")) {
                        textBox.scrollBy(0, 2);
                    }
                }
            }
            else {
                stopStopwatch();
            }
        };

        var startTime;
        var stopwatchInterval;
        var elapsedPausedTime = 0;

        function startStopwatch() {
            if (!stopwatchInterval) {
                startTime = new Date().getTime() - elapsedPausedTime;
                stopwatchInterval = setInterval(updateStopwatch, 1000);
            }
        };

        function stopStopwatch() {
            clearInterval(stopwatchInterval);
            elapsedPausedTime = new Date().getTime() - startTime;
            stopwatchInterval = null;
        };

        function resetStopwatch() {
            stopStopwatch();
            elapsedPausedTime = 0;
        };

        function updateStopwatch() {
            var currentTime = new Date().getTime();
            var elapsedTime = currentTime - startTime;
            var seconds = Math.floor(elapsedTime / 1000) % 60;
            var minutes = Math.floor(elapsedTime / 1000 / 60) % 60;
            var displayTime = pad(minutes) + ":" + pad(seconds);
            totalTime = displayTime;
        };

        function pad(number) {
            return (number < 10 ? "0" : "") + number;
        };

        const keys = document.querySelectorAll('.key');

        for (let i = 0; i < keys.length; i += 1) {
            keys[i].addEventListener("mousedown", () => {
                keys.forEach(element => element.classList.remove("active"));
                keys[i].classList.add("active");
            });
        };

        for (let i = 0; i < keys.length; i += 1) {
            keys[i].addEventListener("mouseup", () => {
                keys.forEach(element => element.classList.remove("active"));
                keys[i].classList.remove("active");
            });
        };

        var popUpInfo = document.getElementById("pop-up");
        let infoButton = document.querySelector(".click-me");
        var span = document.getElementsByClassName("close")[0];

        infoButton.addEventListener("click", () => {
            popUpInfo.style.display = "block";
        })

        span.onclick = function () {
            popUpInfo.style.display = "none";
        }

        window.onclick = function (event) {
            if (event.target == popUpInfo) {
                popUpInfo.style.display = "none";
            }
        }

        document.addEventListener("keydown", () => inpField.focus());
        document.addEventListener("click", () => inpField.focus());
        typingText.addEventListener("click", () => inpField.focus());
        inpField.addEventListener("input", initTyping);
        inpField.addEventListener("keydown", (event) => {

            const key = event.key.toLowerCase();

            if (key == "arrowup" || key == "arrowdown" || key == "arrowleft" || key == "arrowright") {
                event.preventDefault();
            }
        });

    }, []);

    useEffect(() => {
        const keys = document.querySelectorAll('.key');

        document.addEventListener('keydown', (event) => {
            const key = event.key.toLowerCase();

            for (let i = 0; i < keys.length; i += 1) {
                if (key == keys[i].textContent.toLowerCase()) {
                    keys[i].classList.add('active');
                    break;
                }
                else if (key == "escape") {
                    keys[0].classList.add("active");
                    break;
                }
                else if (key == "+" || key == "=") {
                    keys[12].classList.add("active");
                    break;
                }
                else if (key == "-" || key == "_") {
                    keys[11].classList.add("active");
                    break;
                }
                else if (key == ")" || key == "0") {
                    keys[10].classList.add("active");
                    break;
                }
                else if (key == "(" || key == "9") {
                    keys[9].classList.add("active");
                    break;
                }
                else if (key == "*" || key == "8") {
                    keys[8].classList.add("active");
                    break;
                }
                else if (key == "&" || key == "7") {
                    keys[7].classList.add("active");
                    break;
                }
                else if (key == "^" || key == "6") {
                    keys[6].classList.add("active");
                    break;
                }
                else if (key == "%" || key == "5") {
                    keys[5].classList.add("active");
                    break;
                }
                else if (key == "$" || key == "4") {
                    keys[4].classList.add("active");
                    break;
                }
                else if (key == "#" || key == "3") {
                    keys[3].classList.add("active");
                    break;
                }
                else if (key == "@" || key == "2") {
                    keys[2].classList.add("active");
                    break;
                }
                else if (key == "!" || key == "1") {
                    keys[1].classList.add("active");
                    break;
                }
                else if (key == "?" || key == "/") {
                    keys[51].classList.add("active");
                    break;
                }
                else if (key == ">" || key == ".") {
                    keys[50].classList.add("active");
                    break;
                }
                else if (key == "<" || key == ",") {
                    keys[49].classList.add("active");
                    break;
                }
                else if (key == "control") {
                    keys[55].classList.add("active");
                    break;
                }
                else if (key == "{" || key == "[") {
                    keys[25].classList.add("active");
                    break;
                }
                else if (key == "}" || key == "]") {
                    keys[26].classList.add("active");
                    break;
                }
                else if (key == "|" || key == "\\") {
                    keys[27].classList.add("active");
                    break;
                }
                else if (key == ":" || key == ";") {
                    keys[38].classList.add("active");
                    break;
                }
                else if (key == `'` || key == `"`) {
                    keys[39].classList.add("active");
                    break;
                }
                else if (key == "capslock") {
                    keys[28].classList.add("active");
                    break;
                }
                else if (key == "arrowup") {
                    keys[53].classList.add("active");
                    break;
                }
                else if (key == "arrowdown") {
                    keys[62].classList.add("active");
                    break;
                }
                else if (key == "arrowleft") {
                    keys[61].classList.add("active");
                    break;
                }
                else if (key == "arrowright") {
                    keys[63].classList.add("active");
                    break;
                }
                else if (key == " ") {
                    keys[58].classList.add("active");
                    break;
                }
            };
        });

        document.addEventListener('keyup', (event) => {
            const key = event.key.toLowerCase();

            for (let i = 0; i < keys.length; i += 1) {
                if (key == keys[i].textContent.toLowerCase()) {
                    keys[i].classList.remove('active');
                    break;
                }
                else if (key == "escape") {
                    keys[0].classList.remove("active");
                    break;
                }
                else if (key == "+" || key == "=") {
                    keys[12].classList.remove("active");
                    break;
                }
                else if (key == "-" || key == "_") {
                    keys[11].classList.remove("active");
                    break;
                }
                else if (key == ")" || key == "0") {
                    keys[10].classList.remove("active");
                    break;
                }
                else if (key == "(" || key == "9") {
                    keys[9].classList.remove("active");
                    break;
                }
                else if (key == "*" || key == "8") {
                    keys[8].classList.remove("active");
                    break;
                }
                else if (key == "&" || key == "7") {
                    keys[7].classList.remove("active");
                    break;
                }
                else if (key == "^" || key == "6") {
                    keys[6].classList.remove("active");
                    break;
                }
                else if (key == "%" || key == "5") {
                    keys[5].classList.remove("active");
                    break;
                }
                else if (key == "$" || key == "4") {
                    keys[4].classList.remove("active");
                    break;
                }
                else if (key == "#" || key == "3") {
                    keys[3].classList.remove("active");
                    break;
                }
                else if (key == "@" || key == "2") {
                    keys[2].classList.remove("active");
                    break;
                }
                else if (key == "!" || key == "1") {
                    keys[1].classList.remove("active");
                    break;
                }
                else if (key == "?" || key == "/") {
                    keys[51].classList.remove("active");
                    break;
                }
                else if (key == ">" || key == ".") {
                    keys[50].classList.remove("active");
                    break;
                }
                else if (key == "<" || key == ",") {
                    keys[49].classList.remove("active");
                    break;
                }
                else if (key == "control") {
                    keys[55].classList.remove("active");
                    break;
                }
                else if (key == "{" || key == "[") {
                    keys[25].classList.remove("active");
                    break;
                }
                else if (key == "}" || key == "]") {
                    keys[26].classList.remove("active");
                    break;
                }
                else if (key == "|" || key == "\\") {
                    keys[27].classList.remove("active");
                    break;
                }
                else if (key == ":" || key == ";") {
                    keys[38].classList.remove("active");
                    break;
                }
                else if (key == `'` || key == `"`) {
                    keys[39].classList.remove("active");
                    break;
                }
                else if (key == "capslock") {
                    keys[28].classList.remove("active");
                    break;
                }
                else if (key == "arrowup") {
                    keys[53].classList.remove("active");
                    break;
                }
                else if (key == "arrowdown") {
                    keys[62].classList.remove("active");
                    break;
                }
                else if (key == "arrowleft") {
                    keys[61].classList.remove("active");
                    break;
                }
                else if (key == "arrowright") {
                    keys[63].classList.remove("active");
                    break;
                }
                else if (key == " ") {
                    keys[58].classList.remove("active");
                    break;
                }
            };
        });

    }, []);

    useEffect(() => {
        let paragraphs = document.querySelectorAll(".paragraphs.container");

        const nextBtn = document.querySelector(".right-button");
        const prevBtn = document.querySelector(".left-button");

        let displayCount = 0;
        let paragraphsLimit = paragraphs.length;

        let array = [];

        const typingSection = document.querySelector(".typing-text");

        const hideAll = () => paragraphs.forEach((p, index) => {
            if (p.textContent !== "") {
                array.push(index);
            };
        });

        hideAll();

        let currentIndexOfParagraph = Math.min(...array);
        let maxIndexOfParagraph = Math.max(...array);
        let initalDisplayCount = Math.min(...array);

        for (let i = 0; i < paragraphsLimit; i += 1) {
            if (paragraphs[i].textContent !== "") {
                paragraphs[i].style.display = "block";
            }
            else {
                paragraphs[i].remove();
                displayCount += 1;
            }
        };

        for (let i = 0; i < paragraphsLimit; i += 1) {
            paragraphs[i].style.display = "none";
            paragraphs[currentIndexOfParagraph].style.display = "block";
        };

        const hideParagraphs = () => paragraphs.forEach(p => p.style.display = 'none');

        const checkFirstParagraph = () => {
            if (paragraphs[initalDisplayCount].style.display == "block") {
                prevBtn.style.display = "none";
            }
        };

        nextBtn.addEventListener('click', () => {

            if (currentIndexOfParagraph < maxIndexOfParagraph) {

                currentIndexOfParagraph += 1;

                if (currentIndexOfParagraph == maxIndexOfParagraph) {
                    nextBtn.style.display = "none";
                }
            }
            else {
                return;
            }

            checkFirstParagraph();
            hideParagraphs();
            paragraphs[currentIndexOfParagraph].style.display = "block";
            prevBtn.style.display = "block";
            typingSection.scrollTop = 0;
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndexOfParagraph > initalDisplayCount && currentIndexOfParagraph <= maxIndexOfParagraph) {

                currentIndexOfParagraph -= 1;

                if (currentIndexOfParagraph == initalDisplayCount) {
                    currentIndexOfParagraph = initalDisplayCount;
                    prevBtn.style.display = "none";
                }

            }
            else {
                return;
            }

            checkFirstParagraph();
            hideParagraphs();
            paragraphs[currentIndexOfParagraph].style.display = "block";
            nextBtn.style.display = "block";
            typingSection.scrollTop = 0;
        });

        document.addEventListener("keydown", (event) => {
            const key = event.key.toLowerCase();

            if (key == "enter") {
                if (currentIndexOfParagraph < maxIndexOfParagraph) {

                    currentIndexOfParagraph += 1;

                    if (currentIndexOfParagraph == maxIndexOfParagraph) {
                        nextBtn.style.display = "none";
                    }
                }
                else {
                    return;
                }

                checkFirstParagraph();
                hideParagraphs();
                paragraphs[currentIndexOfParagraph].style.display = "block";
                prevBtn.style.display = "block";
                typingSection.scrollTop = 0;
            }
            else if (key == "arrowleft") {
                if (currentIndexOfParagraph > initalDisplayCount && currentIndexOfParagraph <= maxIndexOfParagraph) {

                    currentIndexOfParagraph -= 1;

                    if (currentIndexOfParagraph == initalDisplayCount) {
                        currentIndexOfParagraph = initalDisplayCount;
                        prevBtn.style.display = "none";
                    }

                }
                else {
                    return;
                }

                checkFirstParagraph();
                hideParagraphs();
                paragraphs[currentIndexOfParagraph].style.display = "block";
                nextBtn.style.display = "block"
                typingSection.scrollTop = 0;
            }
            else if (key == "arrowright") {
                if (currentIndexOfParagraph < maxIndexOfParagraph) {

                    currentIndexOfParagraph += 1;

                    if (currentIndexOfParagraph == maxIndexOfParagraph) {
                        nextBtn.style.display = "none";
                    }
                }
                else {
                    return;
                }

                checkFirstParagraph();
                hideParagraphs();
                paragraphs[currentIndexOfParagraph].style.display = "block";
                prevBtn.style.display = "block";
                typingSection.scrollTop = 0;
            }
        });

        prevBtn.style.display = "none";
        nextBtn.style.display = "block";

        let filteredParagraph = paragraphs2.filter(item => item[triviatopic]);

        if (!(filteredParagraph.length > 1)) {
            prevBtn.style.display = "none";
            nextBtn.style.display = "none";
        }
        else {
            prevBtn.style.display = "none";
            nextBtn.style.display = "block";
        };

    }, []);

    const seperateTimers = useRef();

    useEffect(() => {

        let numberOfParagraphs = document.querySelectorAll(".paragraph");

        const inpField = document.querySelector(".wrapper .input-field");

        let seconds;

        let incorrectLetters;

        let array2 = [];

        const showNumOfParagraphs = () => numberOfParagraphs.forEach((p, index) => {
            if (p.textContent !== "") {
                array2.push(index);
            };
        });

        showNumOfParagraphs();

        let firstIndex = Math.min(...array2);

        let subtraction = 0;

        let wpm;

        function wpmPerChapter(paragraph) {
            let characters = paragraph.querySelectorAll(".letter");

            let tempNum = inpField.value.length - subtraction;

            if (seperateTimers.current === undefined) {
                var start = Date.now();
                seperateTimers.current = setInterval(() => {
                    var delta = Date.now() - start;
                    seconds = delta / 1000;
                }, 100);

            };

            incorrectLetters = checkIncorrectLetters(paragraph);

            wpm = (((tempNum + incorrectLetters) / 5) / (seconds / 60)).toFixed(2)

            if (characters[characters.length - 1].classList.contains("correct") || characters[characters.length - 1].classList.contains("incorrect")) {
                let accuracy = document.getElementById("accuracy");
                accPerParagraph.push(accuracy.textContent.replace("%", ""));
                wpmPerParagraphs.push(wpm);
                subtraction = inpField.value.length;
                incorrectLetters = 0;
                seperateTimers.current = undefined;
            }
        }

        let checkIncorrectLetters = (paragraph) => {
            let count = 0;
            let characters = paragraph.querySelectorAll(".letter");

            characters.forEach((letter) => {
                if (letter.classList.contains("incorrect")) {
                    count -= 1;
                }
            })

            return count;

        };

        inpField.addEventListener("input", () => {

            for (let i = 0; i < numberOfParagraphs.length; i += 1) {
                if (i == firstIndex) {
                    if (!numberOfParagraphs[i].querySelectorAll(".letter")[numberOfParagraphs[i].querySelectorAll(".letter").length - 1].classList.contains("correct") || !numberOfParagraphs[i].querySelectorAll(".letter")[numberOfParagraphs[i].querySelectorAll(".letter").length - 1].classList.contains("incorrect")) {
                        wpmPerChapter(numberOfParagraphs[i]);

                        if (numberOfParagraphs[i].querySelectorAll(".letter")[numberOfParagraphs[i].querySelectorAll(".letter").length - 1].classList.contains("correct") || numberOfParagraphs[i].querySelectorAll(".letter")[numberOfParagraphs[i].querySelectorAll(".letter").length - 1].classList.contains("incorrect")) {
                            firstIndex += 1;
                        }
                    }
                }
                else {
                    continue;
                }
            }
        });


    }, []);

    return (
        <div className="showcase" style={{ overflowY: "hidden" }}>

            <button className="click-me">For Mobile Users, please click this first before you start!</button>

            <div>
                <h2 className="book-title">Trivia: {triviatopic}</h2>
            </div>

            <div className="wrapper">
                <input type="text" className="input-field" autoFocus autoCapitalize="off" autoCorrect="off" spellCheck="false" autoComplete="off" />
                <div className="content-box">
                    <div className="typing-text">
                        <div className="paragraphs">
                            {
                                paragraphs2.map((sections, index) =>
                                    <div key={index} className="paragraphs container">
                                        {sections[triviatopic]?.map((paragraphs, index) =>
                                            <div className="paragraph" key={index}>
                                                {paragraphs.paragraph.split(/(?<=\s+)/).map((letter, index) =>
                                                    <span key={index} className="word">
                                                        {letter.split("").map((letter, index) => <span key={index} className="letter">{letter}</span>)}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )
                            }
                        </div>
                    </div>

                    <div className="results">
                        <ul className="result-details">
                            <li className="left-button">
                                <i class="fa-solid fa-left-long previous-button"></i>
                            </li>
                            {/*
                            <li className="time">
                                <span>Time:</span>
                                <span id="timer">00:00</span>
                            </li>
                            */}
                            <li>
                                <span>WPM:</span>
                                <span id="wpm">{wpm}</span>
                            </li>
                            <li>
                                <span>Accuracy:</span>
                                <span id="accuracy">{acc}%</span>
                            </li>
                            <li>
                                <span>Mistakes:</span>
                                <span id="mistakes">{mistakes}</span>
                            </li>
                            <li id="try-again-button">
                                <span onClick={() => location.reload()}>Try Again</span>
                            </li>
                            <li className="right-button">
                                <i class="fa-solid fa-right-long next-button"></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>


            <div class="keyboard1">
                <div class="row">
                    <div class="key key__esc">
                        esc
                    </div>
                    <div class="key key__symbols">
                        !
                        <span> 1 </span>
                    </div>
                    <div class="key key__symbols">
                        @
                        <span> 2 </span>
                    </div>
                    <div class="key key__symbols">
                        #
                        <span> 3 </span>
                    </div>
                    <div class="key key__symbols">
                        $
                        <span> 4 </span>
                    </div>
                    <div class="key key__symbols">
                        %
                        <span> 5 </span>
                    </div>
                    <div class="key key__symbols">
                        ^
                        <span> 6 </span>
                    </div>
                    <div class="key key__symbols">
                        &
                        <span> 7 </span>
                    </div>
                    <div class="key key__symbols">
                        *
                        <span> 8 </span>
                    </div>
                    <div class="key key__symbols">
                        (
                        <span> 9 </span>
                    </div>
                    <div class="key key__symbols">
                        )
                        <span> 0 </span>
                    </div>
                    <div class="key key__symbols">
                        _
                        <span> - </span>
                    </div>
                    <div class="key key__symbols">
                        +
                        <span> = </span>
                    </div>
                    <div class="key key__delete key__icon">
                        Backspace
                    </div>
                </div>

                <div class="row">
                    <div class="key key__oneandhalf">
                        Tab
                    </div>
                    <div class="key">
                        Q
                    </div>
                    <div class="key">
                        W
                    </div>
                    <div class="key">
                        E
                    </div>
                    <div class="key">
                        R
                    </div>
                    <div class="key">
                        T
                    </div>
                    <div class="key">
                        Y
                    </div>
                    <div class="key">
                        U
                    </div>
                    <div class="key">
                        I
                    </div>
                    <div class="key">
                        O
                    </div>
                    <div class="key">
                        P
                    </div>
                    <div class="key key__symbols">
                        {"{"}
                        <span> [ </span>
                    </div>
                    <div class="key key__symbols">
                        {"}"}
                        <span> ] </span>
                    </div>
                    <div class="key key__symbols key__oneandhalf">
                        |
                        <span> \ </span>
                    </div>
                </div>

                <div class="row">
                    <div class="key key__caps">
                        Caps Lock
                    </div>
                    <div class="key">
                        A
                    </div>
                    <div class="key">
                        S
                    </div>
                    <div class="key">
                        D
                    </div>
                    <div class="key">
                        F
                    </div>
                    <div class="key">
                        G
                    </div>
                    <div class="key">
                        H
                    </div>
                    <div class="key">
                        J
                    </div>
                    <div class="key">
                        K
                    </div>
                    <div class="key">
                        L
                    </div>
                    <div class="key key__symbols">
                        :
                        <span> ; </span>
                    </div>
                    <div class="key key__symbols">
                        "
                        <span> ' </span>
                    </div>
                    <div class="key key__enter">
                        Enter
                    </div>
                </div>

                <div class="row">
                    <div class="key key__shift-left">
                        Shift
                    </div>
                    <div class="key">
                        Z
                    </div>
                    <div class="key">
                        X
                    </div>
                    <div class="key">
                        C
                    </div>
                    <div class="key">
                        V
                    </div>
                    <div class="key">
                        B
                    </div>
                    <div class="key">
                        N
                    </div>
                    <div class="key">
                        M
                    </div>
                    <div class="key key__symbols">
                        <i class="fa-solid fa-less-than" style={{ fontSize: "12px" }}></i>
                        <span> , </span>
                    </div>
                    <div class="key key__symbols">
                        <i class="fa-solid fa-greater-than" style={{ fontSize: "12px" }}></i>
                        <span> . </span>
                    </div>
                    <div class="key key__symbols">
                        ?
                        <span> / </span>
                    </div>
                    <div class="key">
                        <i data-feather="arrow-up-circle"></i>
                    </div>
                    <div class="key key__arrow">
                        <i class="fa-solid fa-arrow-up"></i>
                    </div>
                    <div class="key">
                        <i data-feather="trash-2"></i>
                    </div>
                </div>

                <div class="row">
                    <div class="key key__bottom-funct">
                        CTRL
                    </div>
                    <div class="key key__bottom-funct">
                        FN
                    </div>
                    <div class="key key__bottom-funct">
                        ALT
                    </div>
                    <div class="key key__spacebar">
                    </div>
                    <div class="key">
                        ALT
                    </div>
                    <div class="key">
                        CTRL
                    </div>
                    <div class="key key__arrow">
                        <i class="fa-solid fa-arrow-left"></i>
                    </div>
                    <div class="key key__arrow">
                        <i class="fa-solid fa-arrow-down"></i>
                    </div>
                    <div class="key key__arrow">
                        <i data-feather="arrow-right"></i><i class="fa-solid fa-arrow-right"></i>
                    </div>
                </div>
            </div>

            <h2 className="start-message">Press anywhere to start</h2>

            <div className="mobile-message" id="pop-up">
                <div className="special-message">
                    <span class="close">&times;</span>
                    <h2 className="please-read">Please Read Side Note for Mobile Users:</h2>
                    <h1>
                        I really recommend that you disable any keyboard shortcut
                        that inserts a period after double tapping the space bar,
                        as it can lead to your typing accuracy and inputs being wrong.
                        Which can lead to your gameplay being completely inaccurate.
                    </h1>
                    <img src={shortcutPic} alt="Apple keyboard . Shortcut" />
                </div>
            </div>
        </div>

    )
};

export default TypingGameplay;