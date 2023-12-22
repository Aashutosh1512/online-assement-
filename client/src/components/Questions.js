import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useFetchQestion } from '../hooks/FetchQuestion';
import { updateResult } from '../hooks/setResult';

export default function Questions({ onChecked, selectedOption, checked }) {
  // const [checked, setChecked] = useState(undefined);
  const { trace } = useSelector((state) => state.questions);
  const result = useSelector((state) => state.result.result);

  const [{ isLoading, apiData, serverError }] = useFetchQestion();

  //useSelector(state=>console.log(state));

  const questions = useSelector(
    (state) => state.questions.queue[state.questions.trace]
  );

  const dispatch = useDispatch();

  useEffect(() => {
    // console.log({trace,checked});
    dispatch(updateResult({ trace, checked }));
  }, [checked]);

  function onSelect(i) {
    //console.log(i)
    onChecked(i);
    // setChecked(i);
    dispatch(updateResult({ trace, checked }));
  }

  if (isLoading) {
    return <h3 className="text-light">isLoading</h3>;
  }
  if (serverError) {
    return <h3 className="text-light">{serverError || 'unknown error'}</h3>;
  }

  return (
    <div className="questions">
      <h2 className="text-light">
        {questions?.id}.{' ' + questions?.question}
      </h2>

      <ul key={questions?.id}>
        {questions?.options.map((q, i) => (
          <li key={i}>
            <input
              type="radio"
              // value={false}
              checked={checked === i}
              name="options"
              id={`q${i}-option`}
              onChange={() => onSelect(i)}
            />

            <label className="text-primary" htmlFor={`q${i}-option`}>
              {q}
            </label>
            <div
              className={`check ${result[trace] == i ? 'checked' : ''}`}
            ></div>
          </li>
        ))}
      </ul>
    </div>
  );
}
