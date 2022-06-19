import { Controller } from "@hotwired/stimulus"

export default class SortController extends Controller {
  static targets = ["sortElement"]
  sortElementTargets: HTMLElement[]

  initialize(): void {
    const target = this.element
    const observer = new MutationObserver((mutations: MutationRecord[]) => {
      observer.disconnect()
      Promise.resolve().then(start)
      this.sortTargets()
    })
    function start() {
      observer.observe(target, { childList: true, subtree: true })
    }
    start()
  }

  connect(): void {
    console.debug("SortController#connect()...")
  }

  sortTargets(): void {
    if (this.targetsAlreadySorted()) {
      return
    }

    this.sortElementTargets
      .sort((a: HTMLElement, b: HTMLElement) => {
        return this.sortValue(a) - this.sortValue(b)
      })
      .forEach((sortElementTarget: HTMLElement) => this.element.append(sortElementTarget))
  }

  targetsAlreadySorted(): boolean {
    let [first, ...rest] = this.sortElementTargets
    for (const next of rest) {
      if (this.sortValue(first) < this.sortValue(next)) {
        return false
      }
      first = next
    }
    return true
  }

  sortValue(element: HTMLElement): number {
    return parseInt(element.dataset.sortValue || "0", 10)
  }
}
