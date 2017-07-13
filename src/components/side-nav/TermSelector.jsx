import React from 'react';
import {connect} from 'react-redux';

import {setActiveTermAC} from '../../actions';

const TermSelector = (props) => {
  if (!props.terms.activeTerm){
    return null;
  }
  return (
    <select value={props.terms.activeTerm} onChange={e => props.setActiveTerm(e.target.value)}>
      {props.terms.all.map(term => {
        return <option value={term.id} key={term.id}>{term.name}</option>
      })}
    </select>
  );
};

const mapStateToProps = (states) => {
  return {
    terms: states.terms,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveTerm: (termId) => {
      dispatch(
          setActiveTermAC(termId),
      );
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TermSelector);
