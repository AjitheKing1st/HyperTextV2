import Header from "./Header"
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useLayoutEffect, useRef } from "react"
import paragraphs from "./paragraphs";
import shortcutPic from "./assets/Shortcut.jpg";
import localforage from "localforage";

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
    let [incorrectLetter, setIncorrectLetters] = useState(0);
    let [denominater, setDenominator] = useState(0);
    let [missedCharacters, addMissedCharater] = useState([]);
    let [wpmPerParagraphs, setWpmPerParagraphs] = useState([]);
    let [accPerParagraph, setAccPerParagrpah] = useState([]);
    let [numOfParagraphs, setNumOfParagraphs] = useState(0);
    let [wpmSeconds, setWpmSeconds] = useState(0);
    let [totalTimeInTotal, setTotalTime] = useState("");
    let [elapsedTime, setElapsedTime] = useState(0);
    let [paragraphIndex, setParagraphIndex] = useState(0);
    let [paragraphElapsedTimers, setParagraphElapsedTimers] = useState([]);
    let [typedValueNumber, setTypedValueNumber] = useState(0);
    let [typedProgress, setTypedProgress] = useState("");
    const [progressRestored, setProgressRestored] = useState(false);

    const levelKey = `${subject}: ${triviatopic}`;

    const getProgressData = () => ({
        wpm,
        cpm,
        accuracy: acc,
        mistakes,
        charIndex,
        correctKeys,
        denominater,
        missedCharacters,
        wpmPerParagraphs,
        accPerParagraph,
        wpmSeconds,
        totalTimeInTotal,
        elapsedTime,
        paragraphElapsedTimers,
        paragraphIndex,
        typedValueNumber,
        typedProgress,
    });

    const saveProgress = async (progress) => {
        try {
            await localforage.setItem(levelKey, progress);
        } catch (error) {
            console.error("Error saving progress:", error);
        }
    };

    const loadProgress = async () => {
        try {
            const savedProgress = await localforage.getItem(levelKey);
            if (savedProgress) {
                setWpm(savedProgress.wpm || 0);
                setCpm(savedProgress.cpm || 0);
                setAcc(savedProgress.accuracy || 0);
                setMistakes(savedProgress.mistakes || 0);
                setCharIndex(savedProgress.charIndex || 0);
                setCorrectKeys(savedProgress.correctKeys || 0);
                setDenominator(savedProgress.denominater || 0);
                addMissedCharater(savedProgress.missedCharacters || []);
                setWpmPerParagraphs(savedProgress.wpmPerParagraphs || []);
                setAccPerParagrpah(savedProgress.accPerParagraph || []);
                setWpmSeconds(savedProgress.wpmSeconds || 0);
                setTotalTime(savedProgress.totalTimeInTotal || "");
                setIncorrectLetters(savedProgress.incorrectLetter || 0);
                setElapsedTime(savedProgress.elapsedTime || 0);
                setTypedProgress(savedProgress.typedProgress || "");
                setParagraphIndex(savedProgress.paragraphIndex || 0);
                setParagraphElapsedTimers(savedProgress.paragraphElapsedTimers || []);
                setTypedValueNumber(savedProgress.typedValueNumber || 0);
            }

            setProgressRestored(true);

        } catch (error) {
            console.error("Error loading progress:", error);
            setProgressRestored(true);
        }
    };

    const resetProgress = async () => {
        await clearProgress();
        resetGameState();
        console.log('Progress has been reset.');
    };

    const resetGameState = () => {

        const inpField = document.querySelector(".prompt-box .input-field");

        inpField.value = "";

        setWpm(0);
        setCpm(0);
        setAcc(0);
        setIncorrectLetters(0);
        setMistakes(0);
        setCharIndex(0);
        setCorrectKeys(0);
        setDenominator(0);
        addMissedCharater([]);
        setWpmPerParagraphs([]);
        setAccPerParagrpah([]);
        setWpmSeconds(0);
        setTotalTime("");
        setElapsedTime(0);
        setTypedProgress("");
        setParagraphIndex(0);
        setParagraphElapsedTimers([]);
        setTypedValueNumber(0);

        async function resetTimer() {
            try {
                await localforage.removeItem(`${levelKey} Total Time`);
            } catch (error) {
                console.error("Failed to reset timer progress:", error);
            }
        }

        resetTimer();

    };

    const clearProgress = async () => {
        try {
            await localforage.removeItem(levelKey);
            await localforage.removeItem(`${levelKey} Total Time`);
            console.log('Progress cleared successfully.');
        } catch (error) {
            console.error('Error clearing progress:', error);
        }
    };

    const restart = async () => {
        await resetProgress();
        window.location.reload();
    };

    useEffect(() => {
        loadProgress();
    }, []);

    useEffect(() => {
        const autosaveInterval = setInterval(() => {
            const progressData = getProgressData();
            saveProgress(progressData);
        }, 500);

        return () => clearInterval(autosaveInterval);
    }, [wpm, cpm, acc, mistakes, incorrectLetter, charIndex, correctKeys, denominater, missedCharacters, wpmPerParagraphs, accPerParagraph, wpmSeconds, totalTimeInTotal, elapsedTime, paragraphElapsedTimers, paragraphIndex, typedValueNumber, typedProgress]);

    const navigate = useNavigate();

    const wpmTimer = useRef();

    useLayoutEffect(() => {

        if (!progressRestored) return;

        const inpField = document.querySelector(".prompt-box .input-field");

        const typingText = document.querySelector(".prompt");

        typingText.querySelectorAll(".letter")[0].classList.add("active");

        const words = document.querySelectorAll(".word");

        const letters = typingText.querySelectorAll(".letter").length;

        const numberOfParagraphs = document.getElementsByClassName("paragraph").length;

        const pausePlaySymbol = document.querySelector(".pause");

        setLetters(letters);
        setNumOfParagraphs(numberOfParagraphs);

        let seconds;

        let timer = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            interval: null,
            lastTypingTime: null,
        };

        let typingTimeout;
        const typingPauseDuration = 1000;
        let start;
        let date;

        function initTyping() {

            let characters = typingText.querySelectorAll(".letter");
            let typedChar = inpField.value.split("")[charIndex];

            const currentTime = new Date().getTime();
            timer.lastTypingTime = currentTime;

            startTimer();

            setTimeout(() => {
                if (new Date().getTime() - timer.lastTypingTime >= 1500) {
                    pauseTimer();
                    pausePlaySymbol.innerHTML = `<i class="fa-solid fa-play"></i>`;
                }
            }, 1500);

            if (wpmTimer.current === undefined) {
                start = Date.now();
                wpmTimer.current = setInterval(() => {
                    date = Date.now() - start + elapsedTime;
                    seconds = date / 1000;
                }, 100);
            };

            setTypedProgress(inpField.value);

            onUserTyping();

            if (charIndex < characters.length) {

                if (typedChar == null) {
                    if (charIndex > 0) {
                        setCharIndex(charIndex -= 1);
                        if (characters[charIndex].classList.contains("incorrect")) {
                            setMistakes(mistakes -= 1);
                            setDenominator(denominater -= 1);
                            setIncorrectLetters(incorrectLetter += 1);

                            for (let i = missedCharacters.length - 1; i >= 0; i -= 1) {
                                if (characters[charIndex].innerText != missedCharacters[i]) {
                                    characters[charIndex].innerText = missedCharacters[i];
                                    missedCharacters.pop();
                                    break;
                                }
                            }
                        }
                        else {
                            setCorrectKeys(correctKeys -= 1);
                            setDenominator(denominater -= 1);
                        }
                        characters[charIndex].classList.remove("correct", "incorrect");
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
                        setIncorrectLetters(incorrectLetter -= 1);
                    }
                    setCharIndex(charIndex += 1);

                    if (charIndex === characters.length) {
                        pauseTimer();
                        clearInterval(timer.current);
                        timer.current = null;
                        const finalTime = `${timer.days}d ${timer.hours}h ${timer.minutes}m ${timer.seconds}s`;

                        setInterval(() => {
                            navigate(`/${subject}/${triviatopic}/results`, { state: { accuracy: ((correctKeys / denominater) * 100).toFixed(2), time: finalTime, wpm: (((inpField.value.length + incorrectLetter) / 5) / (seconds / 60)).toFixed(2), cpm: charIndex - mistakes, mistakes: mistakes, wordsPerMinutePerParagraphs: wpmPerParagraphs, accPerParagraph: accPerParagraph } });
                        }, 100)

                    }
                }

                characters.forEach(span => span.classList.remove("active"));
                characters[charIndex].classList.add("active");

                setCpm(charIndex - mistakes);
                setAcc(((correctKeys / denominater) * 100).toFixed(2));

                let currentSeconds = seconds > 0 ? seconds : elapsedTime / 1000;

                if (currentSeconds === 0) {
                    currentSeconds = 1;
                }

                setWpm((((inpField.value.length + incorrectLetter) / 5) / (currentSeconds / 60)).toFixed(2));

                for (let i = 0; i < words.length; i += 1) {
                    if (words[i].querySelectorAll(".letter")[0].classList.contains("active")) {
                    }
                }
            }
            else {
                pauseTimer();
            }

        };

        function onUserTyping() {

            clearTimeout(typingTimeout);

            typingTimeout = setTimeout(() => {

                clearInterval(wpmTimer.current);

                wpmTimer.current = undefined;

                elapsedTime += Date.now() - start;

                setElapsedTime(elapsedTime);

                localStorage.setItem("elapsedTime", elapsedTime);

            }, typingPauseDuration);
        }

        function updateTimer() {
            timer.seconds += 1;
            if (timer.seconds >= 60) {
                timer.seconds = 0;
                timer.minutes += 1;
            }
            if (timer.minutes >= 60) {
                timer.minutes = 0;
                timer.hours += 1;
            }
            if (timer.hours >= 24) {
                timer.hours = 0;
                timer.days += 1;
            }

            setTotalTime(`${timer.days}d ${timer.hours}h ${timer.minutes}m ${timer.seconds}s`);
            saveTimerProgress();
        }

        function startTimer() {
            if (!timer.interval) {
                timer.interval = setInterval(updateTimer, 1000);
                pausePlaySymbol.innerHTML = `<i class="fa-solid fa-pause"></i>`;
            }
        }

        function pauseTimer() {
            if (timer.interval) {
                clearInterval(timer.interval);
                timer.interval = null;
            }
        }

        async function saveTimerProgress() {
            try {
                await localforage.setItem(`${levelKey} Total Time`, {
                    days: timer.days,
                    hours: timer.hours,
                    minutes: timer.minutes,
                    seconds: timer.seconds,
                });
            } catch (error) {
                console.error("Failed to save timer progress:", error);
            }
        }

        async function restoreTimerProgress() {
            try {
                const savedProgress = await localforage.getItem(`${levelKey} Total Time`);
                if (savedProgress) {
                    timer.days = savedProgress.days || 0;
                    timer.hours = savedProgress.hours || 0;
                    timer.minutes = savedProgress.minutes || 0;
                    timer.seconds = savedProgress.seconds || 0;

                    setTotalTime(`${timer.days}d ${timer.hours}h ${timer.minutes}m ${timer.seconds}s`);
                }
            } catch (error) {
                console.error("Failed to restore timer progress:", error);
            }
        }

        function isMobile() {
            return /Mobi|Android/i.test(navigator.userAgent);
        }

        const mobileKeys = document.querySelectorAll(".screen-keyboard .row button div");

        if (isMobile()) {

            inpField.readOnly = true;

            mobileKeys.forEach((keys, index) => {

                keys.addEventListener("touchstart", () => {

                    inpField.focus();

                    if (keys.textContent !== "" && (index != 44 || index != 38 || index != 29)) {

                        inpField.value += keys.textContent;
                        initTyping();

                    }
                    else {

                        if (index == 37) {

                            if (inpField.value == "") {
                                inpField.value = inpField.value.slice(0, -1);
                            }
                            else {
                                inpField.value = inpField.value.slice(0, -1);
                                initTyping();
                            }
                        }
                    }
                })
            });
        }
        else {
            inpField.readOnly = false;

            mobileKeys.forEach((keys, index) => {

                keys.addEventListener("click", () => {

                    inpField.focus();

                    if (keys.textContent !== "" && (index != 44 || index != 38 || index != 29)) {

                        inpField.value += keys.textContent;
                        initTyping();

                    }
                    else {

                        if (index == 37) {

                            if (inpField.value == "") {
                                inpField.value = inpField.value.slice(0, -1);
                            }
                            else {
                                inpField.value = inpField.value.slice(0, -1);
                                initTyping();
                            }
                        }
                    }
                })
            });
        }

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

        const firstLetter = typingText.querySelector(".letter");

        if (firstLetter && (firstLetter.classList.contains("correct") || firstLetter.classList.contains("incorrect"))) {
            firstLetter.classList.remove("active");
        }

        document.addEventListener("keydown", () => inpField.focus());
        inpField.addEventListener("input", initTyping);
        inpField.addEventListener("keydown", (event) => {

            const key = event.key.toLowerCase();

            if (["arrowup", "arrowdown", "arrowleft", "arrowright"].includes(key)) {
                event.preventDefault();
            }
        });

        restoreTimerProgress();

        return () => {
            inpField.removeEventListener("input", initTyping);
            inpField.removeEventListener("keydown", (event) => {
                const key = event.key.toLowerCase();
                if (["arrowup", "arrowdown", "arrowleft", "arrowright"].includes(key)) {
                    event.preventDefault();
                }
            });

            if (wpmTimer.current) {
                clearInterval(wpmTimer.current);
            }
            if (typingTimeout) {
                clearTimeout(typingTimeout);
            }
            if (timer.interval) {
                clearInterval(timer.interval);
            }
        };

    }, [progressRestored]);

    useLayoutEffect(() => {
        const inpField = document.querySelector(".prompt-box .input-field");
        const typingText = document.querySelector(".prompt");

        if (typedProgress) {

            inpField.value = typedProgress;

            setCharIndex(typedProgress.length);

            const characters = typingText.querySelectorAll(".letter");

            typedProgress.split("").forEach((char, index) => {
                if (characters[index]) {
                    if (characters[index].innerText === char) {
                        characters[index].classList.add("correct");
                    } else {
                        characters[index].innerText = char;
                        characters[index].classList.add("incorrect");
                    }
                }
            });

            if (typedProgress.length < characters.length) {
                characters.forEach((char) => char.classList.remove("active"));
                characters[typedProgress.length].classList.add("active");
            }
        }
    }, [typedProgress]);

    useEffect(() => {
        const keys = document.querySelectorAll('.screen-keyboard-desktop button');

        document.addEventListener('keydown', (event) => {
            const key = event.key.toLowerCase();

            for (let i = 0; i < keys.length; i += 1) {
                if (key == keys[i].textContent.toLowerCase()) {
                    keys[i].classList.add('active');
                    break;
                }
                else if (key == "~" || key == "`") {
                    keys[0].classList.add('active');
                    break;
                }
                else if (key == "1" || key == "!") {
                    keys[1].classList.add("active");
                    break;
                }
                else if (key == "2" || key == "@") {
                    keys[2].classList.add("active");
                    break;
                }
                else if (key == "3" || key == "#") {
                    keys[3].classList.add("active");
                    break;
                }
                else if (key == "4" || key == "$") {
                    keys[4].classList.add("active");
                    break;
                }
                else if (key == "5" || key == "%") {
                    keys[5].classList.add("active");
                    break;
                }
                else if (key == "6" || key == "^") {
                    keys[6].classList.add("active");
                    break;
                }
                else if (key == "7" || key == "&") {
                    keys[7].classList.add("active");
                    break;
                }
                else if (key == "8" || key == "*") {
                    keys[8].classList.add("active");
                    break;
                }
                else if (key == "9" || key == "(") {
                    keys[9].classList.add("active");
                    break;
                }
                else if (key == "0" || key == ")") {
                    keys[10].classList.add("active");
                    break;
                }
                else if (key == "-" || key == "_") {
                    keys[11].classList.add("active");
                    break;
                }
                else if (key == "+" || key == "=") {
                    keys[12].classList.add("active");
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
                else if (key == "capslock") {
                    keys[28].classList.add("active");
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
                else if (key == "<" || key == ",") {
                    keys[49].classList.add("active");
                    break;
                }
                else if (key == ">" || key == ".") {
                    keys[50].classList.add("active");
                    break;
                }
                else if (key == `?` || key == `/`) {
                    keys[51].classList.add("active");
                    break;
                }
                else if (key == "control") {
                    keys[53].classList.add("active");
                    keys[58].classList.add("active");
                    break;
                }
                else if (key == "meta") {
                    keys[54].classList.add("active");
                    break;
                }
                else if (key == "alt") {
                    keys[55].classList.add("active");
                    keys[57].classList.add("active");
                    break;
                }
                else if (key == " ") {
                    keys[56].classList.add("active");
                    break;
                }
                else if (key == "arrowleft") {
                    keys[59].classList.add("active");
                    break;
                }
                else if (key == "arrowup") {
                    keys[60].classList.add("active");
                    break;
                }
                else if (key == "arrowdown") {
                    keys[61].classList.add("active");
                    break;
                }
                else if (key == "arrowright") {
                    keys[62].classList.add("active");
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
                else if (key == "~" || key == "`") {
                    keys[0].classList.remove('active');
                    break;
                }
                else if (key == "1" || key == "!") {
                    keys[1].classList.remove("active");
                    break;
                }
                else if (key == "2" || key == "@") {
                    keys[2].classList.remove("active");
                    break;
                }
                else if (key == "3" || key == "#") {
                    keys[3].classList.remove("active");
                    break;
                }
                else if (key == "4" || key == "$") {
                    keys[4].classList.remove("active");
                    break;
                }
                else if (key == "5" || key == "%") {
                    keys[5].classList.remove("active");
                    break;
                }
                else if (key == "6" || key == "^") {
                    keys[6].classList.remove("active");
                    break;
                }
                else if (key == "7" || key == "&") {
                    keys[7].classList.remove("active");
                    break;
                }
                else if (key == "8" || key == "*") {
                    keys[8].classList.remove("active");
                    break;
                }
                else if (key == "9" || key == "(") {
                    keys[9].classList.remove("active");
                    break;
                }
                else if (key == "0" || key == ")") {
                    keys[10].classList.remove("active");
                    break;
                }
                else if (key == "-" || key == "_") {
                    keys[11].classList.remove("active");
                    break;
                }
                else if (key == "+" || key == "=") {
                    keys[12].classList.remove("active");
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
                else if (key == "capslock") {
                    keys[28].classList.remove("active");
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
                else if (key == "<" || key == ",") {
                    keys[49].classList.remove("active");
                    break;
                }
                else if (key == ">" || key == ".") {
                    keys[50].classList.remove("active");
                    break;
                }
                else if (key == `?` || key == `/`) {
                    keys[51].classList.remove("active");
                    break;
                }
                else if (key == "control") {
                    keys[53].classList.remove("active");
                    keys[58].classList.remove("active");
                    break;
                }
                else if (key == "meta") {
                    keys[54].classList.remove("active");
                    break;
                }
                else if (key == "alt") {
                    keys[55].classList.remove("active");
                    keys[57].classList.remove("active");
                    break;
                }
                else if (key == " ") {
                    keys[56].classList.remove("active");
                    break;
                }
                else if (key == "arrowleft") {
                    keys[59].classList.remove("active");
                    break;
                }
                else if (key == "arrowup") {
                    keys[60].classList.remove("active");
                    break;
                }
                else if (key == "arrowdown") {
                    keys[61].classList.remove("active");
                    break;
                }
                else if (key == "arrowright") {
                    keys[62].classList.remove("active");
                    break;
                }
            };
        });

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

        const mobileKeys = document.querySelectorAll(".screen-keyboard .row button div");

        mobileKeys.forEach((keys) => {
            keys.addEventListener("touchstart", () => {
                keys.classList.add("active");
            })
        });

        mobileKeys.forEach((keys) => {
            keys.addEventListener("touchend", () => {
                keys.classList.remove("active");
            })
        });

        mobileKeys.forEach((keys) => {
            keys.addEventListener("mousedown", () => {
                keys.classList.add("active");
            })
        });

        mobileKeys.forEach((keys) => {
            keys.addEventListener("mouseup", () => {
                keys.classList.remove("active");
            })
        });

        document.addEventListener('keydown', (event) => {
            const key = event.key.toLowerCase();

            for (let i = 0; i < mobileKeys.length; i += 1) {
                if (key == mobileKeys[i].textContent.toLowerCase()) {
                    mobileKeys[i].classList.add('active');
                    break;
                }
                else if (key == "shift") {
                    mobileKeys[29].classList.add('active');
                    break;
                }
                else if (key == "backspace") {
                    mobileKeys[37].classList.add("active");
                    break;
                }
                else if (key == "control") {
                    mobileKeys[38].classList.add("active");
                    break;
                }
                else if (key == "'") {
                    mobileKeys[39].classList.add("active");
                    break;
                }
                else if (key == ",") {
                    mobileKeys[40].classList.add("active");
                    break;
                }
                else if (key == " ") {
                    mobileKeys[41].classList.add("active");
                    break;
                }
                else if (key == ".") {
                    mobileKeys[42].classList.add("active");
                    break;
                }
                else if (key == `"`) {
                    mobileKeys[43].classList.add("active");
                    break;
                }
                else if (key == "enter") {
                    mobileKeys[44].classList.add("active");
                    break;
                }
            };

        });

        document.addEventListener('keyup', (event) => {
            const key = event.key.toLowerCase();

            for (let i = 0; i < mobileKeys.length; i += 1) {
                if (key == mobileKeys[i].textContent.toLowerCase()) {
                    mobileKeys[i].classList.remove('active');
                    break;
                }
                else if (key == "shift") {
                    mobileKeys[29].classList.remove('active');
                    break;
                }
                else if (key == "backspace") {
                    mobileKeys[37].classList.remove("active");
                    break;
                }
                else if (key == "control") {
                    mobileKeys[38].classList.remove("active");
                    break;
                }
                else if (key == "'") {
                    mobileKeys[39].classList.remove("active");
                    break;
                }
                else if (key == ",") {
                    mobileKeys[40].classList.remove("active");
                    break;
                }
                else if (key == " ") {
                    mobileKeys[41].classList.remove("active");
                    break;
                }
                else if (key == ".") {
                    mobileKeys[42].classList.remove("active");
                    break;
                }
                else if (key == `"`) {
                    mobileKeys[43].classList.remove("active");
                    break;
                }
                else if (key == "enter") {
                    mobileKeys[44].classList.remove("active");
                    break;
                }
            };
        });

        let shiftActive = false;
        let controlActive = false;

        mobileKeys[29].addEventListener("click", () => {

            shiftActive = !shiftActive;
            mobileKeys[29].style.backgroundColor = shiftActive ? '#0056b3' : '#1d1e2a';

            if (shiftActive === true) {
                mobileKeys[0].textContent = "!";
                mobileKeys[1].textContent = "@";
                mobileKeys[2].textContent = "#";
                mobileKeys[3].textContent = "$";
                mobileKeys[4].textContent = "%";
                mobileKeys[5].textContent = "^";
                mobileKeys[6].textContent = "&";
                mobileKeys[7].textContent = "*";
                mobileKeys[8].textContent = "(";
                mobileKeys[9].textContent = ")";
                mobileKeys[10].textContent = "Q";
                mobileKeys[11].textContent = "W";
                mobileKeys[12].textContent = "E";
                mobileKeys[13].textContent = "R";
                mobileKeys[14].textContent = "T";
                mobileKeys[15].textContent = "Y";
                mobileKeys[16].textContent = "U";
                mobileKeys[17].textContent = "I";
                mobileKeys[18].textContent = "O";
                mobileKeys[19].textContent = "P";
                mobileKeys[20].textContent = "A";
                mobileKeys[21].textContent = "S";
                mobileKeys[22].textContent = "D";
                mobileKeys[23].textContent = "F";
                mobileKeys[24].textContent = "G";
                mobileKeys[25].textContent = "H";
                mobileKeys[26].textContent = "J";
                mobileKeys[27].textContent = "K";
                mobileKeys[28].textContent = "L";
                mobileKeys[30].textContent = "Z";
                mobileKeys[31].textContent = "X";
                mobileKeys[32].textContent = "C";
                mobileKeys[33].textContent = "V";
                mobileKeys[34].textContent = "B";
                mobileKeys[35].textContent = "N";
                mobileKeys[36].textContent = "M";
                mobileKeys[39].textContent = "?";
                mobileKeys[40].textContent = ";";
                mobileKeys[42].textContent = ":";
                mobileKeys[43].textContent = "-";
            }
            else {
                mobileKeys[0].textContent = "1";
                mobileKeys[1].textContent = "2";
                mobileKeys[2].textContent = "3";
                mobileKeys[3].textContent = "4";
                mobileKeys[4].textContent = "5";
                mobileKeys[5].textContent = "6";
                mobileKeys[6].textContent = "7";
                mobileKeys[7].textContent = "8";
                mobileKeys[8].textContent = "9";
                mobileKeys[9].textContent = "0";
                mobileKeys[10].textContent = "q";
                mobileKeys[11].textContent = "w";
                mobileKeys[12].textContent = "e";
                mobileKeys[13].textContent = "r";
                mobileKeys[14].textContent = "t";
                mobileKeys[15].textContent = "y";
                mobileKeys[16].textContent = "u";
                mobileKeys[17].textContent = "i";
                mobileKeys[18].textContent = "o";
                mobileKeys[19].textContent = "p";
                mobileKeys[20].textContent = "a";
                mobileKeys[21].textContent = "s";
                mobileKeys[22].textContent = "d";
                mobileKeys[23].textContent = "f";
                mobileKeys[24].textContent = "g";
                mobileKeys[25].textContent = "h";
                mobileKeys[26].textContent = "j";
                mobileKeys[27].textContent = "k";
                mobileKeys[28].textContent = "l";
                mobileKeys[30].textContent = "z";
                mobileKeys[31].textContent = "x";
                mobileKeys[32].textContent = "c";
                mobileKeys[33].textContent = "v";
                mobileKeys[34].textContent = "b";
                mobileKeys[35].textContent = "n";
                mobileKeys[36].textContent = "m";
                mobileKeys[39].textContent = "'";
                mobileKeys[40].textContent = ",";
                mobileKeys[42].textContent = ".";
                mobileKeys[43].textContent = `"`;
            }

            if (controlActive === true) {
                controlActive = !controlActive;
                mobileKeys[38].style.backgroundColor = controlActive ? '#0056b3' : '#1d1e2a';

                mobileKeys[0].textContent = "!";
                mobileKeys[1].textContent = "@";
                mobileKeys[2].textContent = "#";
                mobileKeys[3].textContent = "$";
                mobileKeys[4].textContent = "%";
                mobileKeys[5].textContent = "^";
                mobileKeys[6].textContent = "&";
                mobileKeys[7].textContent = "*";
                mobileKeys[8].textContent = "(";
                mobileKeys[9].textContent = ")";
                mobileKeys[10].textContent = "Q";
                mobileKeys[11].textContent = "W";
                mobileKeys[12].textContent = "E";
                mobileKeys[13].textContent = "R";
                mobileKeys[14].textContent = "T";
                mobileKeys[15].textContent = "Y";
                mobileKeys[16].textContent = "U";
                mobileKeys[17].textContent = "I";
                mobileKeys[18].textContent = "O";
                mobileKeys[19].textContent = "P";
                mobileKeys[20].textContent = "A";
                mobileKeys[21].textContent = "S";
                mobileKeys[22].textContent = "D";
                mobileKeys[23].textContent = "F";
                mobileKeys[24].textContent = "G";
                mobileKeys[25].textContent = "H";
                mobileKeys[26].textContent = "J";
                mobileKeys[27].textContent = "K";
                mobileKeys[28].textContent = "L";
                mobileKeys[30].textContent = "Z";
                mobileKeys[31].textContent = "X";
                mobileKeys[32].textContent = "C";
                mobileKeys[33].textContent = "V";
                mobileKeys[34].textContent = "B";
                mobileKeys[35].textContent = "N";
                mobileKeys[36].textContent = "M";
                mobileKeys[39].textContent = "?";
                mobileKeys[40].textContent = ";";
                mobileKeys[42].textContent = ":";
                mobileKeys[43].textContent = "-";
            }
        })

        mobileKeys[38].addEventListener("click", () => {
            controlActive = !controlActive;
            mobileKeys[38].style.backgroundColor = controlActive ? '#0056b3' : '#1d1e2a';

            if (controlActive === true) {
                mobileKeys[10].textContent = "!";
                mobileKeys[11].textContent = "@";
                mobileKeys[12].textContent = "#";
                mobileKeys[13].textContent = "$";
                mobileKeys[14].textContent = "%";
                mobileKeys[15].textContent = "^";
                mobileKeys[16].textContent = "&";
                mobileKeys[17].textContent = "*";
                mobileKeys[18].textContent = "(";
                mobileKeys[19].textContent = ")";
                mobileKeys[20].textContent = "~";
                mobileKeys[21].textContent = "<";
                mobileKeys[22].textContent = ">";
                mobileKeys[23].textContent = "[";
                mobileKeys[24].textContent = "]";
                mobileKeys[25].textContent = "{";
                mobileKeys[26].textContent = "}";
                mobileKeys[27].textContent = "|";
                mobileKeys[28].textContent = "\\";
                mobileKeys[30].textContent = "`";
                mobileKeys[31].textContent = "/";
                mobileKeys[32].textContent = "?";
                mobileKeys[33].textContent = "-";
                mobileKeys[34].textContent = "_";
                mobileKeys[35].textContent = "+";
                mobileKeys[36].textContent = "=";
            }
            else {
                mobileKeys[10].textContent = "q";
                mobileKeys[11].textContent = "w";
                mobileKeys[12].textContent = "e";
                mobileKeys[13].textContent = "r";
                mobileKeys[14].textContent = "t";
                mobileKeys[15].textContent = "y";
                mobileKeys[16].textContent = "u";
                mobileKeys[17].textContent = "i";
                mobileKeys[18].textContent = "o";
                mobileKeys[19].textContent = "p";
                mobileKeys[20].textContent = "a";
                mobileKeys[21].textContent = "s";
                mobileKeys[22].textContent = "d";
                mobileKeys[23].textContent = "f";
                mobileKeys[24].textContent = "g";
                mobileKeys[25].textContent = "h";
                mobileKeys[26].textContent = "j";
                mobileKeys[27].textContent = "k";
                mobileKeys[28].textContent = "l";
                mobileKeys[30].textContent = "z";
                mobileKeys[31].textContent = "x";
                mobileKeys[32].textContent = "c";
                mobileKeys[33].textContent = "v";
                mobileKeys[34].textContent = "b";
                mobileKeys[35].textContent = "n";
                mobileKeys[36].textContent = "m";
            }

            if (shiftActive === true) {
                shiftActive = !shiftActive;
                mobileKeys[29].style.backgroundColor = shiftActive ? '#0056b3' : '#1d1e2a';
                mobileKeys[0].textContent = "1";
                mobileKeys[1].textContent = "2";
                mobileKeys[2].textContent = "3";
                mobileKeys[3].textContent = "4";
                mobileKeys[4].textContent = "5";
                mobileKeys[5].textContent = "6";
                mobileKeys[6].textContent = "7";
                mobileKeys[7].textContent = "8";
                mobileKeys[8].textContent = "9";
                mobileKeys[9].textContent = "0";
                mobileKeys[39].textContent = "'";
                mobileKeys[40].textContent = ",";
                mobileKeys[42].textContent = ".";
                mobileKeys[43].textContent = `"`;
            }

        });

    }, []);

    useEffect(() => {
        let paragraphs = document.querySelectorAll(".paragraphs.container");

        const nextBtn = document.querySelector(".right-button");
        const prevBtn = document.querySelector(".left-button");

        let paragraphsLimit = paragraphs.length;

        let array = [];

        const typingSection = document.querySelector(".prompt-box");

        const mobileKeys = document.querySelectorAll(".screen-keyboard .row button div");

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

        mobileKeys.forEach((keys, index) => {

            keys.addEventListener("touchstart", () => {

                if (index == 44) {

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
            })
        });

        mobileKeys.forEach((keys, index) => {

            keys.addEventListener("click", () => {

                if (index == 44) {

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
            })
        });

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

        if (!progressRestored) return;

        let numberOfParagraphs = document.querySelectorAll(".paragraph");

        const inpField = document.querySelector(".prompt-box .input-field");

        let seconds;

        let incorrectLetters;

        let array2 = [];

        const showNumOfParagraphs = () => numberOfParagraphs.forEach((p, index) => {
            if (p.textContent !== "") {
                array2.push(index);
            };
        });

        showNumOfParagraphs();

        let subtraction = 0;

        let wpm;

        let typingTimeout;

        const typingPauseDuration = 1000;

        let start;

        let elapsedTimer;

        if (paragraphElapsedTimers.length === 0) {
            elapsedTimer = 0;
        }
        else {
            var max = Math.max(...paragraphElapsedTimers);
            elapsedTimer = max;
        }

        const typingText = document.querySelector(".prompt");

        const letters = typingText.querySelectorAll(".letter").length;

        let accuracy = document.getElementById("accuracy");

        if (typedValueNumber > 0) {
            subtraction = typedValueNumber;
        }

        function wpmPerChapter(paragraph) {

            let characters = paragraph.querySelectorAll(".letter");

            let tempNum = inpField.value.length - subtraction;

            if (seperateTimers.current === undefined) {
                start = Date.now();
                seperateTimers.current = setInterval(() => {
                    var delta = Date.now() - start + elapsedTimer;
                    seconds = delta / 1000;
                }, 100);
            };

            onUserTyping();

            incorrectLetters = checkIncorrectLetters(paragraph);

            let currentSeconds = seconds > 0 ? seconds : elapsedTimer / 1000;

            if (currentSeconds === 0) {
                currentSeconds = 1;
            }

            wpm = (((tempNum + incorrectLetters) / 5) / (currentSeconds / 60)).toFixed(2);

            if (characters[characters.length - 2].classList.contains("correct") || characters[characters.length - 2].classList.contains("incorrect")) {
                accPerParagraph.push(accuracy.textContent.replace("%", ""));
                wpmPerParagraphs.push(wpm);
                subtraction = inpField.value.length;
                setTypedValueNumber(subtraction);
                incorrectLetters = 0;
                clearInterval(seperateTimers.current);
                seperateTimers.current = undefined;
                elapsedTimer = 0;
                start = undefined;
            }
            else if (inpField.value.length === letters) {
                accPerParagraph.push(accuracy.textContent.replace("%", ""));
                wpmPerParagraphs.push(wpm);
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

        function onUserTyping() {

            clearTimeout(typingTimeout);

            typingTimeout = setTimeout(() => {

                clearInterval(seperateTimers.current);

                seperateTimers.current = undefined;

                elapsedTimer += Date.now() - start;

                paragraphElapsedTimers.push(elapsedTimer);

                if (paragraphElapsedTimers.length > 1) {
                    paragraphElapsedTimers.splice(0, paragraphElapsedTimers.length - 1);
                }

            }, typingPauseDuration);
        }

        const mobileKeys = document.querySelectorAll(".screen-keyboard .row button div");

        function handleParagraphCompletion() {
            for (let i = 0; i < numberOfParagraphs.length; i += 1) {

                if (i == paragraphIndex) {

                    if (!numberOfParagraphs[i].querySelectorAll(".letter")[numberOfParagraphs[i].querySelectorAll(".letter").length - 2].classList.contains("correct") || !numberOfParagraphs[i].querySelectorAll(".letter")[numberOfParagraphs[i].querySelectorAll(".letter").length - 2].classList.contains("incorrect")) {

                        wpmPerChapter(numberOfParagraphs[i]);

                        if (numberOfParagraphs[i].querySelectorAll(".letter")[numberOfParagraphs[i].querySelectorAll(".letter").length - 2].classList.contains("correct") || numberOfParagraphs[i].querySelectorAll(".letter")[numberOfParagraphs[i].querySelectorAll(".letter").length - 2].classList.contains("incorrect")) {
                            setParagraphIndex(paragraphIndex += 1)
                        }
                    }
                }
            }
        }

        inpField.addEventListener("input", handleParagraphCompletion);

        function isMobile() {
            return /Mobi|Android/i.test(navigator.userAgent);
        }

        if (isMobile()) {
            mobileKeys.forEach((key) => {
                key.addEventListener("touchstart", handleParagraphCompletion)
            });
        }
        else {
            mobileKeys.forEach((key) => {
                key.addEventListener("click", handleParagraphCompletion)
            });
        }

    }, [progressRestored]);

    return (
        <>
            <div class="fit-height default">

                <main className="dark">

                    <div class="prompt-grid">

                        <Header />

                        <button className="click-me">For Mobile Users, please click this first before you start!</button>

                        <div className="results">
                            <ul className="result-details">
                                <li className="pause">
                                    <i class="fa-solid fa-play"></i>
                                </li>
                                <li className="left-button">
                                    <i class="fa-solid fa-left-long previous-button"></i>
                                </li>
                                <li className="stats-names">
                                    <span>WPM:</span>
                                    <span id="wpm">{wpm}</span>
                                </li>
                                <li className="stats-names">
                                    <span>Accuracy:</span>
                                    <span id="accuracy">{acc}%</span>
                                </li>
                                <li className="stats-names">
                                    <span>Mistakes:</span>
                                    <span id="mistakes">{mistakes}</span>
                                </li>
                                <li id="try-again-button">
                                    <span onClick={() => restart()}>Try Again</span>
                                </li>
                                <li className="right-button">
                                    <i class="fa-solid fa-right-long next-button"></i>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="book-title">{subject}: {triviatopic}</h2>
                        </div>

                        <div class="prompt-box hide-scrollbar">
                            <input type="text" className="input-field" autoCapitalize="off" autoCorrect="off" spellCheck="false" autoComplete="off" />
                            <section class="prompt">
                                <div class="paragraphs-box">
                                    {
                                        paragraphs.map((sections, index) =>
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
                            </section>
                        </div>

                        <section class="screen-keyboard-desktop">
                            <div class="keys main">
                                <button disabled="" class="accent">
                                    <div>
                                        <div className="two-symbols">~</div>
                                        <div>`</div>
                                    </div>
                                </button>
                                <button disabled="" class="accent">
                                    <div>
                                        <div className="two-symbols">!</div>
                                        <div>1</div>
                                    </div>
                                </button>
                                <button disabled="" class="accent">
                                    <div>
                                        <div className="two-symbols">@</div>
                                        <div>2</div>
                                    </div>
                                </button>
                                <button disabled="" class="accent">
                                    <div>
                                        <div className="two-symbols">#</div>
                                        <div>3</div>
                                    </div>
                                </button>
                                <button disabled="" class="accent">
                                    <div>
                                        <div className="two-symbols">$</div>
                                        <div>4</div>
                                    </div>
                                </button>
                                <button disabled="" class="accent">
                                    <div>
                                        <div className="two-symbols">%</div>
                                        <div>5</div>
                                    </div>
                                </button>
                                <button disabled="" class="accent">
                                    <div>
                                        <div className="two-symbols">^</div>
                                        <div>6</div>
                                    </div>
                                </button>
                                <button disabled="" class="accent">
                                    <div>
                                        <div className="two-symbols">&</div>
                                        <div>7</div>
                                    </div>
                                </button>
                                <button disabled="" class="accent">
                                    <div>
                                        <div className="two-symbols">*</div>
                                        <div>8</div>
                                    </div>
                                </button>
                                <button disabled="" class="accent">
                                    <div>
                                        <div className="two-symbols">(</div>
                                        <div>9</div>
                                    </div>
                                </button>
                                <button disabled="" class="accent">
                                    <div>
                                        <div className="two-symbols">)</div>
                                        <div>0</div>
                                    </div>
                                </button>
                                <button disabled="" class="accent">
                                    <div>
                                        <div className="two-symbols">_</div>
                                        <div>-</div>
                                    </div>
                                </button>
                                <button disabled="" class="accent">
                                    <div>
                                        <div className="two-symbols">+</div>
                                        <div>=</div>
                                    </div>
                                </button>
                                <button disabled="" class="accent backspace special">
                                    <div>Backspace</div>
                                </button>
                                <button disabled="" class="accent tab special">
                                    <div>Tab</div>
                                </button>
                                <button disabled="">
                                    <div>q</div>
                                </button>
                                <button disabled="">
                                    <div>w</div>
                                </button>
                                <button disabled="">
                                    <div>e</div>
                                </button>
                                <button disabled="">
                                    <div>r</div>
                                </button>
                                <button disabled="">
                                    <div>t</div>
                                </button>
                                <button disabled="">
                                    <div>y</div>
                                </button>
                                <button disabled="">
                                    <div>u</div>
                                </button>
                                <button disabled="">
                                    <div>i</div>
                                </button>
                                <button disabled="">
                                    <div>o</div>
                                </button>
                                <button disabled="">
                                    <div>p</div>
                                </button>
                                <button disabled="">
                                    <div>
                                        <div className="two-symbols">{"{"}</div>
                                        <div>[</div>
                                    </div>
                                </button>
                                <button disabled="">
                                    <div>
                                        <div className="two-symbols">{"}"}</div>
                                        <div>]</div>
                                    </div>
                                </button>
                                <button disabled="" class="backslash">
                                    <div>
                                        <div className="two-symbols">|</div>
                                        <div>\</div>
                                    </div>
                                </button>
                                <button disabled="" class="accent caps special">
                                    <div>CapsLock</div>
                                </button>
                                <button disabled="">
                                    <div>a</div>
                                </button>
                                <button disabled="">
                                    <div>s</div>
                                </button>
                                <button disabled="">
                                    <div>d</div>
                                </button>
                                <button disabled="" class="bump">
                                    <div>f</div>
                                </button>
                                <button disabled="">
                                    <div>g</div>
                                </button>
                                <button disabled="">
                                    <div>h</div>
                                </button>
                                <button disabled="" class="bump">
                                    <div>j</div>
                                </button>
                                <button disabled="">
                                    <div>k</div>
                                </button>
                                <button disabled="">
                                    <div>l</div>
                                </button>
                                <button disabled="">
                                    <div>
                                        <div className="two-symbols">:</div>
                                        <div>;</div>
                                    </div>
                                </button>
                                <button disabled="">
                                    <div>
                                        <div className="two-symbols">"</div>
                                        <div>'</div>
                                    </div>
                                </button>
                                <button disabled="" class="accent enter special">
                                    <div>Enter</div>
                                </button>
                                <button disabled="" class="accent shift-left special">
                                    <div>Shift</div>
                                </button>
                                <button disabled="">
                                    <div>z</div>
                                </button>
                                <button disabled="">
                                    <div>x</div>
                                </button>
                                <button disabled="">
                                    <div>c</div>
                                </button>
                                <button disabled="">
                                    <div>v</div>
                                </button>
                                <button disabled="">
                                    <div>b</div>
                                </button>
                                <button disabled="">
                                    <div>n</div>
                                </button>
                                <button disabled="">
                                    <div>m</div>
                                </button>
                                <button disabled="">
                                    <div>
                                        <div className="two-symbols">{"<"}</div>
                                        <div>,</div>
                                    </div>
                                </button>
                                <button disabled="">
                                    <div>
                                        <div className="two-symbols">{">"}</div>
                                        <div>.</div>
                                    </div>
                                </button>
                                <button disabled="">
                                    <div>
                                        <div className="two-symbols">?</div>
                                        <div>/</div>
                                    </div>
                                </button>
                                <button disabled="" class="accent shift-right special">
                                    <div>Shift</div>
                                </button>
                                <button disabled="" class="accent ctrl-left special">
                                    <div>Ctrl</div>
                                </button>
                                <button disabled="" class="accent meta">
                                    <div><i class="fa-brands fa-windows"></i></div>
                                </button>
                                <button disabled="" class="accent alt special">
                                    <div>Alt</div>
                                </button>
                                <button disabled="" class="space special">
                                    <div> </div>
                                </button>
                                <button disabled="" class="accent alt-gr special">
                                    <div>Alt</div>
                                </button>
                                <button disabled="" class="accent ctrl-right special">
                                    <div>Ctrl</div>
                                </button>
                                <button disabled="" class="accent arrow-left">
                                    <div><i class="fa-solid fa-arrow-left"></i></div>
                                </button>
                                <button disabled="" class="accent arrow-up">
                                    <div><i class="fa-solid fa-arrow-up"></i></div>
                                </button>
                                <button disabled="" class="accent arrow-down">
                                    <div><i class="fa-solid fa-arrow-down"></i></div>
                                </button>
                                <button disabled="" class="accent arrow-right">
                                    <div><i class="fa-solid fa-arrow-right"></i></div>
                                </button>
                            </div>
                        </section>

                        <section class="screen-keyboard">
                            <div class="main">
                                <div class="row">
                                    <button class="accent" style={{ gridColumnEnd: "span 2" }}>
                                        <div>1</div>
                                    </button>
                                    <button class="accent" style={{ gridColumnEnd: "span 2" }}>
                                        <div>2</div>
                                    </button>
                                    <button class="accent" style={{ gridColumnEnd: "span 2" }}>
                                        <div>3</div>
                                    </button>
                                    <button class="accent" style={{ gridColumnEnd: "span 2" }}>
                                        <div>4</div>
                                    </button>
                                    <button class="accent" style={{ gridColumnEnd: "span 2" }}>
                                        <div>5</div>
                                    </button>
                                    <button class="accent" style={{ gridColumnEnd: "span 2" }}>
                                        <div>6</div>
                                    </button>
                                    <button class="accent" style={{ gridColumnEnd: "span 2" }}>
                                        <div>7</div>
                                    </button>
                                    <button class="accent" style={{ gridColumnEnd: "span 2" }}>
                                        <div>8</div>
                                    </button>
                                    <button class="accent" style={{ gridColumnEnd: "span 2" }}>
                                        <div>9</div>
                                    </button>
                                    <button class="accent" style={{ gridColumnEnd: "span 2" }}>
                                        <div>0</div>
                                    </button>
                                </div>
                                <div class="row">
                                    <button style={{ gridColumnEnd: "span 2" }}>
                                        <div>q</div>
                                    </button>
                                    <button style={{ gridColumnEnd: "span 2" }}>
                                        <div>w</div>
                                    </button>
                                    <button style={{ gridColumnEnd: "span 2" }}>
                                        <div>e</div>
                                    </button>
                                    <button style={{ gridColumnEnd: "span 2" }}>
                                        <div>r</div>
                                    </button>
                                    <button style={{ gridColumnEnd: "span 2" }}>
                                        <div>t</div>
                                    </button>
                                    <button style={{ gridColumnEnd: "span 2" }}>
                                        <div>y</div>
                                    </button>
                                    <button style={{ gridColumnEnd: "span 2" }}>
                                        <div>u</div>
                                    </button>
                                    <button style={{ gridColumnEnd: "span 2" }}>
                                        <div>i</div>
                                    </button>
                                    <button style={{ gridColumnEnd: "span 2" }}>
                                        <div>o</div>
                                    </button>
                                    <button style={{ gridColumnEnd: "span 2" }}>
                                        <div>p</div>
                                    </button>
                                </div>
                                <div class="row">
                                    <button style={{ gridColumnEnd: "span 2" }}>
                                        <div>a</div>
                                    </button>
                                    <button style={{ gridColumnEnd: "span 2" }}>
                                        <div>s</div>
                                    </button>
                                    <button style={{ gridColumnEnd: "span 2" }}>
                                        <div>d</div>
                                    </button>
                                    <button style={{ gridColumnEnd: "span 2" }}>
                                        <div>f</div>
                                    </button>
                                    <button style={{ gridColumnEnd: "span 2" }}>
                                        <div>g</div>
                                    </button>
                                    <button style={{ gridColumnEnd: "span 2" }}>
                                        <div>h</div>
                                    </button>
                                    <button style={{ gridColumnEnd: "span 2" }}>
                                        <div>j</div>
                                    </button>
                                    <button style={{ gridColumnEnd: "span 2" }}>
                                        <div>k</div>
                                    </button>
                                    <button style={{ gridColumnEnd: "span 2" }}>
                                        <div>l</div>
                                    </button>
                                </div>
                                <div class="row">
                                    <button class="accent" style={{ gridColumnEnd: "span 3" }}>
                                        <div><i class="fa-solid fa-arrow-up"></i></div>
                                    </button>
                                    <button style={{ gridColumnEnd: "span 2" }}>
                                        <div>z</div>
                                    </button>
                                    <button style={{ gridColumnEnd: "span 2" }}>
                                        <div>x</div>
                                    </button>
                                    <button style={{ gridColumnEnd: "span 2" }}>
                                        <div>c</div>
                                    </button>
                                    <button style={{ gridColumnEnd: "span 2" }}>
                                        <div>v</div>
                                    </button>
                                    <button style={{ gridColumnEnd: "span 2" }}>
                                        <div>b</div>
                                    </button>
                                    <button style={{ gridColumnEnd: "span 2" }}>
                                        <div>n</div>
                                    </button>
                                    <button style={{ gridColumnEnd: "span 2" }}>
                                        <div>m</div>
                                    </button>
                                    <button class="accent" style={{ gridColumnEnd: "span 3" }}>
                                        <div><i class="fa-solid fa-delete-left"></i></div>
                                    </button>
                                </div>
                                <div class="row">
                                    <button class="accent" style={{ gridColumnEnd: "span 3" }}>
                                        <div><i class="fa-solid fa-ellipsis"></i></div>
                                    </button>
                                    <button class="accent" style={{ gridColumnEnd: "span 2" }}>
                                        <div>'</div>
                                    </button>
                                    <button class="accent" style={{ gridColumnEnd: "span 2" }}>
                                        <div>,</div>
                                    </button>
                                    <button style={{ gridColumnEnd: "span 6" }}>
                                        <div> </div>
                                    </button>
                                    <button class="accent" style={{ gridColumnEnd: "span 2" }}>
                                        <div>.</div>
                                    </button>
                                    <button class="accent" style={{ gridColumnEnd: "span 2" }}>
                                        <div>"</div>
                                    </button>
                                    <button class="accent" style={{ gridColumnEnd: "span 3" }}>
                                        <div><i class="fa-solid fa-arrow-turn-down"></i></div>
                                    </button>
                                </div>
                            </div>
                        </section>

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

                </main>

            </div>
        </>
    )
}

export default TypingGameplay;