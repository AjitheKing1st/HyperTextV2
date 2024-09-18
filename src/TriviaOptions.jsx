import trivia from './trivia';

function TriviaOptions() {
    return (
        <section id="trivia" class="recommendations">

            <h1>Trivia</h1>

            <div class="trivia">

                {trivia.map((trivia) =>
                    <div className="trivia-border">

                        <a href={`/${trivia.topic}`}><img className="trivia-thumbnail" src={trivia.thumbnail} /></a>

                        <div class="trivia-texts">
                            <a href={`/${trivia.topic}`}><h1>{trivia.topic}</h1></a>
                            <p>{trivia.description}</p>
                        </div>

                    </div>
                )}

            </div>

        </section>
    )
}

export default TriviaOptions