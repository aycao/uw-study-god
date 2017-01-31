import React, {Component} from 'react';
import Calendar from '../Calendar';
import _ from 'lodash';

import Utils from '../../utils/Utils';

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
    if(!(course && course.schedule && this.props.offering)){
      return ;
    }
    let schedule = Utils.getEmptyWeek();
    const classesBySection = _.groupBy(course.schedule, 'associated_class');
    _.forOwn(classesBySection, (classObjs, sectionNumber) => {
      _.forEach(classObjs, (classObj) => {
        // section is the class name, eg: LEC 001
        // classes are array of sessions
        const {section, classes, enrollment_capacity, enrollment_total, term} = classObj;
        const year = Utils.getYearFromTermId(term);
        _.forEach(classes, (session) => {
          const {date, location} = session;
          const weekdays = Utils.parseUWWeekDays(date.weekdays);
          const makeupLectureIndicator = section.includes('LEC') && date.start_date === date.end_date? '*': '';
          _.forEach(weekdays, (weekday) => {
            const scheduleItem = {
              name: <div><p>{section + makeupLectureIndicator}</p> <p>{`${location.building} ${location.room}`}</p></div>,
              startTime: date.start_time,
              endTime: date.end_time,
              group: sectionNumber.toString(),
            };
            if(!_.find(schedule[weekday], scheduleItem)){
              schedule[weekday].push(scheduleItem)
            }
          });
        }); // end loop for each session in classes

      }); // end loop for each classObj in classObjs

    }); // end loop for each classObjs in classesBySections

    let scheduleInfo = null;
    if(this.props.offering){
      scheduleInfo = (
          <Calendar appointments={schedule}/>
      )
    }
    return scheduleInfo;
  }
}

export default CourseDetail;

/*

// Format for appointments:

const appointments = {
  monday: [
    { name: 'a', startTime: '08:00', endTime: '09:00', group: '1' },
    { name: 'aba', startTime: '09:30', endTime: '11:00', group: '1'},
    { name: 'b', startTime: '18:00', endTime: '18:30', group: '2'}
  ],
  tuesday: [
    { name: 'a', startTime: '09:30', endTime: '11:20', group: '3'},
  ],
  wednesday: [
    { name: 'f', startTime: '11:30', endTime: '14:00', group: '2' }
  ],
  thursday: [
    { name: 'ggf', startTime: '05:50', endTime: '06:20', group: '4'},
    { name: 'gfds', startTime: '07:20', endTime: '08:20', group: '5'},
    { name: 'trew', startTime: '09:40', endTime: '11:20', group: '6'},
  ],
  friday: [
    { name: 'jyt', startTime: '11:10', endTime: '11:20', group: '7'},
    { name: 'hgfd', startTime: '12:30', endTime: '14:20', group: '8'},
  ]
};

*/

