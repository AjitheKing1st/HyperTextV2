import TriviaOptions from './TriviaOptions';

function Home() {

  const skip = () => {
    document.getElementById("introduction").style.display = "none"
  }

  return (
    <>
      <section id="introduction">
        <div class='recent' id="opening">
          <h1 class='opening-title'>Welcome to Hyper Text!</h1>

          <p>Practice touch typing by retyping sentences. Not only will you
            improve your typing skills, but you'll also be improving your knowledge
            on random trivia!
          </p>

          {/*
          <p>A good place to start is our step-by-step guide
            that kickstarts your adventure into the world of touch typing.
          </p>
          */}   

          {/*
          <div class="option-buttons">
            <button class="skip-button" id="skip" onClick={skip}>Skip</button>
            <a href="/Tutorial"><button class="start-button" id="start">Start Tutorial</button></a>
          </div>
          */}
        </div>
      </section>

      <TriviaOptions />
    </>
  )
}

export default Home