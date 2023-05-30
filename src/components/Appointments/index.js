import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    titleInput: '',
    dateInput: '',
    isToggleStar: true,
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDate = event => {
    this.setState({dateInput: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()

    const {titleInput, dateInput} = this.state
    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      date: dateInput,
      isActiveStar: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  toggleStarButton = id => {
    const {appointmentList} = this.state

    this.setState({
      appointmentList: appointmentList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {
            ...eachAppointment,
            isActiveStar: !eachAppointment.isActiveStar,
          }
        }
        return eachAppointment
      }),
    })
  }

  toggledStaredBtn = () => {
    this.setState(prevState => ({
      isToggleStar: !prevState.isToggleStar,
    }))
  }

  render() {
    const {titleInput, dateInput, appointmentList, isToggleStar} = this.state

    let filteredResults

    if (isToggleStar === true) {
      filteredResults = appointmentList
    } else {
      filteredResults = appointmentList.filter(
        eachAppointment => eachAppointment.isActiveStar === true,
      )
    }

    const blueBtn = !isToggleStar ? 'blue-btn' : ''

    return (
      <div className="bg-container">
        <div className="appointment-container">
          <h1 className="heading">Add Appointment</h1>
          <div className="appointment-top-container">
            <div className="inputs-container">
              <form onSubmit={this.onAddAppointment}>
                <div>
                  <label htmlFor="title" className="label-text">
                    TITLE
                  </label>
                  <br />
                  <input
                    id="title"
                    type="text"
                    value={titleInput}
                    className="input-text"
                    placeholder="Title"
                    onChange={this.onChangeTitle}
                  />
                </div>
                <div>
                  <label htmlFor="date" className="label-text">
                    DATE
                  </label>
                  <br />
                  <input
                    id="date"
                    type="date"
                    value={dateInput}
                    className="input-text"
                    onChange={this.onChangeDate}
                  />
                </div>
                <button type="submit" className="add-btn">
                  Add
                </button>
              </form>
            </div>
            <div className="appointment-image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointment-image"
              />
            </div>
          </div>
          <hr />
          <div className="appointments-bottom-container">
            <div className="appointment-stared-container">
              <h1 className="appointment">Appointments</h1>
              <button
                type="button"
                className={`stared-btn ${blueBtn}`}
                onClick={this.toggledStaredBtn}
              >
                Starred
              </button>
            </div>
            <ul className="ul-container">
              {filteredResults.map(eachAppointment => (
                <AppointmentItem
                  toggleStarButton={this.toggleStarButton}
                  appointmentList={eachAppointment}
                  key={eachAppointment.id}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
