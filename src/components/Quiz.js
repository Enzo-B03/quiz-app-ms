import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import Question from '../components/Question';
import QuestionCount from '../components/QuestionCount';
import AnswerOption from '../components/AnswerOption';
import {Container, Button} from 'react-bootstrap';
import { FaCheck } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';



function Quiz(props) {
  function renderAnswerOptions(key) {
    return (
      <AnswerOption
        key={key.content}
        answerContent={key.content}
        answerType={key.type}
        answer={props.answer}
        questionId={props.questionId}
        onAnswerSelected={props.onAnswerSelected}
      />
    );
  }

  return (
    <CSSTransitionGroup
      className="container"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div key={props.questionId}>
        <QuestionCount counter={props.questionId} total={props.questionTotal} />
        <Question content={props.question} />
        <ul className="answerOptions">
          {props.answerOptions.map(renderAnswerOptions)}
        </ul>
        
        
        {props.feedBack ? 
          <CSSTransitionGroup
      className="container"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
          <Container className="block-example border border-primary" style={{marginTop:"5px"}}>
          <div className="answerOptions" style={{marginTop:"5px"}}>
              <h3>
                 <p className="question" >
                    <span style={{ color: props.answer==="correct" ? "blue":"red"}}>
                    {props.answer==="correct" ? <FaCheck/> :<FaTimes/>}
                    </span>
                    <span> {props.answer==="correct" ? "        Correct!" :"       Not Quite"}</span>
                   
                </p> 
              </h3>
            
          </div>

        <p>
        The correct answer is <strong>{props.answerOptions.filter(key => key.type==='correct')[0].content}</strong>
        </p>
        <Button onClick={props.nextQuestion} style={{float:'right', marginTop:"10px"}}>
        Next
        </Button>
        </Container>
        </CSSTransitionGroup>
        :null
        
       }
       </div>
        
    </CSSTransitionGroup>
  );
}

Quiz.propTypes = {
  answer: PropTypes.string.isRequired,
  answerOptions: PropTypes.array.isRequired,
  question: PropTypes.string.isRequired,
  questionId: PropTypes.number.isRequired,
  questionTotal: PropTypes.number.isRequired,
  onAnswerSelected: PropTypes.func.isRequired
};

export default Quiz;
