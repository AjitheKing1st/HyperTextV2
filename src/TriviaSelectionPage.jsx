import { useEffect } from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import { useState } from "react";
import trivia from './trivia';

function TriviaSelectionPage() {

    const { subject } = useParams();

    const topics = trivia.find((trivia) => trivia.topic === subject)

    return (
        <section class="gameplay-selection">

            <div class="start">
                <button>Start</button>
            </div>

            <h1>{topics.topic} Trivia</h1>
            <p>{topics.description}</p>

            <div class="selection">

                <h1>Topics</h1>

                <div class="topic-selection">
                    {topics.selection.map((topic) =>
                        <div class="topic-info">
                            <a href={`${topics.topic}/${topic.topic}`}><h3>Trivia: {topic.topic}</h3></a>

                            <div class="pages">
                                <h5>{topic.pages}</h5>
                                <p>pages</p>
                            </div>
                        </div>
                    )}
                </div>


            </div>


        </section>
    )
}

export default TriviaSelectionPage;