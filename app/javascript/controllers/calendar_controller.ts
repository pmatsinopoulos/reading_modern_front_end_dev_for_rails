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
      this.toggleAssociatedConcerts(calendarDayTarget.dataset.scheduleAttribute, !show)
    })
  }

  // action
  showAll(): void {
    this.calendarDayTargets.forEach((calendarDayTarget: HTMLElement) => {
      calendarDayTarget.dataset.cssStatusValue = "false"
      this.toggleAssociatedConcerts(calendarDayTarget.dataset.scheduleAttribute, false)
    })
  }

  private

  toggleAssociatedConcerts(attributeName: string, toggleValue: boolean): void {
    document.querySelectorAll(`.concert[${attributeName}]`)
      .forEach((element) => {
        element.classList.toggle("hidden", toggleValue)
      })
  }
}
