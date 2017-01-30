import React, {Component} from 'react';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import Calendar from '../Calendar';

class CourseDetail extends Component{
  constructor(props){
    super(props);
    this.makeSchedule = this.makeSchedule.bind(this);
  }

  render(){
    if(!this.props.course){
      return <div>no course info found</div>
    }
    const {course} = this.props;

    return (
      <div className="course-detail-container">
        <div className="course-detail-description-container">
          <p><strong>Description: </strong>{course.description}</p>
        </div>
        <div className="course-detail-notes-container">
          {course.notes? <p><strong>Notes: </strong>{course.notes}</p>: ''}
        </div>
        <div className="course-detail-prerequisites-container">
          {course.prerequisites? <p><strong>Pre req: </strong>{course.prerequisites}</p>: ''}
        </div>
        <div className="course-detail-corequisites-container">
          {course.corequisites? <p><strong>Co req: </strong>{course.corequisites}</p>: ''}
        </div>
        <div className="course-detail-antirequisites-container">
          {course.antirequisites? <p><strong>Anti req: </strong>{course.antirequisites}</p>: ''}
        </div>
        <div className="course-detail-schedule-container">
          {this.makeSchedule(course)}
        </div>
      </div>
    );
  }

  makeSchedule(course){
    if(!course){
      return ;
    }
    let scheduleInfo = null;
    if(this.props.offering){
      scheduleInfo = (
          <Calendar appointments={appointments}/>
      )
    }
    return scheduleInfo;
  }
}

const appointments = {
  monday: [
    { name: 'Gustavo', startTime: '08:00', endTime: '09:00', group: '1' },
    { name: 'Felipe', startTime: '09:30', endTime: '11:00', group: '1'},
    { name: 'Cony', startTime: '18:00', endTime: '18:30', group: '2'}
  ],
  tuesday: [
    { name: 'Felipe', startTime: '09:30', endTime: '11:20', group: '3'},
  ],
  wednesday: [
    { name: 'Nicole', startTime: '11:30', endTime: '14:00', group: '2' }
  ],
  thursday: [
    { name: 'Felipe', startTime: '05:50', endTime: '06:20', group: '4'},
    { name: 'Felipe', startTime: '07:20', endTime: '08:20', group: '5'},
    { name: 'Felipe', startTime: '09:40', endTime: '11:20', group: '6'},
  ],
  friday: [
    { name: 'Felipe', startTime: '11:10', endTime: '11:20', group: '7'},
    { name: 'Felipe', startTime: '12:30', endTime: '14:20', group: '8'},
  ]
};

export default CourseDetail;