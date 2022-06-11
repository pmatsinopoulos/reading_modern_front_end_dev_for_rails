class ConcertChannel < ApplicationCable::Channel
  def subscribed
    stream_from("concert_#{params[:concertId]}")
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def added_to_cart(data)
    cart = ShoppingCart.find_or_create_by(user_id: data["userId"])
    cart.add_tickets(
      concert_id: data['concertId'],
      row: data['row'],
      seat_number: data['seatNumber'],
      tickets_to_buy_count: data['ticketsToBuyCount'],
      status: data['status']
    )
    result = Ticket.grouped_for_concert(data['concertId'])
    Rails.logger.debug("About to broadcast to concert_#{data['concertId']} the result: #{result.inspect}")
    ActionCable.server.broadcast("concert_#{data['concertId']}", result)
  end

  def removed_from_cart(data)
    concert_id = data['concertId']
    tickets = data['tickets']
    cart = ShoppingCart.find_or_create_by(user_id: data['userId'])
    cart.clear(
      concert_id: concert_id,
      tickets: tickets
    )
    ActionCable.server.broadcast("concert_#{concert_id}",
      Ticket.data_for_concert(concert_id)
    )
  end
end
