class FeedsController < ApplicationController
  def index
    redirect_if_not_confirmed
    res = Excon.get('https://dummyjson.com/quotes/random')
    @quote = JSON.parse(res.body)
  end
end
