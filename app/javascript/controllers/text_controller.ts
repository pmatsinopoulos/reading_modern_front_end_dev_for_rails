import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="text"
export default class TextController extends Controller {
  static targets = ["hideButton"]
  hideButtonTarget: HTMLElement

  static values = {
    status: Boolean,
    on: { type: String, default: "On" },
    off: { type: String, default: "Off" },
  }
  statusValue: boolean;
  onValue: string;
  offValue: string;

  toggle(): void {
    this.flipState();
  }

  statusValueChanged():void {
    this.updateText();
  }

  private

  updateText(): void {
    this.hideButtonTarget.innerText = this.newText();
  }

  newText(): string {
    return this.statusValue ? this.onValue : this.offValue;
  }

  flipState(): void {
    this.statusValue = !this.statusValue;
  }
}
