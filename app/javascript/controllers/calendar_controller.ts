import { Controller } from "@hotwired/stimulus"

export default class CalendarController extends Controller {
  static targets = ["calendarDay"]
  calendarDayTargets: HTMLElement[]

  connect() {
    console.debug("CalendarController#connect()...")
  }

  everyDayUnselected(): boolean {
    return this.calendarDayTargets.every(
      (calendarDayTarget: HTMLElement) => {
        return calendarDayTarget.dataset.cssStatusValue === "false"
      }
    )
  }

  // action
  filter(): void {
    console.debug("CalendarController#filter()...")
    const everyDayUnselected = this.everyDayUnselected()
    this.calendarDayTargets.forEach((calendarDayTarget: HTMLElement) => {
      const show =
        everyDayUnselected ||
        calendarDayTarget.dataset.cssStatusValue === "true"
      const schedule = document.getElementById(
        calendarDayTarget.dataset.scheduleId
      )
      schedule.classList.toggle("hidden", !show)
    })
  }

  // action
  showAll(): void {
    this.calendarDayTargets.forEach((calendarDayTarget: HTMLElement) => {
      calendarDayTarget.dataset.cssStatusValue = "false"
      const scheduleElement = document.getElementById(
        calendarDayTarget.dataset.scheduleId
      )
      scheduleElement.classList.toggle("hidden", false)
    })
  }
}
