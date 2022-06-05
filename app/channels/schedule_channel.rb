class ScheduleChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from("schedule")
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
