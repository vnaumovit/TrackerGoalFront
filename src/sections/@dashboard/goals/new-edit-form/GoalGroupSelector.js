import React from 'react';
import { RHFSelect } from '../../../../components/hook-form';

const GoalGroupSelector = ({goalGroups, currentGoal}) => {
  return (
    <RHFSelect name="goalGroup" label="Группа цели">
      {currentGoal !== undefined ? <option value={currentGoal.id}>{currentGoal.goalGroup.name}</option> : null}
      {goalGroups.map(goalGroup => (
        goalGroup.id !== currentGoal?.goalGroup.id ?
          <option key={goalGroup.id} value={goalGroup.id}>
            {goalGroup.name}
          </option> : null
      ))}
    </RHFSelect>
  );
};

export default GoalGroupSelector;
