import './index.css'
import {format} from 'date-fns'

const AppointmentItem = props => {
  const {appointmentList, toggleStarButton} = props
  const {title, date, id, isActiveStar} = appointmentList

  const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

  const onClick = () => {
    toggleStarButton(id)
  }
  const isStarFilled = isActiveStar
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li className="li-container">
      <div className="appointment-details-container">
        <div className="title-star-container">
          <p className="title-text">{title}</p>
          <button
            type="button"
            className="button"
            onClick={onClick}
            data-testid="star"
          >
            <img src={isStarFilled} alt="star" />
          </button>
        </div>
        <p className="date-text">{formattedDate}</p>
      </div>
    </li>
  )
}
export default AppointmentItem
