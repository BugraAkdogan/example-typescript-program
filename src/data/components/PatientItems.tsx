import React from 'react'
import {Patient} from '../../data/'

interface Props = [{PROVIDER_PID,PID,NAME,CDCR,EIDS,NEW_TO_PANEL}]

function PatientItems(props:Props) {
    const dispatch = useDispatch();

  return (
    <div>{props.NAME}</div>
  )
}

export default PatientItems