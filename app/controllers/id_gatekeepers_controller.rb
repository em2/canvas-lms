class IdGatekeepersController < ApplicationController
  def new
  end

  def show
    @id = IdGatekeeper.find(params[:id])
  end

end
