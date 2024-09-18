import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useLayoutEffect } from "react"
import trivia from './trivia';
import paragraphs from "./paragraphs";

function GameplayTest() {

    /*
    const sentence = [
        `Authors often misinterpret the lettuce as a folklore rabbi, when in actuality it feels more like an uncursed bacon. Pursued distances show us how mother-in-laws can be charleses. Authors often misinterpret the lion as a cormous science, when in actuality it feels more like a leprous lasagna. Recent controversy aside, their band was, in this moment, a racemed suit. The clutch of a joke becomes a togaed chair. The first pickled chess is.`,
        "In modern times the first scrawny kitten is, in its own way, an input. An ostrich is the beginner of a roast. An appressed exhaust is a gun of the mind. A recorder is a grade from the right perspective. A hygienic is the cowbell of a skin. Few can name a dun brazil that isn't a highbrow playroom. The unwished beast comes from a thorny oxygen. An insured advantage's respect comes with it the thought that the lucid specialist is a fix.",
        "In ancient times the legs could be said to resemble stroppy vegetables. We can assume that any instance of a centimeter can be construed as an enate paste. One cannot separate pairs from astute managers. Those americas are nothing more than fish. If this was somewhat unclear, authors often misinterpret the gosling as an unfelt banjo, when in actuality it feels more like a professed galley. A bow of the squirrel is assumed.",
        "What we don't know for sure is whether or not a pig of the coast is assumed to be a hardback pilot. The literature would have us believe that a dusky clave is not but an objective. Few can name a limbate leo that isn't a sunlit silver. The bow is a mitten. However, the drawer is a bay. If this was somewhat unclear, few can name a paunchy blue that isn't a conoid bow. The undrunk railway reveals itself as a downstage bamboo to those who look.",
        "Their politician was, in this moment, a notour paperback. The first armless grouse is, in its own way, a gear. The coat is a wash. However, a cake is the llama of a caravan. Snakelike armies show us how playgrounds can be viscoses. Framed in a different way, they were lost without the fatal dogsled that composed their waitress. Far from the truth, the cockney freezer reveals itself as a wiggly tornado to those who look. The first hawklike sack.",
        "An aunt is a bassoon from the right perspective. As far as we can estimate, some posit the melic myanmar to be less than kutcha. One cannot separate foods from blowzy bows. The scampish closet reveals itself as a sclerous llama to those who look. A hip is the skirt of a peak. Some hempy laundries are thought of simply as orchids. A gum is a trumpet from the right perspective. A freebie flight is a wrench of the mind. Some posit the croupy.",
        "A baby is a shingle from the right perspective. Before defenses, collars were only operations. Bails are gleesome relatives. An alloy is a streetcar's debt. A fighter of the scarecrow is assumed to be a leisured laundry. A stamp can hardly be considered a peddling payment without also being a crocodile. A skill is a meteorology's fan. Their scent was, in this moment, a hidden feeling. The competitor of a bacon becomes a boxlike cougar.",
        "A broadband jam is a network of the mind. One cannot separate chickens from glowing periods. A production is a faucet from the right perspective. The lines could be said to resemble zincoid females. A deborah is a tractor's whale. Cod are elite japans. Some posit the wiglike norwegian to be less than plashy. A pennoned windchime's burst comes with it the thought that the printed trombone is a supply. Relations are restless tests.",
        "In recent years, some teeming herons are thought of simply as numbers. Nowhere is it disputed that an unlaid fur is a marble of the mind. Far from the truth, few can name a glossy lier that isn't an ingrate bone. The chicken is a giraffe. They were lost without the abscessed leek that composed their fowl. An interviewer is a tussal bomb. Vanward maracas show us how scarfs can be doubts. Few can name an unguled punch that isn't pig.",
        "A cough is a talk from the right perspective. A designed tractor's tray comes with it the thought that the snuffly flax is a rainbow. Their health was, in this moment, an earthy passbook. This could be, or perhaps the swordfishes could be said to resemble healthy sessions. A capricorn is a helium from the right perspective. However, a sled is a mailman's tennis. The competitor of an alarm becomes a toeless raincoat. Their twist was, in this moment.",
        "Authors often misinterpret the flag as a wayless trigonometry, when in actuality it feels more like a bousy gold. Few can name a jasp oven that isn't a stutter grape. They were lost without the huffy religion that composed their booklet. Those waves are nothing more than pedestrians. Few can name a quartered semicolon that isn't a rounding scooter. Though we assume the latter, the literature would have us believe.",
        "This could be, or perhaps few can name a pasteboard quiver that isn't a brittle alligator. A swordfish is a death's numeric. Authors often misinterpret the mist as a swelling asphalt, when in actuality it feels more like a crosswise closet. Some posit the tonal brother-in-law to be less than newborn. We know that the sizes could be said to resemble sleepwalk cycles. Before seasons, supplies were only fighters. Their stew was, in this moment.",
        "The vision of an attempt becomes a lawny output. Dibbles are mis womens. The olden penalty reveals itself as a bustled field to those who look. Few can name a chalky force that isn't a primate literature. However, they were lost without the gamy screen that composed their beret. Nowhere is it disputed that a step-uncle is a factory from the right perspective. One cannot separate paints from dreary windows. What we don't know for sure is whether.",
        "A tramp is a siamese from the right perspective. We know that a flitting monkey's jaw comes with it the thought that the submersed break is a pamphlet. Their cream was, in this moment, a seedy daffodil. The nest is a visitor. Far from the truth, they were lost without the released linen that composed their step-sister. A vibraphone can hardly be considered a pardine process without also being an archaeology. The bay of a hyacinth becomes.",
        "The frosts could be said to resemble backstage chards. One cannot separate colleges from pinkish bacons. Far from the truth, the mom of a rooster becomes a chordal hydrogen. A tempo can hardly be considered a purer credit without also being a pajama. The first combined ease is, in its own way, a pantyhose. Extending this logic, the guides could be said to resemble reddest monkeies. Framed in a different way, an addle hemp is a van.",
        "Far from the truth, an ajar reminder without catamarans is truly a foundation of smarmy semicircles. An alike board without harps is truly a satin of fated pans. A hubcap sees a parent as a painful beautician. The zeitgeist contends that some intense twigs are thought of simply as effects. A cross is a poppied tune. The valanced list reveals itself as an exchanged wrist to those who look. Recent controversy aside.",
        "The hefty opinion reveals itself as a sterile peer-to-peer to those who look. This could be, or perhaps the watch of a diamond becomes a bosom baboon. In recent years, some posit the unstuffed road to be less than altern. It's an undeniable fact, really; the livelong lettuce reveals itself as an unstuffed soda to those who look. In ancient times a bit is a balance's season. The popcorn of a morning becomes a moonless beauty.",
        "If this was somewhat unclear, a friend is a fridge from the right perspective. An upset carriage is a stitch of the mind. To be more specific, a temper is a pair from the right perspective. Authors often misinterpret the liquid as a notchy baseball, when in actuality it feels more like an unbarbed angle. Though we assume the latter, the first vagrom report is, in its own way, a tower. We know that the octopus of a cd becomes an unrent dahlia.",
        "A reptant discussion's rest comes with it the thought that the condemned syrup is a wish. The drake of a wallaby becomes a sonant harp. If this was somewhat unclear, spotty children show us how technicians can be jumps. Their honey was, in this moment, an intime direction. A ship is the lion of a hate. They were lost without the croupous jeep that composed their lily. In modern times a butcher of the birth is assumed to be a spiral bean.",
        "Those cowbells are nothing more than elements. This could be, or perhaps before stockings, thoughts were only opinions. A coil of the exclamation is assumed to be a hurtless toy. A board is the cast of a religion. In ancient times the first stinko sailboat is, in its own way, an exchange. Few can name a tutti channel that isn't a footless operation. Extending this logic, an oatmeal is the rooster of a shake. Those step-sons are nothing more than matches."
    ];
    */

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

    useLayoutEffect(() => {

        const inpField = document.querySelector(".wrapper .input-field");

        const typingText = document.querySelector(".typing-text div")

        typingText.querySelectorAll(".letter")[0].classList.add("active")

        const words = document.querySelectorAll(".word");

        const textBox = document.querySelector(".typing-text")

        const letters = typingText.querySelectorAll(".letter").length;

        setLetters(letters)

        function initTyping() {
            let characters = typingText.querySelectorAll(".letter");
            let typedChar = inpField.value.split("")[charIndex];

            startStopwatch();

            if (charIndex <= characters.length) {

                if (typedChar == null) {
                    if (charIndex > 0) {
                        setCharIndex(charIndex -= 1);
                        if (characters[charIndex].classList.contains("incorrect")) {
                            setMistakes(mistakes -= 1)
                            setDenominator(denominater -= 1)

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
                            setCorrectKeys(correctKeys -= 1)
                            setDenominator(denominater -= 1)
                            textBox.scrollBy(0, -1);
                        }
                        characters[charIndex].classList.remove("correct", "incorrect");
                        textBox.scrollBy(0, -1);
                    }
                } else {
                    if (characters[charIndex].innerText == typedChar) {
                        characters[charIndex].classList.add("correct");
                        setCorrectKeys(correctKeys += 1)
                        setDenominator(denominater += 1)
                    } else {
                        setMistakes(mistakes += 1)
                        characters[charIndex].classList.add("incorrect");
                        missedCharacters.push(characters[charIndex].innerText)
                        characters[charIndex].innerText = typedChar

                        setDenominator(denominater += 1)
                    }
                    setCharIndex(charIndex += 1);

                    if (charIndex === characters.length) {
                        stopStopwatch()
                    }
                }

                characters.forEach(span => span.classList.remove("active"));
                characters[charIndex].classList.add("active");

                setCpm(charIndex - mistakes)
                setAcc(((correctKeys / denominater) * 100).toFixed(2));

                for (let i = 0; i < words.length; i += 1) {
                    if (words[i].querySelectorAll(".letter")[0].classList.contains("active")) {
                        textBox.scrollBy(0, 2);
                    }
                }
            }
            else {
                stopStopwatch()
            }
        }

        var startTime;
        var stopwatchInterval;
        var elapsedPausedTime = 0;

        function startStopwatch() {
            if (!stopwatchInterval) {
                startTime = new Date().getTime() - elapsedPausedTime;
                stopwatchInterval = setInterval(updateStopwatch, 1000);
            }
        }

        function stopStopwatch() {
            clearInterval(stopwatchInterval);
            elapsedPausedTime = new Date().getTime() - startTime;
            stopwatchInterval = null;
        }

        function resetStopwatch() {
            stopStopwatch();
            elapsedPausedTime = 0;
            document.getElementById("timer").innerHTML = "00:00";
        }

        function updateStopwatch() {
            var currentTime = new Date().getTime();
            var elapsedTime = currentTime - startTime;
            var seconds = Math.floor(elapsedTime / 1000) % 60;
            var minutes = Math.floor(elapsedTime / 1000 / 60) % 60;
            var displayTime = pad(minutes) + ":" + pad(seconds);
            document.getElementById("timer").innerHTML = displayTime;
        }

        function pad(number) {
            return (number < 10 ? "0" : "") + number;
        }

        const keys = document.querySelectorAll('.key');

        for (let i = 0; i < keys.length; i += 1) {
            keys[i].addEventListener("mousedown", () => {
                keys.forEach(element => element.classList.remove("active"))
                keys[i].classList.add("active")
            })
        }

        for (let i = 0; i < keys.length; i += 1) {
            keys[i].addEventListener("mouseup", () => {
                keys.forEach(element => element.classList.remove("active"))
                keys[i].classList.remove("active")
            })
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

    }, [])

    useEffect(() => {
        const keys = document.querySelectorAll('.key');

        document.addEventListener('keydown', (event) => {
            const key = event.key.toLowerCase();

            for (let i = 0; i < keys.length; i += 1) {
                if (key == keys[i].textContent.toLowerCase()) {
                    keys[i].classList.add('active')
                    break;
                }
                else if (key == "escape") {
                    keys[0].classList.add("active")
                    break;
                }
                else if (key == "+" || key == "=") {
                    keys[12].classList.add("active")
                    break;
                }
                else if (key == "-" || key == "_") {
                    keys[11].classList.add("active")
                    break;
                }
                else if (key == ")" || key == "0") {
                    keys[10].classList.add("active")
                    break;
                }
                else if (key == "(" || key == "9") {
                    keys[9].classList.add("active")
                    break;
                }
                else if (key == "*" || key == "8") {
                    keys[8].classList.add("active")
                    break;
                }
                else if (key == "&" || key == "7") {
                    keys[7].classList.add("active")
                    break;
                }
                else if (key == "^" || key == "6") {
                    keys[6].classList.add("active")
                    break;
                }
                else if (key == "%" || key == "5") {
                    keys[5].classList.add("active")
                    break;
                }
                else if (key == "$" || key == "4") {
                    keys[4].classList.add("active")
                    break;
                }
                else if (key == "#" || key == "3") {
                    keys[3].classList.add("active")
                    break;
                }
                else if (key == "@" || key == "2") {
                    keys[2].classList.add("active")
                    break;
                }
                else if (key == "!" || key == "1") {
                    keys[1].classList.add("active")
                    break;
                }
                else if (key == "?" || key == "/") {
                    keys[51].classList.add("active")
                    break;
                }
                else if (key == ">" || key == ".") {
                    keys[50].classList.add("active")
                    break;
                }
                else if (key == "<" || key == ",") {
                    keys[49].classList.add("active")
                    break;
                }
                else if (key == "control") {
                    keys[55].classList.add("active")
                    break;
                }
                else if (key == "{" || key == "[") {
                    keys[25].classList.add("active")
                    break;
                }
                else if (key == "}" || key == "]") {
                    keys[26].classList.add("active")
                    break;
                }
                else if (key == "|" || key == "\\") {
                    keys[27].classList.add("active")
                    break;
                }
                else if (key == ":" || key == ";") {
                    keys[38].classList.add("active")
                    break;
                }
                else if (key == `'` || key == `"`) {
                    keys[39].classList.add("active")
                    break;
                }
                else if (key == "capslock") {
                    keys[28].classList.add("active")
                    break;
                }
                else if (key == "arrowup") {
                    keys[53].classList.add("active")
                    break;
                }
                else if (key == "arrowdown") {
                    keys[62].classList.add("active")
                    break;
                }
                else if (key == "arrowleft") {
                    keys[61].classList.add("active")
                    break;
                }
                else if (key == "arrowright") {
                    keys[63].classList.add("active")
                    break;
                }
                else if (key == " ") {
                    keys[58].classList.add("active")
                    break;
                }
            }
        });

        document.addEventListener('keyup', (event) => {
            const key = event.key.toLowerCase();

            for (let i = 0; i < keys.length; i += 1) {
                if (key == keys[i].textContent.toLowerCase()) {
                    keys[i].classList.remove('active')
                    break;
                }
                else if (key == "escape") {
                    keys[0].classList.remove("active")
                    break;
                }
                else if (key == "+" || key == "=") {
                    keys[12].classList.remove("active")
                    break;
                }
                else if (key == "-" || key == "_") {
                    keys[11].classList.remove("active")
                    break;
                }
                else if (key == ")" || key == "0") {
                    keys[10].classList.remove("active")
                    break;
                }
                else if (key == "(" || key == "9") {
                    keys[9].classList.remove("active")
                    break;
                }
                else if (key == "*" || key == "8") {
                    keys[8].classList.remove("active")
                    break;
                }
                else if (key == "&" || key == "7") {
                    keys[7].classList.remove("active")
                    break;
                }
                else if (key == "^" || key == "6") {
                    keys[6].classList.remove("active")
                    break;
                }
                else if (key == "%" || key == "5") {
                    keys[5].classList.remove("active")
                    break;
                }
                else if (key == "$" || key == "4") {
                    keys[4].classList.remove("active")
                    break;
                }
                else if (key == "#" || key == "3") {
                    keys[3].classList.remove("active")
                    break;
                }
                else if (key == "@" || key == "2") {
                    keys[2].classList.remove("active")
                    break;
                }
                else if (key == "!" || key == "1") {
                    keys[1].classList.remove("active")
                    break;
                }
                else if (key == "?" || key == "/") {
                    keys[51].classList.remove("active")
                    break;
                }
                else if (key == ">" || key == ".") {
                    keys[50].classList.remove("active")
                    break;
                }
                else if (key == "<" || key == ",") {
                    keys[49].classList.remove("active")
                    break;
                }
                else if (key == "control") {
                    keys[55].classList.remove("active")
                    break;
                }
                else if (key == "{" || key == "[") {
                    keys[25].classList.remove("active")
                    break;
                }
                else if (key == "}" || key == "]") {
                    keys[26].classList.remove("active")
                    break;
                }
                else if (key == "|" || key == "\\") {
                    keys[27].classList.remove("active")
                    break;
                }
                else if (key == ":" || key == ";") {
                    keys[38].classList.remove("active")
                    break;
                }
                else if (key == `'` || key == `"`) {
                    keys[39].classList.remove("active")
                    break;
                }
                else if (key == "capslock") {
                    keys[28].classList.remove("active")
                    break;
                }
                else if (key == "arrowup") {
                    keys[53].classList.remove("active")
                    break;
                }
                else if (key == "arrowdown") {
                    keys[62].classList.remove("active")
                    break;
                }
                else if (key == "arrowleft") {
                    keys[61].classList.remove("active")
                    break;
                }
                else if (key == "arrowright") {
                    keys[63].classList.remove("active")
                    break;
                }
                else if (key == " ") {
                    keys[58].classList.remove("active")
                    break;
                }
            }
        });

    }, [])

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


    }, [])


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