import React, { useContext, useState } from 'react'
import Form from '../../components/Form/Form'
import QuizArea from '../QuizArea/QuizArea'
import quizContext from '../../context/quizContext'
import { HashLoader } from 'react-spinners'

const Home = () => {
  const context = useContext(quizContext)
  const { setUrl, url, fetchQuestions, setLoading, loading, questions } = context

  const [formData, setFormData] = useState({
    number: '',
    category: '',
    difficulty: '',
    type: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const { number, category, difficulty, type } = formData
    localStorage.setItem('timer', 30)
    setUrl(
      `https://opentdb.com/api.php?amount=${number}&category=${category}&difficulty=${difficulty}&type=${type}`,
      fetchQuestions(url)
    )
    setLoading(true)
  }

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <>
      {loading && (
        <div className="loader-overlay">
          <HashLoader color="#2563eb" size={70} />
        </div>
      )}

      {url === '' || questions.length === 0 ? (
        <div className="quiz-home">
          <div className="quiz-card">
            {/* QUIZ ICON */}
            <div className="quiz-icon">❓</div>

            {/* TITLE */}
            <h1 className="quiz-title">Start Your Quiz</h1>
            <p className="quiz-subtitle">
              Choose options and test your knowledge
            </p>

            {/* STEPS */}
            {/* <div className="quiz-steps">
              <span className="active"></span>
              <span></span>
              <span></span>
            </div> */}

            <Form handleSubmit={handleSubmit} onChange={onChange} />
          </div>
        </div>
      ) : (
        <QuizArea />
      )}
    </>
  )
}

export default Home
