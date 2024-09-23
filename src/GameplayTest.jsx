import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState, useLayoutEffect } from "react";
import trivia from './trivia';
import paragraphs from "./paragraphs";

function GameplayTest() {

    const [paragraphs2, setParagraphs] = useState(paragraphs);
    let [charIndex, setCharIndex] = useState(0);
    let [mistakes, setMistakes] = useState(0);
    let [letters, setLetters] = useState(0);
    //let [wpm, setWpm] = useState(0);
    let [cpm, setCpm] = useState(0);
    let [acc, setAcc] = useState(0);
    let [correctKeys, setCorrectKeys] = useState(0);
    let [denominater, setDenominator] = useState(0);
    let [missedCharacters, addMissedCharater] = useState([]);

    const navigate = useNavigate();

    useLayoutEffect(() => {

        const inpField = document.querySelector(".wrapper .input-field");

        const typingText = document.querySelector(".typing-text div");

        typingText.querySelectorAll(".letter")[0].classList.add("active");

        const words = document.querySelectorAll(".word");

        const textBox = document.querySelector(".typing-text");

        const letters = typingText.querySelectorAll(".letter").length;

        setLetters(letters);

        function initTyping() {
            let characters = typingText.querySelectorAll(".letter");
            let typedChar = inpField.value.split("")[charIndex];

            startStopwatch();

            if (charIndex <= characters.length) {

                if (typedChar == null) {
                    if (charIndex > 0) {
                        setCharIndex(charIndex -= 1);
                        if (characters[charIndex].classList.contains("incorrect")) {
                            setMistakes(mistakes -= 1);
                            setDenominator(denominater -= 1);

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
                        setMistakes(mistakes += 1)
                        characters[charIndex].classList.add("incorrect");
                        missedCharacters.push(characters[charIndex].innerText);
                        characters[charIndex].innerText = typedChar;

                        setDenominator(denominater += 1);
                    }
                    setCharIndex(charIndex += 1);

                    if (charIndex === characters.length) {
                        stopStopwatch();
                        //navigate("/Math/Calculus II");
                    }
                }

                characters.forEach(span => span.classList.remove("active"));
                characters[charIndex].classList.add("active");

                setCpm(charIndex - mistakes);
                setAcc(((correctKeys / denominater) * 100).toFixed(2));

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
            document.getElementById("timer").innerHTML = "00:00";
        };

        function updateStopwatch() {
            var currentTime = new Date().getTime();
            var elapsedTime = currentTime - startTime;
            var seconds = Math.floor(elapsedTime / 1000) % 60;
            var minutes = Math.floor(elapsedTime / 1000 / 60) % 60;
            var displayTime = pad(minutes) + ":" + pad(seconds);
            document.getElementById("timer").innerHTML = displayTime;
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

        document.addEventListener("keydown", () => inpField.focus());
        document.addEventListener("click", () => inpField.focus());
        typingText.addEventListener("click", () => inpField.focus());
        inpField.addEventListener("input", initTyping);
        inpField.addEventListener("keydown", (event) => {

            const key = event.key.toLowerCase();

            if (key == "arrowup" || key == "arrowdown" || key == "arrowleft" || key == "arrowright") {
                event.preventDefault();
            };
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
        let paragraphs = document.querySelectorAll(".paragraph.container");

        const nextBtn = document.querySelector(".right-button");
        const prevBtn = document.querySelector(".left-button");

        let displayCount = 0;
        let paragraphsLimit = paragraphs.length;

        let array = [];

        const typingSection = document.querySelector(".typing-text");

        const hideAll = () => paragraphs.forEach((p, index) => {
            if (p.textContent !== "") {
                array.push(index);
            }
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
        }

        for (let i = 0; i < paragraphsLimit; i += 1) {
            paragraphs[i].style.display = "none";
            paragraphs[currentIndexOfParagraph].style.display = "block";
        }

        const hideParagraphs = () => paragraphs.forEach(p => p.style.display = 'none');

        const checkFirstParagraph = () => {
            if (paragraphs[initalDisplayCount].style.display == "block") {
                prevBtn.style.display = "none";
            }
        }

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

            checkFirstParagraph()
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
                    prevBtn.style.display = "none"
                }

            }
            else {
                return;
            }

            checkFirstParagraph()
            hideParagraphs();
            paragraphs[currentIndexOfParagraph].style.display = "block";
            nextBtn.style.display = "block"
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

                checkFirstParagraph()
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
                        prevBtn.style.display = "none"
                    }

                }
                else {
                    return;
                }

                checkFirstParagraph()
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

                checkFirstParagraph()
                hideParagraphs();
                paragraphs[currentIndexOfParagraph].style.display = "block";
                prevBtn.style.display = "block";
                typingSection.scrollTop = 0;
            }
        });

        prevBtn.style.display = "none";
        nextBtn.style.display = "block";

        let filteredParagraph = paragraphs2.filter(item => item.Tutorial)

        if (!(filteredParagraph.length > 1)) {
            prevBtn.style.display = "none";
            nextBtn.style.display = "none";
        }
        else {
            prevBtn.style.display = "none";
            nextBtn.style.display = "block";
        }


    }, []);


    return (
        <div className="showcase" style={{ overflowY: "hidden" }}>
            <div>
                <h2 className="book-title">Chapter 1: Tutorial</h2>
            </div>

            <div className="wrapper">
                <input type="text" className="input-field" autoFocus autoCapitalize="off" autoCorrect="off" spellCheck="false" autoComplete="off" />
                <div className="content-box">
                    <div className="typing-text">
                        <div className="paragraphs">
                            {
                                paragraphs2.map((sections, index) =>
                                    <div key={index} className="paragraph container">
                                        {sections.Tutorial?.map((paragraphs, index) =>
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
                            <li className="time">
                                <span>Time:</span>
                                <span id="timer">00:00</span>
                            </li>
                            <li>
                                <span>Mistakes:</span>
                                <span>{mistakes}</span>
                            </li>
                            <li>
                                <span>Accuracy:</span>
                                <span>{acc}%</span>
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

            <h2 className="mobile-message">
                Press anywhere to start
            </h2>
        </div>

    )
}
export default GameplayTest;