class SimpleResponseController < ApplicationController

  def index
    respond_to do |format|
      format.json { render :json => params.to_json }
    end
  end

end